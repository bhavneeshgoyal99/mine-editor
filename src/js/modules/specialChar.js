// Special character picker
export function SpecialChar(editor, onSelect) {
  let dialog = document.getElementById('special-char-dialog');
  if (dialog) dialog.remove();
  dialog = document.createElement('div');
  dialog.id = 'special-char-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '30%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, 0)';
  dialog.style.background = '#fff';
  dialog.style.border = '1px solid #ccc';
  dialog.style.padding = '16px';
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <div style="font-size:22px;">
      <button class="char-btn">Ω</button>
      <button class="char-btn">©</button>
      <button class="char-btn">®</button>
      <button class="char-btn">™</button>
      <button class="char-btn">✓</button>
      <button class="char-btn">★</button>
      <button class="char-btn">♥</button>
      <button class="char-btn">♦</button>
      <button class="char-btn">♣</button>
      <button class="char-btn">♠</button>
      <button class="char-btn">←</button>
      <button class="char-btn">→</button>
      <button class="char-btn">↑</button>
      <button class="char-btn">↓</button>
    </div>
    <button id="close-special-char">Close</button>
  `;
  document.body.appendChild(dialog);
  dialog.querySelectorAll('.char-btn').forEach(btn => {
    btn.onclick = () => {
      onSelect(btn.textContent);
      dialog.remove();
    };
  });
  dialog.querySelector('#close-special-char').onclick = () => dialog.remove();
}
