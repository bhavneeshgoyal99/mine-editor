export function toggleMarkup(toolbar, editor) {
  let markup = document.getElementById('editor-markup');
  if (!markup) {
    markup = document.createElement('textarea');
    markup.id = 'editor-markup';
    markup.className = 'editor';
    markup.style.display = 'block';
    markup.style.minHeight = '320px';
    markup.style.width = '100%';
    markup.style.fontFamily = 'monospace';
    markup.style.fontSize = '15px';
    markup.value = editor.innerHTML;
    editor.style.display = 'none';
    editor.parentNode.appendChild(markup);
    markup.focus();
    markup.addEventListener('blur', function syncBack() {
      if (markup.style.display !== 'none') {
        editor.innerHTML = markup.value;
      }
    });
  } else if (markup.style.display === 'none') {
    markup.value = editor.innerHTML;
    markup.style.display = 'block';
    editor.style.display = 'none';
    markup.focus();
  } else {
    editor.innerHTML = markup.value;
    markup.style.display = 'none';
    editor.style.display = 'block';
    editor.focus();
  }
}
