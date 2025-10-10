// Undo/Redo/SelectAll module
export function initUndoRedoSelectAll(toolbar) {
  // Undo button
  toolbar.addButton({
    icon: '↺',
    title: 'Undo',
    onClick: (editor) => {
      document.execCommand('undo');
      editor.focus();
    }
  });
  // Redo button
  toolbar.addButton({
    icon: '↻',
    title: 'Redo',
    onClick: (editor) => {
      document.execCommand('redo');
      editor.focus();
    }
  });
  // Select All button
  toolbar.addButton({
    icon: '⎚',
    title: 'Select All',
    onClick: (editor) => {
      document.execCommand('selectAll');
      editor.focus();
    }
  });
  // Divider
  toolbar.addButton({ type: 'divider' });
}
