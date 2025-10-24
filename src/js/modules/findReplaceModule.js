// Modular find and replace toolbar group
import { FindReplace } from './findReplace.js';

export function initFindReplace(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">🔍</span>',
    title: 'Find & Replace',
    onClick: (editor) => {
      FindReplace(editor);
    }
  });
}
