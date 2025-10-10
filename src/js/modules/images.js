// Modular images toolbar group
export function initImages(toolbar) {
  // Upload image from device
  toolbar.addButton({
    icon: '<span style="font-size:18px">🖼️</span>',
    title: 'Upload Image',
    onClick: (editor) => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'image/*';
      input.style.display = 'none';
      input.onchange = function() {
        const file = input.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = function(e) {
            insertResizableImage(editor, e.target.result);
          };
          reader.readAsDataURL(file);
        }
      };
      document.body.appendChild(input);
      input.click();
      setTimeout(() => input.remove(), 1000);
    }
  });
  // Import image by link
  toolbar.addButton({
    icon: '<span style="font-size:18px">🌐</span>',
    title: 'Import Image by Link',
    onClick: (editor) => {
      const url = prompt('Enter image URL:');
      if (url) {
        insertResizableImage(editor, url);
      }
    }
  });
  toolbar.addButton({ type: 'divider' });
}

function insertResizableImage(editor, src) {
  // Create wrapper for image and handle
  const wrapper = document.createElement('span');
  wrapper.style.display = 'inline-block';
  wrapper.style.position = 'relative';
  wrapper.style.maxWidth = '100%';

  const img = document.createElement('img');
  img.src = src;
  img.className = 'resizable-image';
  img.style.maxWidth = '100%';
  img.style.minWidth = '40px';
  img.style.minHeight = '40px';
  img.style.borderRadius = '4px';
  img.style.boxShadow = '0 1px 4px rgba(0,0,0,0.07)';
  img.style.display = 'block';
  img.style.width = '200px';
  img.style.height = 'auto';

  // Create resize handle (no arrow, just a small dot)
  const handle = document.createElement('span');
  handle.style.position = 'absolute';
  handle.style.right = '0';
  handle.style.bottom = '0';
  handle.style.width = '12px';
  handle.style.height = '12px';
  handle.style.background = '#60a5fa';
  handle.style.borderRadius = '50%';
  handle.style.cursor = 'nwse-resize';
  handle.style.boxShadow = '0 1px 4px rgba(0,0,0,0.12)';

  // Resize logic (scoped per image)
  let isResizing = false;
  let startX, startY, startWidth, startHeight;
  handle.addEventListener('mousedown', function(e) {
    e.preventDefault();
    isResizing = true;
    startX = e.clientX;
    startY = e.clientY;
    startWidth = img.offsetWidth;
    startHeight = img.offsetHeight;
    document.body.style.userSelect = 'none';

    function mousemove(ev) {
      if (!isResizing) return;
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      img.style.width = Math.max(40, startWidth + dx) + 'px';
      img.style.height = Math.max(40, startHeight + dy) + 'px';
    }
    function mouseup() {
      if (isResizing) {
        isResizing = false;
        document.body.style.userSelect = '';
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup);
      }
    }
    document.addEventListener('mousemove', mousemove);
    document.addEventListener('mouseup', mouseup);
  });

  wrapper.appendChild(img);
  wrapper.appendChild(handle);
  editor.focus();
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    range.collapse(false);
    range.insertNode(wrapper);
  } else {
    editor.appendChild(wrapper);
  }
}
