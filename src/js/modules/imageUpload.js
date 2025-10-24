export function imageUpload() {
  const fileInput = document.createElement("input");
  fileInput.type = "file";
  fileInput.accept = "image/*";
  fileInput.style.display = "none";
  fileInput.onchange = function (e) {
    const file = fileInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (evt) {
        document.execCommand("insertImage", false, evt.target.result);
      };
      reader.readAsDataURL(file);
    }
  };
  document.body.appendChild(fileInput);
  fileInput.click();
  setTimeout(() => fileInput.remove(), 1000);
}
