// src/js/core/commands.js
export function execCommand(cmd, arg) {
    try {
        return document.execCommand(cmd, false, arg || null);
    } catch (error) {
        console.warn(`Command ${cmd} failed:`, error);
        return false;
    }
}

export function queryCommandState(cmd) {
    try {
        return document.queryCommandState(cmd);
    } catch (error) {
        console.warn(`Query command state ${cmd} failed:`, error);
        return false;
    }
}

export function queryCommandValue(cmd) {
    try {
        return document.queryCommandValue(cmd);
    } catch (error) {
        console.warn(`Query command value ${cmd} failed:`, error);
        return '';
    }
}

// Modern alternative commands
export class ModernCommands {
    static formatText(editor, format, value = null) {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return;

        const range = selection.getRangeAt(0);
        
        switch (format) {
            case 'bold':
                return ModernCommands.toggleFormat(range, 'strong');
            case 'italic':
                return ModernCommands.toggleFormat(range, 'em');
            case 'underline':
                return ModernCommands.toggleFormat(range, 'u');
            case 'fontSize':
                return ModernCommands.setFontSize(range, value);
            default:
                return execCommand(format, value);
        }
    }
    
    static toggleFormat(range, tagName) {
        const upperTagName = tagName.toUpperCase();
        let element = range.commonAncestorContainer;
        
        // Find if we're already inside this format
        while (element && element.nodeType !== Node.DOCUMENT_NODE) {
            if (element.tagName === upperTagName) {
                // Remove formatting
                const parent = element.parentNode;
                while (element.firstChild) {
                    parent.insertBefore(element.firstChild, element);
                }
                parent.removeChild(element);
                return true;
            }
            element = element.parentNode;
        }
        
        // Add formatting
        const formatElement = document.createElement(tagName);
        try {
            range.surroundContents(formatElement);
        } catch (e) {
            // If we can't surround, extract and wrap
            const contents = range.extractContents();
            formatElement.appendChild(contents);
            range.insertNode(formatElement);
        }
        
        return true;
    }
    
    static setFontSize(range, size) {
        const span = document.createElement('span');
        span.style.fontSize = size + (typeof size === 'number' ? 'px' : '');
        
        try {
            range.surroundContents(span);
        } catch (e) {
            const contents = range.extractContents();
            span.appendChild(contents);
            range.insertNode(span);
        }
        
        return true;
    }
}