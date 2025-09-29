// src/js/editor.js
import '../css/editor.css';

// Core modules
import { initEditor } from './core/init.js';
import { execCommand } from './core/commands.js';

// Utils
import { DOMUtils } from './utils/dom.js';

// UI components
import { createToolbar } from './ui/toolbar.js';
import { showEmojiPicker } from './ui/emojiPicker.js';

// Modules
import { CodeBlock } from './modules/codeBlock.js';
import { FindReplace } from './modules/findReplace.js';
import { HorizontalLine } from './modules/horizontalLine.js';
import { ImageByLink } from './modules/imageByLink.js';
import { LineHeight } from './modules/lineHeight.js';
import { MergeFields } from './modules/mergeFields.js';
import { PageBreak } from './modules/pageBreak.js';
import { SpecialChar } from './modules/specialChar.js';
import { Table } from './modules/table.js';

class AdvancedTextEditor {
    constructor(elementId, options = {}) {
        this.elementId = elementId;
        this.element = typeof elementId === 'string' ? document.getElementById(elementId) : elementId;
        
        this.options = {
            height: '400px',
            theme: 'default',
            placeholder: 'Start typing...',
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
                specialChar: true
            },
            onChange: null,
            onFocus: null,
            onBlur: null,
            onSelectionChange: null,
            ...options
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
        
        // Initialize modules
        this.initializeModules();
        
        // Setup event listeners
        this.setupEventListeners();
        
        // Apply initial styling
        this.applyTheme();
    }
    
    initializeModules() {
        const moduleConfig = this.options.modules;
        
        if (moduleConfig.codeBlock) {
            this.modules.codeBlock = new CodeBlock(this);
        }
        
        if (moduleConfig.findReplace) {
            this.modules.findReplace = new FindReplace(this);
        }
        
        if (moduleConfig.table) {
            this.modules.table = new Table(this);
        }
        
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
        
        if (moduleConfig.specialChar) {
            this.modules.specialChar = new SpecialChar(this);
        }
    }
    
    setupEventListeners() {
        if (this.editorElement) {
            // Content change event
            this.editorElement.addEventListener('input', () => {
                if (this.options.onChange) {
                    this.options.onChange(this.getContent());
                }
            });
            
            // Focus event
            this.editorElement.addEventListener('focus', () => {
                if (this.options.onFocus) {
                    this.options.onFocus();
                }
            });
            
            // Blur event
            this.editorElement.addEventListener('blur', () => {
                if (this.options.onBlur) {
                    this.options.onBlur();
                }
            });
            
            // Selection change event
            document.addEventListener('selectionchange', () => {
                if (this.options.onSelectionChange && document.activeElement === this.editorElement) {
                    this.options.onSelectionChange(window.getSelection());
                }
            });
        }
    }
    
    applyTheme() {
        if (this.options.theme && this.element) {
            this.element.classList.add(`editor-theme-${this.options.theme}`);
        }
        
        if (this.options.height && this.editorElement) {
            this.editorElement.style.minHeight = this.options.height;
        }
        
        if (this.options.placeholder && this.editorElement) {
            this.editorElement.setAttribute('data-placeholder', this.options.placeholder);
        }
    }
    
    // Public API methods
    getContent() {
        return this.editorElement ? this.editorElement.innerHTML : '';
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
            this.editorElement.classList.add('editor-disabled');
        }
        
        if (this.toolbarElement) {
            this.toolbarElement.classList.add('toolbar-disabled');
        }
    }
    
    enable() {
        if (this.editorElement) {
            this.editorElement.contentEditable = true;
            this.editorElement.classList.remove('editor-disabled');
        }
        
        if (this.toolbarElement) {
            this.toolbarElement.classList.remove('toolbar-disabled');
        }
    }
    
    execCommand(cmd, arg) {
        execCommand(cmd, arg);
        this.focus();
    }
    
    undo() {
        this.execCommand('undo');
    }
    
    redo() {
        this.execCommand('redo');
    }
    
    destroy() {
        // Remove event listeners
        if (this.editorElement) {
            this.editorElement.removeEventListener('input', () => {});
            this.editorElement.removeEventListener('focus', () => {});
            this.editorElement.removeEventListener('blur', () => {});
        }
        
        // Destroy modules
        Object.keys(this.modules).forEach(key => {
            if (this.modules[key] && typeof this.modules[key].destroy === 'function') {
                this.modules[key].destroy();
            }
        });
        
        // Clean up DOM
        if (this.element) {
            this.element.innerHTML = '';
            this.element.classList.remove(`editor-theme-${this.options.theme}`);
        }
        
        // Clear references
        this.modules = {};
        this.editorElement = null;
        this.toolbarElement = null;
    }
    
    // Utility methods
    insertHTML(html) {
        this.execCommand('insertHTML', html);
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
                console.warn('Could not restore selection:', e);
            }
        }
    }
}

// Export for different module systems
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AdvancedTextEditor;
} else if (typeof define === 'function' && define.amd) {
    define(function() { return AdvancedTextEditor; });
} else {
    window.AdvancedTextEditor = AdvancedTextEditor;
}

export default AdvancedTextEditor;