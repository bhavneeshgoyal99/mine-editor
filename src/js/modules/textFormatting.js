function wrapSelectionWithTag(editor, tagName, className = "") {
  const selection = window.getSelection();
  if (!selection.rangeCount) return;

  const range = selection.getRangeAt(0);

  if (range.collapsed) {
   
    const el = document.createElement(tagName);
    if (className) el.className = className;
    el.appendChild(document.createTextNode("\u200B")); 
    range.insertNode(el);

  
    const newRange = document.createRange();
    newRange.setStart(el.firstChild, 1);
    newRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(newRange);
  } else {
   
    const wrapper = document.createElement(tagName);
    if (className) wrapper.className = className;
    range.surroundContents(wrapper);
  }

  editor.focus();
}


export function Bold(editor) {
  wrapSelectionWithTag(editor, "strong");
}


export function Italic(editor) {
  wrapSelectionWithTag(editor, "em");
}


export function Underline(editor) {
  wrapSelectionWithTag(editor, "span", "underline");
}


export function StrikeThrough(editor) {
  wrapSelectionWithTag(editor, "span", "strikethrough");
}
