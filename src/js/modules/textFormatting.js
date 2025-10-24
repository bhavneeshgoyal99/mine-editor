// Modular text formatting toolbar group
export function initTextFormatting(toolbar) {
    const iconStyle = `width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1C274C" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"`;
  // Alignment group
  toolbar.addButton({
    icon: `
    <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4h6a4 4 0 0 1 0 8H6z" />
      <path d="M6 12h7a4 4 0 0 1 0 8H6z" />
    </svg>
  `,
    title: "Bold",
    onClick: (editor) => {
      document.execCommand("bold");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: `
    <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="4" x2="14" y2="4" />
      <line x1="10" y1="20" x2="14" y2="20" />
      <line x1="12" y1="4" x2="10" y2="20" />
    </svg>
  `,
    title: "Italic",
    onClick: (editor) => {
      document.execCommand("italic");
      editor.focus();
    },
  });
  toolbar.addButton({
   icon: `
    <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 4v8a6 6 0 0 0 12 0V4" />
      <line x1="4" y1="20" x2="20" y2="20" />
    </svg>
  `,
    title: "Underline",
    onClick: (editor) => {
      document.execCommand("underline");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: `
    <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
      <path d="M6 12h12" />
      <path d="M6 4h12a4 4 0 0 1 0 8H6a4 4 0 0 0 0 8h12" />
    </svg>
  `,
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
    icon: `<svg width="20" height="20" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect width="48" height="48" fill="white" fill-opacity="0.01"></rect> <path fill-rule="evenodd" clip-rule="evenodd" d="M37 37C39.2091 37 41 35.2091 41 33C41 31.5272 39.6667 29.5272 37 27C34.3333 29.5272 33 31.5272 33 33C33 35.2091 34.7909 37 37 37Z" fill="#000000"></path> <path d="M20.8535 5.50439L24.389 9.03993" stroke="#000000" stroke-width="4" stroke-linecap="round"></path> <path d="M23.6818 8.33281L8.12549 23.8892L19.4392 35.2029L34.9955 19.6465L23.6818 8.33281Z" stroke="#000000" stroke-width="4" stroke-linejoin="round"></path> <path d="M12 20.0732L28.961 25.6496" stroke="#000000" stroke-width="4" stroke-linecap="round"></path> <path d="M4 43H44" stroke="#000000" stroke-width="4" stroke-linecap="round"></path> </g></svg>`,
    title: "Background Color",
    onClick: (editor, _, event) => {
      showColorPicker("hiliteColor", editor, event);
    },
  });
  toolbar.addButton({ type: "divider" });
  toolbar.addButton({
     icon: `
      <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M3 10H16M3 14H21M3 18H16" />
      </svg>
    `,
    title: "Align Left",
    onClick: (editor) => {
      document.execCommand("justifyLeft");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: `
      <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M6 10H18M3 14H21M6 18H18" />
      </svg>
    `,
    title: "Align Center",
    onClick: (editor) => {
      document.execCommand("justifyCenter");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: `
      <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M8 10H21M3 14H21M8 18H21" />
      </svg>
    `,
    title: "Align Right",
    onClick: (editor) => {
      document.execCommand("justifyRight");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: `
      <svg ${iconStyle} xmlns="http://www.w3.org/2000/svg">
        <path d="M3 6H21M3 10H21M3 14H21M3 18H21" />
      </svg>
    `,
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
