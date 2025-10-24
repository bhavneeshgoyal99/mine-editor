// Line height control
export function LineHeight(editor, value) {
  if (!value) {
    value = prompt('Enter line height (e.g. 1, 1.5, 2):');
    if (!value) return;
  }
  const selection = window.getSelection();
  if (selection.rangeCount === 0 || selection.isCollapsed) {
    editor.style.lineHeight = value;
    return;
  }
  const range = selection.getRangeAt(0);
  if (!range.collapsed) {
    cleanupLineHeightSpans(range);
    const span = document.createElement('span');
    span.style.lineHeight = value;
    try {
      range.surroundContents(span);
    } catch (e) {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
  }
  editor.focus();
}

function cleanupLineHeightSpans(range) {
  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function(node) {
        if (node.tagName === 'SPAN' && node.style.lineHeight && range.intersectsNode(node)) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      }
    }
  );
  const spans = [];
  let node;
  while (node = walker.nextNode()) {
    spans.push(node);
  }
  spans.forEach(span => {
    if (range.intersectsNode(span)) {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    }
  });
}
