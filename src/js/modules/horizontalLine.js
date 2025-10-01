// Horizontal line insertion
export function HorizontalLine(editor, divider = false) {
  if (divider) {
    document.execCommand('insertHTML', false, '<hr style="border-top:2px solid #888;">');
  } else {
    document.execCommand('insertHorizontalRule', false, null);
  }
  editor.focus();
}
