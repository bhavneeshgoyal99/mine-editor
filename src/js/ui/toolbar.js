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
  // Start with empty toolbar
  toolbar.innerHTML = "";

  // Method for modules to add their own buttons
  toolbar.addButton = function(btn) {
    if (btn.type === "divider") {
      const sep = document.createElement("span");
      sep.className = "toolbar-divider";
      sep.innerHTML = "&nbsp;|&nbsp;";
      toolbar.appendChild(sep);
    } else if (btn.type === "dropdown" && Array.isArray(btn.options)) {
      const select = document.createElement("select");
      select.title = btn.title;
      btn.options.forEach(opt => {
        const option = document.createElement("option");
        option.value = opt.value;
        option.textContent = opt.label;
        select.appendChild(option);
      });
      if (btn.defaultValue) {
        select.value = btn.defaultValue;
      }
      select.onchange = function () {
        btn.onClick(editor, this.value);
      };
      toolbar.appendChild(select);
    } else {
      const button = document.createElement("button");
      button.innerHTML = btn.icon;
      button.title = btn.title;
      button.type = "button";
      button.onclick = function () {
        btn.onClick(editor);
      };
      toolbar.appendChild(button);
    }
  };

  // Save selection whenever user interacts with editor
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
