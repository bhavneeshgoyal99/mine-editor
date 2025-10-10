// Modular export HTML toolbar group
export function initExportHTML(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">HTML</span>',
    title: 'Export as HTML',
    onClick: (editor) => {
      const htmlContent = editor.innerHTML;
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'document.html';
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
      }, 100);
    }
  });
}
