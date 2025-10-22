// src/js/editor.js
import "../css/editor.css";
import "../css/editor.theme.css";

// Core modules
import { initEditor } from "./core/init.js";
import { execCommand } from "./core/commands.js";

// Utils
import { DOMUtils } from "./utils/dom.js";

// UI components
import { createToolbar } from "./ui/toolbar.js";
import { showEmojiPicker } from "./ui/emojiPicker.js";

// Modules
import { CodeBlock } from "./modules/codeBlock.js";
import { FindReplace } from "./modules/findReplace.js";
import { HorizontalLine } from "./modules/horizontalLine.js";
import { ImageByLink } from "./modules/imageByLink.js";
import { LineHeight } from "./modules/lineHeight.js";
import { MergeFields } from "./modules/mergeFields.js";
import { PageBreak } from "./modules/pageBreak.js";
import { SpecialChar } from "./modules/specialChar.js";
import { initSpecialChar } from "./modules/specialChar.js";
import { initDividers } from "./modules/dividers.js";
import { initTable } from "./modules/table.js";
import { initFontFamily } from "./modules/fontFamily.js";
import { initTextFormatting } from "./modules/textFormatting.js";
import { initLists } from "./modules/lists.js";
import { initTextType } from "./modules/textType.js";
import { initLinks } from "./modules/links.js";
import { initImages } from "./modules/images.js";
import { initUndoRedoSelectAll } from "./modules/undoRedoSelectAll.js";

class MineEditor {
  constructor(elementId, options = {}) {
    this.elementId = elementId;
    this.element =
      typeof elementId === "string"
        ? document.getElementById(elementId)
        : elementId;

    this.options = {
      height: "400px",
      theme: "light", // default to light
      placeholder: "Start typing...",
      toolbar: true,
      modules: {
        codeBlock: true,
        findReplace: true,
        table: true,
        emoji: true,
        horizontalLine: true,
        imageByLink: true,
        lineHeight: true,
        mergeFields: true,
        pageBreak: true,
        specialChar: true,
      },
      onChange: null,
      onFocus: null,
      onBlur: null,
      onSelectionChange: null,
      ...options,
    };

    if (!this.element) {
      throw new Error(`Element with ID "${elementId}" not found`);
    }

    this.modules = {};
    this.toolbar = null;
    this.editorElement = null;
    this.toolbarElement = null;

    this.init();
  }

  init() {
    // Initialize core editor structure
    const editorData = initEditor(this.element, this.options);
    this.editorElement = editorData.editor;
    this.toolbarElement = editorData.toolbar;

    // Ensure editor starts with a <p> tag if empty
    if (
      this.editorElement &&
      (!this.editorElement.innerHTML ||
        this.editorElement.innerHTML.trim() === "")
    ) {
      this.editorElement.innerHTML = "<p><br></p>";
    }

    // Initialize modules
    this.initializeModules();

    // Setup event listeners
    this.setupEventListeners();

    // Apply initial styling
    this.applyTheme();
  }

