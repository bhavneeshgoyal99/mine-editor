// Page break insertion
export function PageBreak(editor) {
  const html = `<div class="editor-page-break" tabindex="0" style="border-top:2px dashed #888;margin:18px 0;position:relative;display:flex;align-items:center;justify-content:center;">
    <span style="flex:1"></span>
    <span style="background:#fff;padding:0 12px;position:relative;top:-12px;color:#888;font-size:13px;"></span>
    <button class="editor-page-break-remove" style="position:absolute;top:2px;right:8px;width:22px;height:22px;border:none;background:none;color:#888;font-size:18px;line-height:18px;cursor:pointer;z-index:2;" title="Remove page break">&times;</button>
  </div><p><br></p>`;
  document.execCommand('insertHTML', false, html);
  editor.focus();

  // Robust event delegation for cross button
  setTimeout(() => {
    editor.querySelectorAll('.editor-page-break-remove').forEach(btn => {
      btn.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();
        const breakEl = btn.closest('.editor-page-break');
        const next = breakEl.nextSibling;
        breakEl.remove();
        if (next && next.nodeName === 'P') {
          next.focus();
        } else {
          editor.focus();
        }
      };
    });
  }, 10);
}
