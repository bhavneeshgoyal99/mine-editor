// Modular text type (heading/paragraph) toolbar group
export function initTextType(toolbar) {
  const types = [
    { tag: 'h1', label: 'H1' },
    { tag: 'h2', label: 'H2' },
    { tag: 'h3', label: 'H3' },
    { tag: 'h4', label: 'H4' },
    { tag: 'h5', label: 'H5' },
    { tag: 'h6', label: 'H6' },
    { tag: 'p', label: 'P' }
  ];
  toolbar.addButton({
    icon: 'T',
    title: 'Text Type',
    type: 'dropdown',
    options: types.map(t => ({ value: t.tag, label: t.label })),
    defaultValue: 'p',
    onClick: (editor, value) => {
      document.execCommand('formatBlock', false, value);
      editor.focus();
    }
  });
  toolbar.addButton({ type: 'divider' });
}
