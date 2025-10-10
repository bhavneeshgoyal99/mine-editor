// Find and replace
export function FindReplace(editor) {
  let dialog = document.getElementById('find-replace-dialog');
  if (dialog) dialog.remove();
  dialog = document.createElement('div');
  dialog.id = 'find-replace-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '20%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, 0)';
  dialog.style.background = '#fff';
  dialog.style.border = '1px solid #ccc';
  dialog.style.padding = '16px';
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <label>Find: <input type="text" id="find-text"></label><br><br>
    <label>Replace: <input type="text" id="replace-text"></label><br><br>
    <button id="find-btn">Find</button>
    <button id="replace-btn">Replace</button>
    <button id="replace-all-btn">Replace All</button>
    <button id="close-find-replace">Close</button>
    <div id="find-replace-result" style="margin-top:8px;"></div>
  `;
  document.body.appendChild(dialog);
  const findInput = dialog.querySelector('#find-text');
  const replaceInput = dialog.querySelector('#replace-text');
  const resultDiv = dialog.querySelector('#find-replace-result');
  dialog.querySelector('#close-find-replace').onclick = () => {
    // Remove all <mark> tags from editor
    if (editor && editor.innerHTML) {
      editor.innerHTML = editor.innerHTML.replace(/<mark>(.*?)<\/mark>/gi, '$1');
    }
    dialog.remove();
  };
  dialog.querySelector('#find-btn').onclick = () => {
    const text = findInput.value;
    if (!text) return;
    const html = editor.innerHTML;
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let count = 0;
    editor.innerHTML = html.replace(regex, match => {
      count++;
      return `<mark>${match}</mark>`;
    });
    resultDiv.textContent = count + ' matches highlighted.';
  };
  dialog.querySelector('#replace-btn').onclick = () => {
    const text = findInput.value;
    const replace = replaceInput.value;
    if (!text) return;
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      if (range && range.toString().toLowerCase() === text.toLowerCase()) {
        range.deleteContents();
        range.insertNode(document.createTextNode(replace));
      }
    }
  };
  dialog.querySelector('#replace-all-btn').onclick = () => {
    const text = findInput.value;
    const replace = replaceInput.value;
    if (!text) return;
    const html = editor.innerHTML;
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let count = 0;
    editor.innerHTML = html.replace(regex, match => {
      count++;
      return replace;
    });
    resultDiv.textContent = count + ' replacements made.';
  };
}