  initializeModules() {
    const moduleConfig = this.options.modules;

    // Add undo/redo/selectAll group if enabled (default: true)
    if (moduleConfig.undoRedoSelectAll !== false) {
      initUndoRedoSelectAll(this.toolbarElement);
    }
    
    // Add text formatting group if enabled (default: true)
    if (moduleConfig.textFormatting !== false) {
        initTextFormatting(this.toolbarElement);
    }
    
    // Add font family dropdown if enabled (default: true)
    if (moduleConfig.fontFamily !== false) {
      initFontFamily(this.toolbarElement);
    }

    // Add lists group if enabled (default: true)
    if (moduleConfig.lists !== false) {
      initLists(this.toolbarElement);
    }

    // Add text type group if enabled (default: true)
    if (moduleConfig.textType !== false) {
      initTextType(this.toolbarElement);
    }

    // Add links group if enabled (default: true)
    if (moduleConfig.links !== false) {
      initLinks(this.toolbarElement);
    }

    // Add images group if enabled (default: true)
    if (moduleConfig.images !== false) {
      initImages(this.toolbarElement);
    }

    // Add table toolbar button if enabled (default: true)
    if (
      moduleConfig.table !== false &&
      typeof this.toolbarElement !== "undefined"
    ) {
      initTable(this.toolbarElement, this.editorElement);
    }

    // // Add code block button if enabled (default: true)
    // if (moduleConfig.codeBlock !== false) {
    //   CodeBlock(this.toolbarElement);
    // }

    // Add dividers group if enabled (default: true)
    if (
      moduleConfig.dividers !== false &&
      typeof this.toolbarElement !== "undefined"
    ) {
      initDividers(this.toolbarElement);
    }

    if (
      moduleConfig.specialChar !== false &&
      typeof this.toolbarElement !== "undefined"
    ) {
      initSpecialChar(this.toolbarElement);
    }
    
    // Add emoji group if enabled (default: true)
    if (
      moduleConfig.emoji !== false &&
      typeof this.toolbarElement !== "undefined"
    ) {
      // Dynamically import to avoid breaking if not present
      try {
        const { initEmoji } = require("./modules/emoji.js");
        initEmoji(this.toolbarElement);
      } catch (e) {
        if (window.initEmoji) {
          window.initEmoji(this.toolbarElement);
        }
      }
    }

    // ...existing module initializations...
    if (moduleConfig.horizontalLine) {
      this.modules.horizontalLine = new HorizontalLine(this);
    }

    if (moduleConfig.imageByLink) {
      this.modules.imageByLink = new ImageByLink(this);
    }

    if (moduleConfig.lineHeight) {
      this.modules.lineHeight = new LineHeight(this);
    }

    if (moduleConfig.mergeFields) {
      this.modules.mergeFields = new MergeFields(this);
    }

    if (moduleConfig.pageBreak) {
      this.modules.pageBreak = new PageBreak(this);
    }


    // Add find & replace group if enabled (default: true)
    if (
      moduleConfig.findReplace !== false &&
      typeof this.toolbarElement !== "undefined"
    ) {
      try {
        const { initFindReplace } = require("./modules/findReplaceModule.js");
        initFindReplace(this.toolbarElement);
      } catch (e) {
        if (window.initFindReplace) {
          window.initFindReplace(this.toolbarElement);
        }
      }
    }

    // Add export PDF and DOC group if enabled (default: true)
    if (typeof this.toolbarElement !== "undefined") {
      try {
        const {
          initExportPDF,
          initExportDOC,
        } = require("./modules/exportModules.js");
        initExportPDF(this.toolbarElement);
        initExportDOC(this.toolbarElement);
      } catch (e) {
        if (window.initExportPDF) {
          window.initExportPDF(this.toolbarElement);
        }
        if (window.initExportDOC) {
          window.initExportDOC(this.toolbarElement);
        }
      }
    }

    // Add EFW Calculator module
    if (typeof this.toolbarElement !== "undefined") {
      try {
        const { initEFWCalculator } = require("./modules/efwCalculator.js");
        initEFWCalculator(this.toolbarElement);
      } catch (e) {
        if (window.initEFWCalculator) {
          window.initEFWCalculator(this.toolbarElement);
        }
      }
    }
    
    // Add export HTML group
    if (typeof this.toolbarElement !== "undefined") {
      try {
        const { initExportHTML } = require("./modules/exportHTMLModule.js");
        initExportHTML(this.toolbarElement);
      } catch (e) {
        if (window.initExportHTML) {
          window.initExportHTML(this.toolbarElement);
        }
      }
    }
    // Add toggle HTML/normal view group
    if (
      typeof this.toolbarElement !== "undefined" &&
      typeof this.editorElement !== "undefined"
    ) {
      try {
        const { initToggleMarkup } = require("./modules/toggleMarkupModule.js");
        initToggleMarkup(this.toolbarElement, this.editorElement);
      } catch (e) {
        if (window.initToggleMarkup) {
          window.initToggleMarkup(this.toolbarElement, this.editorElement);
        }
      }
    }

  }

