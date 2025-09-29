// src/js/utils/dom.js
export class DOMUtils {
    static createEl(tag, attrs = {}, ...children) {
        const el = document.createElement(tag);
        
        Object.entries(attrs).forEach(([k, v]) => {
            if (k === 'style' && typeof v === 'object') {
                Object.assign(el.style, v);
            } else {
                el.setAttribute(k, v);
            }
        });
        
        children.forEach(child => {
            if (typeof child === 'string') {
                el.appendChild(document.createTextNode(child));
            } else if (child instanceof Node) {
                el.appendChild(child);
            }
        });
        
        return el;
    }
    
    static findParentByTag(element, tagName) {
        let current = element;
        const upperTagName = tagName.toUpperCase();
        
        while (current && current.nodeType !== Node.DOCUMENT_NODE) {
            if (current.tagName === upperTagName) {
                return current;
            }
            current = current.parentNode;
        }
        
        return null;
    }
    
    static removeElement(element) {
        if (element && element.parentNode) {
            element.parentNode.removeChild(element);
        }
    }
    
    static insertAfter(newElement, targetElement) {
        const parent = targetElement.parentNode;
        if (parent) {
            if (targetElement.nextSibling) {
                parent.insertBefore(newElement, targetElement.nextSibling);
            } else {
                parent.appendChild(newElement);
            }
        }
    }
    
    static getTextContent(element) {
        return element.textContent || element.innerText || '';
    }
    
    static isEmptyElement(element) {
        return !element || (!element.textContent.trim() && element.children.length === 0);
    }
    
    static escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }
    
    static unescapeHtml(html) {
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }
}

// Selection utilities
export class SelectionUtils {
    static saveSelection() {
        const selection = window.getSelection();
        if (selection.rangeCount > 0) {
            return selection.getRangeAt(0).cloneRange();
        }
        return null;
    }
    
    static restoreSelection(range) {
        if (range) {
            const selection = window.getSelection();
            selection.removeAllRanges();
            try {
                selection.addRange(range);
            } catch (e) {
                console.warn('Could not restore selection:', e);
            }
        }
    }
    
    static getSelectedText() {
        const selection = window.getSelection();
        return selection.toString();
    }
    
    static isSelectionInElement(element) {
        const selection = window.getSelection();
        if (selection.rangeCount === 0) return false;
        
        const range = selection.getRangeAt(0);
        return element.contains(range.commonAncestorContainer);
    }
    
    static selectElement(element) {
        const range = document.createRange();
        range.selectNodeContents(element);
        
        const selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
    }
}