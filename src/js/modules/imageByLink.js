// Insert image by link
export function ImageByLink(editor) {
  const url = prompt('Enter image URL:');
  if (url) {
    document.execCommand('insertImage', false, url);
    editor.focus();
  }
}
