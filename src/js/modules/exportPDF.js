export function exportPDF(editor) {
  // Clone editor content to avoid disturbing the live DOM
  const temp = document.createElement('div');
  temp.innerHTML = editor.innerHTML;
  // Replace all .editor-page-break with a print page break in the clone
  temp.querySelectorAll('.editor-page-break').forEach(el => {
    const pageBreak = document.createElement('div');
    pageBreak.style.pageBreakAfter = 'always';
    el.parentNode.replaceChild(pageBreak, el);
  });
  const html = temp.innerHTML;

  const win = window.open("", "", "width=800,height=600");
  win.document.write("<html><head><title>Export PDF</title>");
  win.document.write('<link rel="stylesheet" href="editor.css">');
  win.document.write("</head><body>" + html + "</body></html>");
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}
