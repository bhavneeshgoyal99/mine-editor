// Toolbar UI component
export function createToolbar(toolbar, editor, options, { showEmojiPicker }) {
  const buttons = [
    { cmd: "undo", icon: "↺", title: "Undo" },
    { cmd: "redo", icon: "↻", title: "Redo" },
    { cmd: "selectAll", icon: "⎁", title: "Select All" },
    { type: "divider" },
    { cmd: "bold", icon: "B", title: "Bold" },
    { cmd: "italic", icon: "I", title: "Italic" },
    { cmd: "underline", icon: "U", title: "Underline" },
    { cmd: "strikeThrough", icon: "S", title: "Strikethrough" },
    {
      type: "dropdown",
      name: "fontName",
      options: [
        { value: "Arial", label: "Arial" },
        { value: "Times New Roman", label: "Times New Roman" },
        { value: "Courier New", label: "Courier New" },
        { value: "Georgia", label: "Georgia" },
        { value: "Verdana", label: "Verdana" },
      ],
      title: "Font Family",
    },
    {
      type: "dropdown",
      name: "fontSize",
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
      title: "Font Size",
    },
    // { type: "input", name: "fontSize", title: "Font Size (px)" },
    {
      type: "dropdown",
      name: "lineHeight",
      options: [
        { value: "1", label: "1" },
        { value: "1.5", label: "1.5" },
        { value: "2", label: "2" },
        { value: "2.5", label: "2.5" },
        { value: "3", label: "3" },
      ],
      title: "Line Height",
    },
    { type: "color", name: "foreColor", title: "Text Color" },
    { type: "color", name: "hiliteColor", title: "Highlight" },
    { type: "divider" },
    { cmd: "justifyLeft", icon: "⯇", title: "Align Left" },
    { cmd: "justifyCenter", icon: "≡", title: "Align Center" },
    { cmd: "justifyRight", icon: "⯈", title: "Align Right" },
    { cmd: "justifyFull", icon: "☰", title: "Justify" },
    { type: "divider" },
    { cmd: "insertUnorderedList", icon: "• List", title: "Bullet List" },
    { cmd: "insertOrderedList", icon: "1. List", title: "Numbered List" },
    { cmd: "outdent", icon: "←", title: "Outdent" },
    { cmd: "indent", icon: "→", title: "Indent" },
    { type: "divider" },
    { cmd: "formatBlock", arg: "H1", icon: "H1", title: "Heading 1" },
    { cmd: "formatBlock", arg: "H2", icon: "H2", title: "Heading 2" },
    { cmd: "formatBlock", arg: "H3", icon: "H3", title: "Heading 3" },
    { cmd: "formatBlock", arg: "P", icon: "P", title: "Paragraph" },
    { type: "divider" },
    { cmd: "createLink", icon: "🔗", title: "Insert Link" },
    { cmd: "imageUpload", icon: "🖼️", title: "Insert Image" },
    // { cmd: "importWord", icon: "📤", title: "Import Word File" },
    { cmd: "imageByLink", icon: "🌐", title: "Insert Image by Link" },
    { cmd: "insertTable", icon: "▦", title: "Insert Table" },
    { cmd: "insertCodeBlock", icon: "</>", title: "Insert Code Block" },
    { cmd: "insertHorizontalRule", icon: "―", title: "Horizontal Line" },
    { cmd: "insertPageBreak", icon: "⎆", title: "Page Break" },
    { cmd: "insertDivider", icon: "━", title: "Divider" },
    { cmd: "specialChar", icon: "Ω", title: "Special Character" },
    { cmd: "emoji", icon: "😊", title: "Insert Emoji" },
    { type: "divider" },
    { cmd: "findReplace", icon: "🔍", title: "Find & Replace" },
    { cmd: "mergeField", icon: "{ }", title: "Merge Field" },
    { type: "divider" },
    { cmd: "exportPDF", icon: "📄", title: "Export PDF" },
    { cmd: "downloadWord", icon: "📥", title: "Download Word File" },
    { cmd: "downloadHTML", icon: "&lt;HTML&gt;", title: "Download HTML" },
    { cmd: "toggleMarkup", icon: "&lt;/&gt;", title: "Toggle Markup" },
  ];
  toolbar.innerHTML = "";
  buttons.forEach((btn) => {
    if (btn.type === "divider") {
      const sep = document.createElement("span");
      sep.className = "toolbar-divider";
      sep.innerHTML = "&nbsp;|&nbsp;";
      toolbar.appendChild(sep);
    } else if (btn.type === "input") {
      // Font size as input field
      const input = document.createElement("input");
      input.type = "number";
      input.placeholder = "Font Size";
      input.title = btn.title;
      input.style.width = "60px";
      input.min = 1;
      input.max = 99;
      input.id = btn.name;
      input.onchange = function (e) {
        editor.focus();
        if (input.value) {
          applyFontSize(editor, input.value);
          editor.focus();
        }
      };
      toolbar.appendChild(input);
    } else if (btn.type === "dropdown") {
      const select = document.createElement("select");
      select.title = btn.title;
      select.id = btn.name;
      btn.options.forEach((opt) => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
      });
      
      // New improved handler
      select.onchange = createImprovedDropdownHandler(editor, btn);
      
      // Prevent selection loss
      select.addEventListener("mousedown", (e) => {
        e.stopPropagation();
        saveCurrentSelection();
      });
      select.addEventListener("click", (e) => e.stopPropagation());
      
      toolbar.appendChild(select);
    } else if (btn.type === "color") {
      const input = document.createElement("input");
      input.type = "color";
      input.title = btn.title;
      input.onchange = function () {
        document.execCommand(btn.name, false, this.value);
        editor.focus();
      };
      toolbar.appendChild(input);
    } else {
      const button = document.createElement("button");
      button.innerHTML = btn.icon;
      button.title = btn.title;
      button.type = "button";
      button.onclick = function () {
        // Handle special commands
        if (btn.cmd === "emoji") {
          showEmojiPicker(editor, (emoji) => {
            document.execCommand("insertText", false, emoji);
          });
        } else if (btn.cmd === "createLink") {
          const url = prompt("Enter the link URL:", "https://");
          if (url) document.execCommand("createLink", false, url);
        } else if (btn.cmd === "imageUpload") {
          // Image upload logic
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept = "image/*";
          fileInput.style.display = "none";
          fileInput.onchange = function (e) {
            const file = fileInput.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (evt) {
                document.execCommand("insertImage", false, evt.target.result);
              };
              reader.readAsDataURL(file);
            }
          };
          document.body.appendChild(fileInput);
          fileInput.click();
          setTimeout(() => fileInput.remove(), 1000);
        } else if (btn.cmd === "imageByLink") {
          const url = prompt("Enter image URL:");
          if (url) document.execCommand("insertImage", false, url);
        } else if (btn.cmd === "insertTable") {
          showTableDialog(editor);
        } else if (btn.cmd === "insertCodeBlock") {
          const code = prompt("Enter code:");
          if (code !== null) {
            document.execCommand(
              "insertHTML",
              false,
              `<pre><code>${escapeHtml(code)}</code></pre>`
            );
          }
        } else if (btn.cmd === "insertHorizontalRule") {
          document.execCommand("insertHorizontalRule", false, null);
        } else if (btn.cmd === "insertPageBreak") {
          document.execCommand(
            "insertHTML",
            false,
            '<div style="page-break-after:always;"></div>'
          );
        } else if (btn.cmd === "insertDivider") {
          document.execCommand(
            "insertHTML",
            false,
            '<hr style="border-top:2px solid #888;">'
          );
        } else if (btn.cmd === "specialChar") {
          alert("Special character picker: implement logic here.");
        } else if (btn.cmd === "findReplace") {
          showFindReplaceDialog(editor);
        } else if (btn.cmd === "mergeField") {
          const field = prompt("Enter merge field name:");
          if (field) document.execCommand("insertText", false, `{{${field}}}`);
        } else if (btn.cmd === "toggleMarkup") {
          // Markup mode toggle
          toggleMarkup(toolbar, editor);
        } else if (btn.cmd === "exportPDF") {
          // Print to PDF using a new window
          const win = window.open("", "", "width=800,height=600");
          win.document.write("<html><head><title>Export PDF</title>");
          win.document.write('<link rel="stylesheet" href="editor.css">');
          win.document.write(
            "</head><body>" + editor.innerHTML + "</body></html>"
          );
          win.document.close();
          win.focus();
          setTimeout(() => win.print(), 500);
        } else if (btn.cmd === "downloadWord") {
          // Download as .doc (Word-compatible HTML)
          const html = editor.innerHTML;
          const blob = new Blob(
            [
              '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\n<head><meta charset="utf-8"></head><body>' +
                html +
                "</body></html>",
            ],
            { type: "application/msword" }
          );
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "document.doc";
          a.click();
        } else if (btn.cmd === "importWord") {
          // Import Word file (basic: extract text from .docx/.doc as plain text)
          const fileInput = document.createElement("input");
          fileInput.type = "file";
          fileInput.accept =
            ".doc,.docx,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document";
          fileInput.style.display = "none";
          fileInput.onchange = function (e) {
            const file = fileInput.files[0];
            if (file) {
              const reader = new FileReader();
              reader.onload = function (evt) {
                // Try to extract text from Word file (very basic, no 3rd party libs)
                let text = evt.target.result;
                // .docx is zipped XML, .doc is binary, so fallback to showing as plain text
                if (file.name.endsWith(".docx")) {
                  // Try to extract text nodes from XML
                  const matches = text.match(/<w:t[^>]*>(.*?)<\/w:t>/g);
                  if (matches) {
                    text = matches.map((t) => t.replace(/<[^>]+>/g, ""));
                    text = text.join(" ");
                  } else {
                    text = "[Unable to extract text from .docx]";
                  }
                } else {
                  // .doc: just show as plain text
                  text = text.replace(/\0/g, "");
                }
                document.execCommand("insertText", false, text);
              };
              reader.readAsText(file);
            }
          };
          document.body.appendChild(fileInput);
          fileInput.click();
          setTimeout(() => fileInput.remove(), 1000);
        } else if (btn.cmd === "downloadHTML") {
          // Download HTML
          const html = editor.innerHTML;
          const blob = new Blob(
            [
              '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
                html +
                "</body></html>",
            ],
            { type: "text/html" }
          );
          const a = document.createElement("a");
          a.href = URL.createObjectURL(blob);
          a.download = "document.html";
          a.click();
        } else if (btn.cmd === "selectAll") {
          document.execCommand("selectAll", false, null);
        } else if (btn.cmd === "formatBlock") {
          document.execCommand("formatBlock", false, btn.arg || null);
          applyEditorBlockStyles(editor);
        } else {
          document.execCommand(btn.cmd, false, btn.arg || null);
        }
        editor.focus();
      };
      toolbar.appendChild(button);
    }
  });

  // Save selection whenever user interacts with editor - UPDATED
  editor.addEventListener("mouseup", saveCurrentSelection);
  editor.addEventListener("keyup", saveCurrentSelection);
  editor.addEventListener("focus", saveCurrentSelection);
}

