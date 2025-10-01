let history = [];
let currentStep = -1;

export function saveHistory(editor) {
  const content = editor.innerHTML;
  if (currentStep < history.length - 1) {
    history = history.slice(0, currentStep + 1);
  }
  history.push(content);
  currentStep++;
}

export function Undo(editor) {
  if (currentStep > 0) {
    currentStep--;
    editor.innerHTML = history[currentStep];
  }
}

export function Redo(editor) {
  if (currentStep < history.length - 1) {
    currentStep++;
    editor.innerHTML = history[currentStep];
  }
}
