// Table insertion with dialog
console.log("Table module loaded");
export function Table(editor) {
  let dialog = document.getElementById('table-dialog');
  if (dialog) dialog.remove();
  dialog = document.createElement('div');
  dialog.id = 'table-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '25%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, 0)';
  dialog.style.background = '#fff';
  dialog.style.border = '1px solid #ccc';
  dialog.style.padding = '18px';
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <label>Rows: <input type="number" id="table-rows" value="2" min="1" style="width:40px"></label>&nbsp;
    <label>Columns: <input type="number" id="table-cols" value="2" min="1" style="width:40px"></label><br><br>
    <label>Border: <input type="number" id="table-border" value="1" min="0" style="width:40px"></label>&nbsp;
    <label>Width: <input type="text" id="table-width" value="100%" style="width:60px"></label><br><br>
    <label>Cell Padding: <input type="number" id="table-padding" value="6" min="0" style="width:40px"></label>&nbsp;
    <label>BG Color: <input type="color" id="table-bg" value="#ffffff"></label><br><br>
    <button id="table-insert-btn">Insert Table</button>
    <button id="table-cancel-btn">Cancel</button>
  `;
  document.body.appendChild(dialog);
  document.getElementById('table-cancel-btn').onclick = () => dialog.remove();
  document.getElementById('table-insert-btn').onclick = () => {
    const rows = parseInt(document.getElementById('table-rows').value, 10);
    const cols = parseInt(document.getElementById('table-cols').value, 10);
    const border = parseInt(document.getElementById('table-border').value, 10);
    const width = document.getElementById('table-width').value;
    const padding = parseInt(document.getElementById('table-padding').value, 10);
    const bg = document.getElementById('table-bg').value;
    if (rows > 0 && cols > 0) {
      let html = `<table style="border-collapse:collapse;width:${width};">`;
      for (let r = 0; r < rows; r++) {
        html += '<tr>';
        for (let c = 0; c < cols; c++) {
          html += `<td style="border:${border}px solid #888;padding:${padding}px;background:${bg};">&nbsp;</td>`;
        }
        html += '</tr>';
      }
      html += '</table><br>';
      editor.focus();
      document.execCommand('insertHTML', false, html);
    }
    dialog.remove();
  };
}
