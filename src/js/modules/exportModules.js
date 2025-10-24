// Modular export PDF toolbar group
import { exportPDF } from './exportPDF.js';

export function initExportPDF(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">📝</span>',
    title: 'Export as PDF',
    onClick: (editor) => {
      exportPDF(editor);
    }
  });
}

// Modular export DOC toolbar group
import { downloadWord } from './downloadWord.js';

export function initExportDOC(toolbar) {
  toolbar.addButton({
    icon: '<span style="font-size:18px;">📄</span>',
    title: 'Export as DOC',
    onClick: (editor) => {
      downloadWord(editor);
    }
  });
}
