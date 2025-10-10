// Modular text formatting toolbar group
export function initTextFormatting(toolbar) {
  // Alignment group
  toolbar.addButton({
    icon: "B",
    title: "Bold",
    onClick: (editor) => {
      document.execCommand("bold");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "I",
    title: "Italic",
    onClick: (editor) => {
      document.execCommand("italic");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "U",
    title: "Underline",
    onClick: (editor) => {
      document.execCommand("underline");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "S",
    title: "Strikethrough",
    onClick: (editor) => {
      document.execCommand("strikeThrough");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "A+",
    title: "Font Size",
    type: "dropdown",
    options: [
      { value: "12", label: "12px" },
      { value: "14", label: "14px" },
      { value: "16", label: "16px" },
      { value: "18", label: "18px" },
      { value: "20", label: "20px" },
      { value: "24", label: "24px" },
      { value: "28", label: "28px" },
      { value: "30", label: "30px" },
      { value: "32", label: "32px" },
      { value: "35", label: "35px" },
      { value: "38", label: "38px" },
      { value: "40", label: "40px" },
      { value: "45", label: "45px" },
      { value: "50", label: "50px" },
      { value: "55", label: "55px" },
    ],
    onClick: (editor, value) => {
      applyFontSize(editor, value);
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "LH",
    title: "Line Height",
    type: "dropdown",
    options: [
      { value: "1", label: "1" },
      { value: "1.15", label: "1.15" },
      { value: "1.5", label: "1.5" },
      { value: "2", label: "2" },
      { value: "2.5", label: "2.5" },
      { value: "3", label: "3" },
    ],
    onClick: (editor, value) => {
      applyLineHeight(editor, value);
      editor.focus();
    },
  });

  toolbar.addButton({
    icon: '<span style="color:#000">A</span>',
    title: "Text Color",
    onClick: (editor, _, event) => {
      showColorPicker("foreColor", editor, event);
    },
  });
  toolbar.addButton({
    icon: '<span style="background:#ff0;color:#000">A</span>',
    title: "Background Color",
    onClick: (editor, _, event) => {
      showColorPicker("hiliteColor", editor, event);
    },
  });
  toolbar.addButton({ type: "divider" });
  toolbar.addButton({
    icon: '<span style="display:inline-block;width:18px;text-align:left">L</span>',
    title: "Align Left",
    onClick: (editor) => {
      document.execCommand("justifyLeft");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: '<span style="display:inline-block;width:18px;text-align:center">C</span>',
    title: "Align Center",
    onClick: (editor) => {
      document.execCommand("justifyCenter");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: '<span style="display:inline-block;width:18px;text-align:right">R</span>',
    title: "Align Right",
    onClick: (editor) => {
      document.execCommand("justifyRight");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: '<span style="display:inline-block;width:18px;text-align:justify">J</span>',
    title: "Justify",
    onClick: (editor) => {
      document.execCommand("justifyFull");
      editor.focus();
    },
  });

  function showColorPicker(type, editor, event) {
    // Remove any existing picker
    document
      .querySelectorAll(".editor-color-picker")
      .forEach((p) => p.remove());
    const picker = document.createElement("input");
    picker.type = "color";
    picker.className = "editor-color-picker";
    picker.id = "editor-color-picker-" + type;
    picker.style.position = "absolute";
    picker.style.zIndex = 1000;
    // Use event target for accurate positioning
    let targetBtn = event && event.target ? event.target : null;
    // alert("Color picker opened", targetBtn);
    if (targetBtn) {
      const rect = targetBtn.getBoundingClientRect();
      picker.style.left = rect.left + "px";
      picker.style.top = rect.bottom + 4 + "px";
    } else if (editor) {
      const rect = editor.getBoundingClientRect();
      alert("Color picker openedhggfhfhffghgh", rect);
      picker.style.left = rect.left + "px";
      picker.style.top = rect.top + 10 + "px";
    } else {
      alert("Color picker opened at center");
      picker.style.left = "50%";
      picker.style.top = "40px";
    }
    document.body.appendChild(picker);
    picker.oninput = function () {
      document.execCommand(type, false, this.value);
      editor.focus();
    };
    // Only close picker if user clicks outside
    setTimeout(() => {
      document.addEventListener("mousedown", function handler(e) {
        if (
          !picker.contains(e.target) &&
          (!targetBtn || !targetBtn.contains(e.target))
        ) {
          picker.remove();
          document.removeEventListener("mousedown", handler);
        }
      });
    }, 10);
    picker.click();
  }
  function applyLineHeight(editor, value) {
    const selection = window.getSelection();
    if (selection.rangeCount === 0 || selection.isCollapsed) {
      editor.style.lineHeight = value;
      return;
    }
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      cleanupLineHeightSpans(range);
      const span = document.createElement("span");
      span.style.lineHeight = value;
      try {
        range.surroundContents(span);
      } catch (e) {
        const contents = range.extractContents();
        span.appendChild(contents);
        range.insertNode(span);
      }
    }
  }

  function cleanupLineHeightSpans(range) {
    const walker = document.createTreeWalker(
      range.commonAncestorContainer,
      NodeFilter.SHOW_ELEMENT,
      {
        acceptNode: function (node) {
          if (
            node.tagName === "SPAN" &&
            node.style.lineHeight &&
            range.intersectsNode(node)
          ) {
            return NodeFilter.FILTER_ACCEPT;
          }
          return NodeFilter.FILTER_SKIP;
        },
      }
    );
    const spans = [];
    let node;
    while ((node = walker.nextNode())) {
      spans.push(node);
    }
    spans.forEach((span) => {
      if (range.intersectsNode(span)) {
        const parent = span.parentNode;
        while (span.firstChild) {
          parent.insertBefore(span.firstChild, span);
        }
        parent.removeChild(span);
      }
    });
  }

  toolbar.addButton({ type: "divider" });
}

function applyFontSize(editor, sizePx) {
  const selection = window.getSelection();
  if (selection.rangeCount === 0 || selection.isCollapsed) {
    if (selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const currentElement =
        range.startContainer.nodeType === Node.TEXT_NODE
          ? range.startContainer.parentElement
          : range.startContainer;
      if (currentElement === editor) {
        editor.style.fontSize = sizePx + "px";
      } else {
        currentElement.style.fontSize = sizePx + "px";
      }
    } else {
      editor.style.fontSize = sizePx + "px";
    }
    return;
  }
  const range = selection.getRangeAt(0);
  if (!range.collapsed) {
    cleanupFontSpans(range);
    const span = document.createElement("span");
    span.style.fontSize = sizePx + "px";
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
      document.execCommand("styleWithCSS", false, true);
      document.execCommand("fontSize", false, "7");
      setTimeout(() => {
        const fontElements = editor.querySelectorAll('font[size="7"]');
        fontElements.forEach((el) => {
          const span = document.createElement("span");
          span.style.fontSize = sizePx + "px";
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
      acceptNode: function (node) {
        if (
          node.tagName === "SPAN" &&
          node.style.fontSize &&
          range.intersectsNode(node)
        ) {
          return NodeFilter.FILTER_ACCEPT;
        }
        return NodeFilter.FILTER_SKIP;
      },
    }
  );
  const spans = [];
  let node;
  while ((node = walker.nextNode())) {
    spans.push(node);
  }
  spans.forEach((span) => {
    if (range.intersectsNode(span)) {
      const parent = span.parentNode;
      while (span.firstChild) {
        parent.insertBefore(span.firstChild, span);
      }
      parent.removeChild(span);
    }
  });
}
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
