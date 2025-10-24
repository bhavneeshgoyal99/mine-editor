// Modular special character toolbar group
const specialChars = [
  { char: 'Ω', label: 'Omega' },
  { char: '©', label: 'Copyright' },
  { char: '®', label: 'Registered' },
  { char: '™', label: 'Trademark' },
  { char: '✓', label: 'Check' },
  { char: '★', label: 'Star' },
  { char: '♥', label: 'Heart' },
  { char: '♦', label: 'Diamond' },
  { char: '♣', label: 'Club' },
  { char: '♠', label: 'Spade' },
  { char: '←', label: 'Left Arrow' },
  { char: '→', label: 'Right Arrow' },
  { char: '↑', label: 'Up Arrow' },
  { char: '↓', label: 'Down Arrow' }
];

export function initSpecialChar(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">Ω</span>',
    title: 'Insert Special Character',
    onClick: (editor) => {
      showSpecialCharPicker(editor);
    }
  });
}

function showSpecialCharPicker(editor) {
  document.querySelectorAll('.editor-special-char-picker').forEach(p => p.remove());
  const picker = document.createElement('div');
  picker.className = 'editor-special-char-picker';
  picker.style.position = 'fixed';
  picker.style.top = '32%';
  picker.style.left = '50%';
  picker.style.transform = 'translate(-50%, 0)';
  picker.style.background = '#fff';
  picker.style.border = '1px solid #ccc';
  picker.style.borderRadius = '8px';
  picker.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  picker.style.padding = '14px 18px';
  picker.style.display = 'flex';
  picker.style.flexWrap = 'wrap';
  picker.style.gap = '10px';
  picker.style.minWidth = '220px';
  picker.style.maxWidth = '340px';

  specialChars.forEach(item => {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.innerHTML = item.char;
    btn.title = item.label;
    btn.style.fontSize = '20px';
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '6px';
    btn.style.border = '1px solid #d0d0d0';
    btn.style.background = '#f7f8fa';
    btn.style.cursor = 'pointer';
    btn.onmouseenter = () => btn.style.background = '#e9eef6';
    btn.onmouseleave = () => btn.style.background = '#f7f8fa';
      btn.onclick = function() {
        // Ensure editor has a paragraph if empty
        if (!editor.innerHTML || editor.innerHTML.trim() === '') {
          editor.innerHTML = '<p><br></p>';
          editor.focus();
          // Set selection to start of new paragraph
          const selection = window.getSelection();
          const range = document.createRange();
          if (editor.firstChild && editor.firstChild.nodeType === 1) {
            range.setStart(editor.firstChild, 0);
          } else {
            range.setStart(editor, 0);
          }
          range.collapse(true);
          selection.removeAllRanges();
          selection.addRange(range);
        } else {
          editor.focus();
          // Do not reset selection/range if already inside editor
          // If selection is not inside editor, set to end
          const selection = window.getSelection();
          if (!selection.rangeCount || !editor.contains(selection.anchorNode)) {
            const range = document.createRange();
            if (editor.lastChild && editor.lastChild.nodeType === 1) {
              range.selectNodeContents(editor.lastChild);
              range.collapse(false);
            } else {
              range.selectNodeContents(editor);
              range.collapse(false);
            }
            selection.removeAllRanges();
            selection.addRange(range);
          }
        }
        document.execCommand('insertText', false, item.char);
        picker.remove();
      };
    picker.appendChild(btn);
  });

  // Close button
  const closeBtn = document.createElement('button');
  closeBtn.textContent = 'Close';
  closeBtn.style.marginTop = '12px';
  closeBtn.style.padding = '6px 18px';
  closeBtn.style.borderRadius = '6px';
  closeBtn.style.border = '1px solid #d0d0d0';
  closeBtn.style.background = '#f7f8fa';
  closeBtn.style.cursor = 'pointer';
  closeBtn.onclick = () => picker.remove();
  picker.appendChild(closeBtn);

  document.body.appendChild(picker);

  setTimeout(() => {
    document.addEventListener('mousedown', function handler(e) {
      if (!picker.contains(e.target)) {
        picker.remove();
        document.removeEventListener('mousedown', handler);
      }
    });
  }, 10);
}