function applyEditorBlockStyles(editor) {
  const blocks = editor.querySelectorAll("h1, h2, h3, p");
  blocks.forEach(el => {
    switch (el.tagName) {
      case "H1":
        el.style.fontSize = "32px";
        el.style.fontWeight = "600";
        el.style.margin = "0"; 
        break;
      case "H2":
        el.style.fontSize = "24px";
        el.style.fontWeight = "600";
        el.style.margin = "0"; 
        break;
      case "H3":
        el.style.fontSize = "20.8px";
        el.style.fontWeight = "600";
        el.style.margin = "0"; 
        break;
      case "P":
        el.style.fontSize = "17px";
        el.style.fontWeight = "normal"; 
        el.style.margin = "0"; 
        break;
    }
  });
}

// ----------------------------
// Updated Selection Logic
// ----------------------------
let currentSavedSelection = null;

function saveCurrentSelection() {
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    currentSavedSelection = selection.getRangeAt(0).cloneRange();
    return currentSavedSelection;
  }
  return null;
}

function restoreSelection(savedRange) {
  if (savedRange) {
    const selection = window.getSelection();
    selection.removeAllRanges();
    try {
      selection.addRange(savedRange);
    } catch (e) {
      console.log("Could not restore selection:", e);
    }
  }
}

