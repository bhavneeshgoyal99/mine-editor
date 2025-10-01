
export function fontSize(editor, sizePx) {
  console.log("Applying font size:", sizePx);
  
  const selection = window.getSelection();
  
  // अगर कोई selection नहीं है तो editor में cursor position पर apply करें
  if (selection.rangeCount === 0 || selection.isCollapsed) {
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const currentElement = range.startContainer.nodeType === Node.TEXT_NODE 
        ? range.startContainer.parentElement 
        : range.startContainer;
      
      if (currentElement === editor) {
        editor.style.fontSize = sizePx + 'px';
      } else {
        currentElement.style.fontSize = sizePx + 'px';
      }
    } else {
      editor.style.fontSize = sizePx + 'px';
    }
    return;
  }

  const range = selection.getRangeAt(0);
  
  if (!range.collapsed) {
    cleanupFontSpans(range);
    
    const span = document.createElement('span');
    span.style.fontSize = sizePx + 'px';
    
    try {
      if (range.startContainer === range.endContainer) {
        range.surroundContents(span);
      } else {
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
      }
      
      range.selectNodeContents(span);
      selection.removeAllRanges();
      selection.addRange(range);
      
    } catch (e) {
      console.log("Error applying font size:", e);
      document.execCommand('styleWithCSS', false, true);
      document.execCommand('fontSize', false, '7');
      
      setTimeout(() => {
        const fontElements = editor.querySelectorAll('font[size="7"]');
        fontElements.forEach(el => {
          const span = document.createElement('span');
          span.style.fontSize = sizePx + 'px';
          span.innerHTML = el.innerHTML;
          el.parentNode.replaceChild(span, el);
        });
      }, 10);
    }
  }
}

function cleanupFontSpans(range) {
  const walker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode: function(node) {
        if (node.tagName === 'SPAN' && node.style.fontSize && range.intersectsNode(node)) {
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
