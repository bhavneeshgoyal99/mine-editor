// Undo/Redo/SelectAll module
export function initUndoRedoSelectAll(toolbar) {
   const iconWrapper = (svg) =>
    `<div style="width:28px;height:28px;display:flex;align-items:center;justify-content:center;background:#f8f9fa;border-radius:6px;">${svg}</div>`;

  const commonStyle = `width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C274C" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"`;

  // Undo button
  toolbar.addButton({
   icon: iconWrapper(`
      <svg ${commonStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 4.5L3.5 8.5L7.5 12.5" />
        <path d="M4 8.5H14C17.3137 8.5 20 11.1863 20 14.5C20 17.8137 17.3137 20.5 14 20.5H9" />
      </svg>
    `),
    title: 'Undo',
    onClick: (editor) => {
      document.execCommand('undo');
      editor.focus();
    }
  });
  // Redo button
  toolbar.addButton({
    icon: iconWrapper(`
      <svg ${commonStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M16.5 4.5L20.5 8.5L16.5 12.5" />
        <path d="M20 8.5H10C6.68629 8.5 4 11.1863 4 14.5C4 17.8137 6.68629 20.5 10 20.5H15" />
      </svg>
    `),
    title: 'Redo',
    onClick: (editor) => {
      document.execCommand('redo');
      editor.focus();
    }
  });
  // Select All button
  toolbar.addButton({
    icon: iconWrapper(`
      <svg ${commonStyle} xmlns="http://www.w3.org/2000/svg">
        <rect x="5" y="5" width="14" height="14" stroke="#1C274C" stroke-width="1.8" fill="none"/>
        <path d="M3 3H7M17 3H21M3 21H7M17 21H21M3 7V3M21 7V3M3 21V17M21 21V17" stroke="#1C274C" stroke-width="1.8"/>
      </svg>
    `),
    onClick: (editor) => {
      document.execCommand('selectAll');
      editor.focus();
    }
  });
  // Divider
  toolbar.addButton({ type: 'divider' });
}
