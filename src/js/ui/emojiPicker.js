// Emoji picker UI
export function showEmojiPicker(target, onSelect) {
  document.querySelectorAll('.editor-emoji-picker').forEach(p => p.remove());
  const picker = document.createElement('div');
  picker.className = 'editor-emoji-picker';
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

  // Use a large set of emojis (Unicode 13.0, common faces, symbols, etc.)
  const emojis = [
    '😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😍','😘','😜','🤔','😎','😭','😡','👍','🙏','🎉','🔥','💯',
    '🥰','😇','😋','😏','😒','😞','😔','😢','😩','😤','😱','😳','🤗','🤩','🥳','😬','🤪','😷','🤒','🤕','🤑','🤠','😈','👻','💀','👽','🤖',
    '👋','🤚','🖐️','✋','🖖','👌','🤌','🤏','✌️','🤞','🤟','🤘','🤙','👈','👉','👆','🖕','👇','☝️','👍','👎','✊','👊','🤛','🤜','👏','🙌','👐','🤲',
    '💪','🦾','🦵','🦶','👂','👃','🧠','🦷','🦴','👀','👁️','👅','👄','💋','🩸','🧑‍🦰','🧑‍🦱','🧑‍🦳','🧑‍🦲','👶','🧒','👦','👧','🧑','👱','👨','👩','🧓','👴','👵',
    '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷','🐸','🐵','🦄','🐔','🐧','🐦','🐤','🐣','🐥','🦆','🦅','🦉','🦇','🐺','🐗','🐴','🦓','🦍','🦧','🐢','🐍','🦎','🦂','🦀','🦞','🦐','🦑','🐙','🦕','🦖','🐡','🐠','🐟','🐬','🐳','🐋','🦈','🐊','🐅','🐆','🦓','🦍','🦧','🐘','🦛','🦏','🐪','🐫','🦒','🦘','🦥','🦦','🦨','🦩','🐁','🐀','🐇','🦔'
  ];
  emojis.forEach(e => {
    const btn = document.createElement('button');
    btn.textContent = e;
    btn.style.fontSize = '20px';
    btn.style.padding = '8px 12px';
    btn.style.borderRadius = '6px';
    btn.style.border = '1px solid #d0d0d0';
    btn.style.background = '#f7f8fa';
    btn.style.cursor = 'pointer';
    btn.onmouseenter = () => btn.style.background = '#e9eef6';
    btn.onmouseleave = () => btn.style.background = '#f7f8fa';
    btn.onclick = function() {
      if (onSelect) onSelect(e);
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
