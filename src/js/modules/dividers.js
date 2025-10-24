// Divider group module for toolbar
import { HorizontalLine } from './horizontalLine.js';
import { PageBreak } from './pageBreak.js';

export function initDividers(toolbar) {
  toolbar.addButton({
    icon: '<svg width="18" height="18" viewBox="0 0 18 18"><line x1="2" y1="9" x2="16" y2="9" stroke="#888" stroke-width="2"/></svg>',
    title: 'Horizontal Line',
    onClick: (editor) => {
      HorizontalLine(editor);
    }
  });
  toolbar.addButton({
    icon: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="2" y="7" width="14" height="4" fill="#888"/></svg>',
    title: 'Divider',
    onClick: (editor) => {
      HorizontalLine(editor, true);
    }
  });
  toolbar.addButton({
    icon: '<svg width="18" height="18" viewBox="0 0 18 18"><rect x="8" y="2" width="2" height="14" fill="#888"/><rect x="2" y="8" width="14" height="2" fill="#888"/></svg>',
    title: 'Page Break',
    onClick: (editor) => {
      PageBreak(editor);
    }
  });
  toolbar.addButton({ type: 'divider' });
}
