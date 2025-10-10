// Modular lists toolbar group
export function initLists(toolbar) {
  toolbar.addButton({
    icon: "•",
    title: "Bulleted List",
    onClick: (editor) => {
      document.execCommand("insertUnorderedList");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "1.",
    title: "Numbered List",
    onClick: (editor) => {
      document.execCommand("insertOrderedList");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "←",
    title: "Outdent",
    onClick: (editor) => {
      document.execCommand("outdent");
      editor.focus();
    },
  });
  toolbar.addButton({
    icon: "→",
    title: "Indent",
    onClick: (editor) => {
      document.execCommand("indent");
      editor.focus();
    },
  });
  toolbar.addButton({ type: "divider" });
}
