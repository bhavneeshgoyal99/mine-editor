export function downloadHTML(editor) {
  const html = editor.innerHTML;
  const blob = new Blob(
    [
      '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body>' +
        html +
        "</body></html>",
    ],
    { type: "text/html" }
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "document.html";
  a.click();
}
