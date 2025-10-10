// Font family module
export function initFontFamily(toolbar) {
  toolbar.addButton({
    icon: 'A',
    title: 'Font Family',
    type: 'dropdown',
    options: [
      { value: 'Arial', label: 'Arial' },
      { value: 'Times New Roman', label: 'Times New Roman' },
      { value: 'Courier New', label: 'Courier New' },
      { value: 'Georgia', label: 'Georgia' },
      { value: 'Verdana', label: 'Verdana' }
    ],
    onClick: (editor, value) => {
      document.execCommand('fontName', false, value);
      editor.focus();
    }
  });
  toolbar.addButton({ type: 'divider' });
}
