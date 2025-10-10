// Table insertion with dialog
export function initTable(toolbar, editor) {
  // Add table button to toolbar
  toolbar.addButton({
    icon: '<svg width="18" height="18" viewBox="0 0 18 18" style="vertical-align:middle"><rect x="1" y="1" width="16" height="16" rx="2" fill="#fff" stroke="#888" stroke-width="1.5"/><line x1="1" y1="6" x2="17" y2="6" stroke="#888" stroke-width="1"/><line x1="1" y1="12" x2="17" y2="12" stroke="#888" stroke-width="1"/><line x1="6" y1="1" x2="6" y2="17" stroke="#888" stroke-width="1"/><line x1="12" y1="1" x2="12" y2="17" stroke="#888" stroke-width="1"/></svg>',
    title: "Insert Table",
    onClick: () => showTableDialog(editor),
  });

  // Floating context menu logic (unchanged)
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".table-context-menu").forEach((m) => m.remove());
    let td = e.target.closest("td,th");
    if (td && td.closest("table")) {
      const table = td.closest("table");
      const rect = td.getBoundingClientRect();
      const menu = document.createElement("div");
      menu.className = "table-context-menu";
      menu.style.left = rect.right + 8 + "px";
      menu.style.top = rect.top + "px";
      menu.innerHTML = `
        <button id="table-insert-row">Insert Row Below</button>
        <button id="table-insert-col">Insert Column Right</button>
        <button id="table-delete-row">Delete Row</button>
        <button id="table-delete-col">Delete Column</button>
        <button id="table-merge-cells">Merge Selected Cells</button>
        <button id="table-split-cell">Split Cell</button>
        <button id="table-toggle-header">Toggle Header Row</button>
        <label>Border: <input type="number" id="table-border-edit" value="1" min="0" style="width:40px"></label>
        <button id="table-apply-border">Apply Border</button>
        <button id="table-close-menu">Close</button>
      `;
      document.body.appendChild(menu);
      menu.querySelector("#table-insert-row").onclick = () => {
        const row = td.parentElement;
        const newRow = row.cloneNode(true);
        newRow
          .querySelectorAll("td,th")
          .forEach((cell) => (cell.innerHTML = "&nbsp;"));
        row.parentElement.insertBefore(newRow, row.nextSibling);
        menu.remove();
      };
      menu.querySelector("#table-insert-col").onclick = () => {
        const colIdx = Array.from(td.parentElement.children).indexOf(td);
        Array.from(table.rows).forEach((row) => {
          const cell = row.insertCell(colIdx + 1);
          cell.innerHTML = "&nbsp;";
        });
        menu.remove();
      };
      menu.querySelector("#table-delete-row").onclick = () => {
        td.parentElement.remove();
        menu.remove();
      };
      menu.querySelector("#table-delete-col").onclick = () => {
        const colIdx = Array.from(td.parentElement.children).indexOf(td);
        Array.from(table.rows).forEach((row) => {
          if (row.children[colIdx]) row.deleteCell(colIdx);
        });
        menu.remove();
      };
      menu.querySelector("#table-merge-cells").onclick = () => {
        if (td.nextElementSibling) {
          td.colSpan = (td.colSpan || 1) + (td.nextElementSibling.colSpan || 1);
          td.nextElementSibling.remove();
        }
        menu.remove();
      };
      menu.querySelector("#table-split-cell").onclick = () => {
        if (td.colSpan && td.colSpan > 1) {
          for (let i = 1; i < td.colSpan; i++) {
            const newCell = td.cloneNode(true);
            newCell.colSpan = 1;
            td.parentElement.insertBefore(newCell, td.nextSibling);
          }
          td.colSpan = 1;
        }
        menu.remove();
      };
      menu.querySelector("#table-toggle-header").onclick = () => {
        const firstRow = table.rows[0];
        if (firstRow) {
          Array.from(firstRow.children).forEach((cell) => {
            if (cell.tagName === "TH") {
              const td = document.createElement("td");
              td.innerHTML = cell.innerHTML;
              td.style.cssText = cell.style.cssText;
              cell.parentElement.replaceChild(td, cell);
            } else {
              const th = document.createElement("th");
              th.innerHTML = cell.innerHTML;
              th.style.cssText = cell.style.cssText;
              cell.parentElement.replaceChild(th, cell);
            }
          });
        }
        menu.remove();
      };
      menu.querySelector("#table-apply-border").onclick = () => {
        const borderVal = menu.querySelector("#table-border-edit").value;
        Array.from(table.querySelectorAll("td,th")).forEach((cell) => {
          cell.style.border = borderVal + "px solid #888";
        });
        menu.remove();
      };
      menu.querySelector("#table-close-menu").onclick = () => menu.remove();
      menu.onclick = (e) => e.stopPropagation();
    }
  });
}

function showTableDialog(editor) {
  let dialog = document.getElementById("table-dialog");
  if (dialog) dialog.remove();
  dialog = document.createElement("div");
  dialog.id = "table-dialog";
  dialog.style.position = "fixed";
  dialog.style.top = "25%";
  dialog.style.left = "50%";
  dialog.style.transform = "translate(-50%, 0)";
  dialog.style.background = "#fff";
  dialog.style.border = "1px solid #ccc";
  dialog.style.padding = "18px";
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <label>Rows: <input type="number" id="table-rows" value="2" min="1" style="width:40px"></label>&nbsp;
    <label>Columns: <input type="number" id="table-cols" value="2" min="1" style="width:40px"></label><br><br>
    <label>Border: <input type="number" id="table-border" value="1" min="0" style="width:40px"></label>&nbsp;
    <label>Width: <input type="text" id="table-width" value="100%" style="width:60px"></label><br><br>
    <label>Cell Padding: <input type="number" id="table-padding" value="6" min="0" style="width:40px"></label>&nbsp;
    <label>BG Color: <input type="color" id="table-bg" value="#ffffff"></label><br><br>
    <label><input type="checkbox" id="table-header"> Heading Row</label><br><br>
    <button id="table-insert-btn">Insert Table</button>
    <button id="table-cancel-btn">Cancel</button>
  `;
  document.body.appendChild(dialog);
  document.getElementById("table-cancel-btn").onclick = () => dialog.remove();
  document.getElementById("table-insert-btn").onclick = () => {
    const rows = parseInt(document.getElementById("table-rows").value, 10);
    const cols = parseInt(document.getElementById("table-cols").value, 10);
    const border = parseInt(document.getElementById("table-border").value, 10);
    const width = document.getElementById("table-width").value;
    const padding = parseInt(
      document.getElementById("table-padding").value,
      10
    );
    const bg = document.getElementById("table-bg").value;
    const header = document.getElementById("table-header").checked;
    if (rows > 0 && cols > 0) {
      let html = `<table style="border-collapse:collapse;width:${width};">`;
      if (header) {
        html += "<tr>";
        for (let c = 0; c < cols; c++) {
          html += `<th style="border:${border}px solid #888;padding:${padding}px;background:${bg};">Header</th>`;
        }
        html += "</tr>";
      }
      for (let r = 0; r < rows; r++) {
        html += "<tr>";
        for (let c = 0; c < cols; c++) {
          html += `<td style="border:${border}px solid #888;padding:${padding}px;background:${bg};">&nbsp;</td>`;
        }
        html += "</tr>";
      }
      html += "</table><br>";
      editor.focus();
      document.execCommand("insertHTML", false, html);
    }
    dialog.remove();
  };
}
