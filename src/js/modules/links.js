// Modular links toolbar group
export function initLinks(toolbar) {
  // Add link to selected text
  toolbar.addButton({
    icon: '<span style="text-decoration:underline;color:#0074d9">🔗</span>',
    title: 'Add Link to Text',
    onClick: (editor) => {
      const url = prompt('Enter URL to link:');
      if (url) {
        document.execCommand('createLink', false, url);
        // After creating the link, set target="_blank" on all new anchors in selection
        setTimeout(() => {
          const selection = window.getSelection();
          if (selection.rangeCount > 0) {
            const range = selection.getRangeAt(0);
            const container = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE ? range.commonAncestorContainer : range.commonAncestorContainer.parentElement;
            const anchors = container.querySelectorAll('a[href]');
            anchors.forEach(a => a.setAttribute('target', '_blank'));
          }
        }, 0);
        editor.focus();
      }
    }
  });
  // Insert direct clickable link
  toolbar.addButton({
    icon: '<span style="color:#0074d9">🌐</span>',
    title: 'Insert Clickable Link',
    onClick: (editor) => {
      const url = prompt('Enter URL to insert:');
      if (url) {
        document.execCommand('insertHTML', false, `<a href="${url}" target="_blank">${url}</a>`);
        editor.focus();
      }
    }
  });
  // Make links clickable in editor
  if (toolbar && toolbar.parentElement) {
    const editor = toolbar.parentElement.querySelector('.editor');
    if (editor) {
      editor.addEventListener('click', function(e) {
        if (e.target.tagName === 'A' && e.target.href) {
          window.open(e.target.href, '_blank');
          e.preventDefault();
        }
      });
    }
  }
//   toolbar.addButton({ type: 'divider' });
}
