// Modular toggle HTML/normal view toolbar group
import { toggleMarkup } from './toggleMarkup.js';

export function initToggleMarkup(toolbar, editor) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">&lt;/&gt;</span>',
    title: 'Toggle HTML/Normal View',
    onClick: () => {
      toggleMarkup(toolbar, editor);
    }
  });
}
