export function applyEditorBlockStyles(editor) {
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