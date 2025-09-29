// Editor initialization and state management
import { createToolbar } from '../ui/toolbar.js';
import { showEmojiPicker } from '../ui/emojiPicker.js';

export function initEditor(root, options = {}) {
  // root: DOM element or selector
  let container = typeof root === 'string' ? document.querySelector(root) : root;
  if (!container) throw new Error('Editor root element not found');

  let textarea = null;
  // If root is a textarea, clone to div and hide textarea
  if (container.tagName && container.tagName.toLowerCase() === 'textarea') {
    textarea = container;
    // Create a wrapper div to hold toolbar and editor
    container = document.createElement('div');
    textarea.parentNode.insertBefore(container, textarea);
    // Create toolbar and editor area
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    toolbar.id = 'editor-toolbar';
    const editor = document.createElement('div');
    editor.className = 'editor';
    editor.id = 'editor';
    editor.contentEditable = 'true';
    editor.innerHTML = textarea.value;
    container.appendChild(toolbar);
    container.appendChild(editor);
    textarea.style.display = 'none';

    // Initialize toolbar
    createToolbar(toolbar, editor, options, { showEmojiPicker });

    // Only focus editor on editor click
    editor.addEventListener('click', () => editor.focus());

    // Sync editor content to textarea on change (for form submission)
    editor.addEventListener('input', () => {
      textarea.value = editor.innerHTML;
    });

    // Return API
    return {
      toolbar,
      editor,
      textarea,
      focus: () => editor.focus(),
      getHTML: () => editor.innerHTML,
      setHTML: html => {
        editor.innerHTML = html;
        textarea.value = html;
      },
    };
  } else {
    // Create toolbar and editor area
    const toolbar = document.createElement('div');
    toolbar.className = 'editor-toolbar';
    toolbar.id = 'editor-toolbar';
    const editor = document.createElement('div');
    editor.className = 'editor';
    editor.id = 'editor';
    editor.contentEditable = 'true';
    container.appendChild(toolbar);
    container.appendChild(editor);

    // Initialize toolbar
    createToolbar(toolbar, editor, options, { showEmojiPicker });

    // Only focus editor on editor click
    editor.addEventListener('click', () => editor.focus());

    // Return API
    return {
      toolbar,
      editor,
      focus: () => editor.focus(),
      getHTML: () => editor.innerHTML,
      setHTML: html => (editor.innerHTML = html),
    };
  }
}
