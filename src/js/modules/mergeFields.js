// Merge fields (template variables)
export function MergeFields(editor) {
  const field = prompt('Enter merge field name:');
  if (field) {
    document.execCommand('insertText', false, `{{${field}}}`);
    editor.focus();
  }
}
