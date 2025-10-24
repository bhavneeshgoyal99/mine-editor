export function downloadWord(editor) {
  const html = editor.innerHTML;
  const blob = new Blob(
    [
      '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:w="urn:schemas-microsoft-com:office:word" xmlns="http://www.w3.org/TR/REC-html40">\n<head><meta charset="utf-8"></head><body>' +
        html +
        "</body></html>",
    ],
    { type: "application/msword" }
  );
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "document.doc";
  a.click();
}