  setupEventListeners() {
    if (this.editorElement) {
      // Content change event
      this.editorElement.addEventListener("input", () => {
        if (this.options.onChange) {
          this.options.onChange(this.getContent());
        }
      });

      // Focus event
      this.editorElement.addEventListener("focus", () => {
        if (this.options.onFocus) {
          this.options.onFocus();
        }
      });

      // Blur event
      this.editorElement.addEventListener("blur", () => {
        if (this.options.onBlur) {
          this.options.onBlur();
        }
      });

      // Selection change event
      document.addEventListener("selectionchange", () => {
        if (
          this.options.onSelectionChange &&
          document.activeElement === this.editorElement
        ) {
          this.options.onSelectionChange(window.getSelection());
        }
      });
    }
  }

  applyTheme() {
    if (this.options.theme && this.element) {
      this.element.classList.remove("editor-theme-light", "editor-theme-dark");
      this.element.classList.add(`editor-theme-${this.options.theme}`);
    }
    if (this.options.height && this.editorElement) {
      this.editorElement.style.minHeight = this.options.height;
    }
    if (this.options.placeholder && this.editorElement) {
      this.editorElement.setAttribute(
        "data-placeholder",
        this.options.placeholder
      );
    }
  }

  setTheme(theme) {
    if (theme !== "light" && theme !== "dark") return;
    this.options.theme = theme;
    this.applyTheme();
  }

  // Public API methods
  getContent() {
    return this.editorElement ? this.editorElement.innerHTML : "";
  }

  setContent(html) {
    if (this.editorElement) {
      this.editorElement.innerHTML = html;
      if (this.options.onChange) {
        this.options.onChange(html);
      }
    }
  }

  focus() {
    if (this.editorElement) {
      this.editorElement.focus();
    }
  }

  disable() {
    if (this.editorElement) {
      this.editorElement.contentEditable = false;
      this.editorElement.classList.add("editor-disabled");
    }

    if (this.toolbarElement) {
      this.toolbarElement.classList.add("toolbar-disabled");
    }
  }

  enable() {
    if (this.editorElement) {
      this.editorElement.contentEditable = true;
      this.editorElement.classList.remove("editor-disabled");
    }

    if (this.toolbarElement) {
      this.toolbarElement.classList.remove("toolbar-disabled");
    }
  }

  execCommand(cmd, arg) {
    execCommand(cmd, arg);
    this.focus();
  }

  undo() {
    this.execCommand("undo");
  }

  redo() {
    this.execCommand("redo");
  }

  destroy() {
    // Remove event listeners
    if (this.editorElement) {
      this.editorElement.removeEventListener("input", () => {});
      this.editorElement.removeEventListener("focus", () => {});
      this.editorElement.removeEventListener("blur", () => {});
    }

    // Destroy modules
    Object.keys(this.modules).forEach((key) => {
      if (
        this.modules[key] &&
        typeof this.modules[key].destroy === "function"
      ) {
        this.modules[key].destroy();
      }
    });

    // Clean up DOM
    if (this.element) {
      this.element.innerHTML = "";
      this.element.classList.remove(`editor-theme-${this.options.theme}`);
    }

    // Clear references
    this.modules = {};
    this.editorElement = null;
    this.toolbarElement = null;
  }

  // Utility methods
  insertHTML(html) {
    this.execCommand("insertHTML", html);
  }

  getSelection() {
    return window.getSelection();
  }

  saveSelection() {
    const selection = this.getSelection();
    if (selection.rangeCount > 0) {
      return selection.getRangeAt(0).cloneRange();
    }
    return null;
  }

  restoreSelection(range) {
    if (range) {
      const selection = this.getSelection();
      selection.removeAllRanges();
      try {
        selection.addRange(range);
      } catch (e) {
        console.warn("Could not restore selection:", e);
      }
    }
  }
}

// Export for different module systems
if (typeof module !== "undefined" && module.exports) {
  module.exports = MineEditor;
} else if (typeof define === "function" && define.amd) {
  define(function () {
    return MineEditor;
  });
} else {
  window.MineEditor = MineEditor;
}

export default MineEditor;
