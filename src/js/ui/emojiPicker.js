// Emoji picker UI
export function showEmojiPicker(target, onSelect) {
  const emojis = ['😀','😁','😂','🤣','😃','😄','😅','😆','😉','😊','😍','😘','😜','🤔','😎','😭','😡','👍','🙏','🎉','🔥','💯'];
  let picker = document.getElementById('emoji-picker');
  if (picker) picker.remove();
  picker = document.createElement('div');
  picker.id = 'emoji-picker';
  picker.style.position = 'absolute';
  picker.style.background = '#fff';
  picker.style.border = '1px solid #ccc';
  picker.style.padding = '5px';
  picker.style.zIndex = 1000;
  emojis.forEach(e => {
    const btn = document.createElement('button');
    btn.textContent = e;
    btn.style.fontSize = '20px';
    btn.onclick = function() {
      onSelect(e);
      picker.remove();
    };
    picker.appendChild(btn);
  });
  document.body.appendChild(picker);
  // Position picker below target
  const rect = target.getBoundingClientRect();
  picker.style.left = rect.left + 'px';
  picker.style.top = (rect.bottom + 5) + 'px';
  // Hide on click outside
  setTimeout(() => {
    document.addEventListener('mousedown', function handler(e) {
      if (picker && !picker.contains(e.target)) {
        picker.remove();
        document.removeEventListener('mousedown', handler);
      }
    });
  }, 10);
}
