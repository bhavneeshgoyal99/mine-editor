// Code block insertion
export function CodeBlock(editor) {
  const code = prompt('Enter code:');
  if (code !== null) {
    const html = `<pre><code>${escapeHtml(code)}</code></pre>`;
    document.execCommand('insertHTML', false, html);
    editor.focus();
  }
}

function escapeHtml(str) {
  return str.replace(/[&<>"]|'/g, function(tag) {
    const charsToReplace = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    };
    return charsToReplace[tag] || tag;
  });
}
