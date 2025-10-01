import { CodeBlock } from "../modules/codeBlock.js";
import { FindReplace } from "../modules/findReplace.js";
import { HorizontalLine } from "../modules/horizontalLine.js";
import { ImageByLink } from "../modules/imageByLink.js";
import { LineHeight } from "../modules/lineHeight.js";
import { MergeFields } from "../modules/mergeFields.js";
import { PageBreak } from "../modules/pageBreak.js";
import { SpecialChar } from "../modules/specialChar.js";
import { Table } from "../modules/table.js";
import { fontSize } from "../modules/fontSize.js";
import { toggleMarkup } from "../modules/toggleMarkup.js";
import { imageUpload } from "../modules/imageUpload.js";
import { exportPDF } from "../modules/exportPDF.js";
import { downloadWord } from "../modules/downloadWord.js";
import { downloadHTML } from "../modules/downloadHTML.js";
import { applyEditorBlockStyles } from "../modules/formatBlock.js";
import { Undo, Redo } from "../modules/undoRedo.js";
import { Bold, Italic, Underline, StrikeThrough } from "../modules/textFormatting.js";


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

      select.onchange = function (e) {
        const savedSelection = saveCurrentSelection();
        editor.focus();

        if (btn.name === "fontName") {
          restoreSelection(savedSelection);
          document.execCommand("fontName", false, this.value);
        } else if (btn.name === "fontSize") {
          if (savedSelection) {
            restoreSelection(savedSelection);
            fontSize(editor, this.value);
          } else {
            fontSize(editor, this.value);
          }
        } else if (btn.name === "lineHeight") {
          restoreSelection(savedSelection);
          LineHeight(editor, this.value);
        }
      };
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
          alert("Emoji button clicked");
          showEmojiPicker(editor, (emoji) => {
            document.execCommand("insertText", false, emoji);
          });
        } else if (btn.cmd === "createLink") {
          const url = prompt("Enter the link URL:", "https://");
          if (url) document.execCommand("createLink", false, url);
        } else if (btn.cmd === "imageUpload") {
          imageUpload();
        } else if (btn.cmd === "imageByLink") {
          const url = prompt("Enter image URL:");
          if (url) document.execCommand("insertImage", false, url);
        } else if (btn.cmd === "insertTable") {
          console.log("Inserting table");
          Table(editor);
        } else if (btn.cmd === "insertCodeBlock") {
          CodeBlock(editor);
        } else if (btn.cmd === "insertHorizontalRule") {
          HorizontalLine(editor);
        } else if (btn.cmd === "insertPageBreak") {
          PageBreak(editor);
        } else if (btn.cmd === "insertDivider") {
          HorizontalLine(editor, true); // true for divider style
        } else if (btn.cmd === "specialChar") {
          SpecialChar(editor, (char) => {
            document.execCommand("insertText", false, char);
          });
        } else if (btn.cmd === "findReplace") {
          FindReplace(editor);
        } else if (btn.cmd === "mergeField") {
          MergeFields(editor);
        } else if (btn.cmd === "toggleMarkup") {
          toggleMarkup(toolbar, editor);
        } else if (btn.cmd === "exportPDF") {
          exportPDF(editor);
        } else if (btn.cmd === "downloadWord") {
          downloadWord(editor);
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
          downloadHTML(editor);
        } else if (btn.cmd === "selectAll") {
          document.execCommand("selectAll", false, null);
        } else if (btn.cmd === "formatBlock") {
          document.execCommand("formatBlock", false, btn.arg || null);
          applyEditorBlockStyles(editor);

        } else if (btn.cmd === "undo") {
          Undo(editor);
        } else if (btn.cmd === "redo") {
          Redo(editor);
        } else if (btn.cmd === "bold") {
          Bold(editor);
        } else if (btn.cmd === "italic") {
          Italic(editor);
        } else if (btn.cmd === "underline") {
          Underline(editor);
        } else if (btn.cmd === "strikeThrough") {
          StrikeThrough(editor);
        } else {
          // document.execCommand(btn.cmd, false, btn.arg || null);
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