// Updated Font Size Application - COMPLETELY REPLACED
function applyFontSize(editor, sizePx) {
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

// Font spans को clean up करने का function - NEW
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

// Improved dropdown handler - NEW
function createImprovedDropdownHandler(editor, btn) {
  return function(e) {
    const savedSelection = saveCurrentSelection();
    editor.focus();
    
    if (btn.name === "fontName") {
      restoreSelection(savedSelection);
      document.execCommand("fontName", false, this.value);
      
    } else if (btn.name === "fontSize") {
      if (savedSelection) {
        restoreSelection(savedSelection);
        applyFontSize(editor, this.value);
      } else {
        applyFontSize(editor, this.value);
      }
      
    } else if (btn.name === "lineHeight") {
      if (savedSelection) {
        restoreSelection(savedSelection);
        applyLineHeight(editor, this.value);
      } else {
        editor.style.lineHeight = this.value;
      }
    }
    
    setTimeout(() => editor.focus(), 10);
  };
}

// Line height function - NEW
function applyLineHeight(editor, lineHeightValue) {
  const selection = window.getSelection();
  
  if (selection.rangeCount === 0 || selection.isCollapsed) {
    editor.style.lineHeight = lineHeightValue;
    return;
  }

  const range = selection.getRangeAt(0);
  
  if (!range.collapsed) {
    const span = document.createElement('span');
    span.style.lineHeight = lineHeightValue;
    
    try {
      range.surroundContents(span);
    } catch (e) {
      const contents = range.extractContents();
      span.appendChild(contents);
      range.insertNode(span);
    }
  }
}

function getNodesInRange(range) {
  const nodes = [];
  const treeWalker = document.createTreeWalker(
    range.commonAncestorContainer,
    NodeFilter.SHOW_ALL,
    {
      acceptNode: (node) => {
        if (range.intersectsNode(node)) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_REJECT;
      },
    }
  );
  let currentNode = treeWalker.currentNode;
  while (currentNode) {
    nodes.push(currentNode);
    currentNode = treeWalker.nextNode();
  }
  return nodes;
}

// Table dialog for CKEditor-like customization
function showTableDialog(editor) {
  let dialog = document.getElementById('table-dialog');
  if (dialog) dialog.remove();
  dialog = document.createElement('div');
  dialog.id = 'table-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '25%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, 0)';
  dialog.style.background = '#fff';
  dialog.style.border = '1px solid #ccc';
  dialog.style.padding = '18px';
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <label>Rows: <input type="number" id="table-rows" value="2" min="1" style="width:40px"></label>&nbsp;
    <label>Columns: <input type="number" id="table-cols" value="2" min="1" style="width:40px"></label><br><br>
    <label>Border: <input type="number" id="table-border" value="1" min="0" style="width:40px"></label>&nbsp;
    <label>Width: <input type="text" id="table-width" value="100%" style="width:60px"></label><br><br>
    <label>Cell Padding: <input type="number" id="table-padding" value="6" min="0" style="width:40px"></label>&nbsp;
    <label>BG Color: <input type="color" id="table-bg" value="#ffffff"></label><br><br>
    <button id="table-insert-btn">Insert Table</button>
    <button id="table-cancel-btn">Cancel</button>
  `;
  document.body.appendChild(dialog);
  document.getElementById('table-cancel-btn').onclick = () => dialog.remove();
  document.getElementById('table-insert-btn').onclick = () => {
    const rows = parseInt(document.getElementById('table-rows').value, 10);
    const cols = parseInt(document.getElementById('table-cols').value, 10);
    const border = parseInt(document.getElementById('table-border').value, 10);
    const width = document.getElementById('table-width').value;
    const padding = parseInt(document.getElementById('table-padding').value, 10);
    const bg = document.getElementById('table-bg').value;
    if (rows > 0 && cols > 0) {
      let html = `<table style="border-collapse:collapse;width:${width};">`;
      for (let r = 0; r < rows; r++) {
        html += '<tr>';
        for (let c = 0; c < cols; c++) {
          html += `<td style="border:${border}px solid #888;padding:${padding}px;background:${bg};">&nbsp;</td>`;
        }
        html += '</tr>';
      }
      html += '</table><br>';
      editor.focus();
      document.execCommand('insertHTML', false, html);
    }
    dialog.remove();
  };
}

// Escape HTML for code block
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, function(tag) {
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

// Find and Replace Dialog
function showFindReplaceDialog(editor) {
  let dialog = document.getElementById('find-replace-dialog');
  if (dialog) dialog.remove();
  dialog = document.createElement('div');
  dialog.id = 'find-replace-dialog';
  dialog.style.position = 'fixed';
  dialog.style.top = '20%';
  dialog.style.left = '50%';
  dialog.style.transform = 'translate(-50%, 0)';
  dialog.style.background = '#fff';
  dialog.style.border = '1px solid #ccc';
  dialog.style.padding = '16px';
  dialog.style.zIndex = 10000;
  dialog.innerHTML = `
    <label>Find: <input type="text" id="find-text"></label><br><br>
    <label>Replace: <input type="text" id="replace-text"></label><br><br>
    <button id="find-btn">Find</button>
    <button id="replace-btn">Replace</button>
    <button id="replace-all-btn">Replace All</button>
    <button id="close-find-replace">Close</button>
    <div id="find-replace-result" style="margin-top:8px;"></div>
  `;
  document.body.appendChild(dialog);
  const findInput = dialog.querySelector('#find-text');
  const replaceInput = dialog.querySelector('#replace-text');
  const resultDiv = dialog.querySelector('#find-replace-result');
  dialog.querySelector('#close-find-replace').onclick = () => dialog.remove();
  dialog.querySelector('#find-btn').onclick = () => {
    const text = findInput.value;
    if (!text) return;
    const html = editor.innerHTML;
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let count = 0;
    editor.innerHTML = html.replace(regex, match => {
      count++;
      return `<mark>${match}</mark>`;
    });
    resultDiv.textContent = count + ' matches highlighted.';
  };
  dialog.querySelector('#replace-btn').onclick = () => {
    const text = findInput.value;
    const replace = replaceInput.value;
    if (!text) return;
    const sel = window.getSelection();
    if (sel.rangeCount) {
      const range = sel.getRangeAt(0);
      if (range && range.toString().toLowerCase() === text.toLowerCase()) {
        range.deleteContents();
        range.insertNode(document.createTextNode(replace));
      }
    }
  };
  dialog.querySelector('#replace-all-btn').onclick = () => {
    const text = findInput.value;
    const replace = replaceInput.value;
    if (!text) return;
    const html = editor.innerHTML;
    const regex = new RegExp(text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    let count = 0;
    editor.innerHTML = html.replace(regex, match => {
      count++;
      return replace;
    });
    resultDiv.textContent = count + ' replacements made.';
  };
}

// Markup mode toggle logic
function toggleMarkup(toolbar, editor) {
  let markup = document.getElementById('editor-markup');
  if (!markup) {
    markup = document.createElement('textarea');
    markup.id = 'editor-markup';
    markup.className = 'editor';
    markup.style.display = 'block';
    markup.style.minHeight = '320px';
    markup.style.width = '100%';
    markup.style.fontFamily = 'monospace';
    markup.style.fontSize = '15px';
    markup.value = editor.innerHTML;
    editor.style.display = 'none';
    editor.parentNode.appendChild(markup);
    markup.focus();
    markup.addEventListener('blur', function syncBack() {
      if (markup.style.display !== 'none') {
        editor.innerHTML = markup.value;
      }
    });
  } else if (markup.style.display === 'none') {
    markup.value = editor.innerHTML;
    markup.style.display = 'block';
    editor.style.display = 'none';
    markup.focus();
  } else {
    editor.innerHTML = markup.value;
    markup.style.display = 'none';
    editor.style.display = 'block';
    editor.focus();
  }
}
