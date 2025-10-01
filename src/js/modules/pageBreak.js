// Page break insertion
export function PageBreak(editor) {
  document.execCommand('insertHTML', false, '<div style="page-break-after:always;"></div>');
  editor.focus();
}
