// Modular emoji toolbar group using OS emoji picker
import { showEmojiPicker } from '../ui/emojiPicker.js';

export function initEmoji(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">😊</span>',
    title: 'Insert Emoji',
    onClick: (editor) => {
      showEmojiPicker(toolbar, (emoji) => {
        // Insert emoji at current selection
        editor.focus();
        document.execCommand('insertText', false, emoji);
      });
    }
  });
}
