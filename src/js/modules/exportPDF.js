export function exportPDF(editor) {
  const win = window.open("", "", "width=800,height=600");
  win.document.write("<html><head><title>Export PDF</title>");
  win.document.write('<link rel="stylesheet" href="editor.css">');
  win.document.write("</head><body>" + editor.innerHTML + "</body></html>");
  win.document.close();
  win.focus();
  setTimeout(() => win.print(), 500);
}
