const fileInput = document.getElementById("fileInput");
const preview = document.getElementById("preview");

fileInput.addEventListener("change", function () {
  const file = fileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      preview.src = e.target.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  } else {
    preview.style.display = "none";
  }
});

function uploadImage() {
  if (fileInput.files.length === 0) {
    alert("Selecione uma imagem primeiro!");
    return;
  }

  const formData = new FormData();
  formData.append("image", fileInput.files[0]);
  formData.append("key", "5c1a689a3545531ec671484e9638df0e");

  fetch("https://api.imgbb.com/1/upload", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      if (data.data && data.data.image && data.data.medium && data.data.thumb) {
        document.getElementById(
          "response"
        ).innerHTML = `Link FULL: <a href="${data.data.image.url}" target="_blank">${data.data.image.url}</a> <br/> Link MEDIUM: <a href="${data.data.medium.url}" target="_blank">${data.data.medium.url}</a> <br/> Link THUMB: <a href="${data.data.thumb.url}" target="_blank">${data.data.thumb.url}</a>`;
      } else {
        document.getElementById("response").innerText =
          "Erro ao enviar a imagem.";
      }
    })
    .catch((error) => {
      console.error("Erro no upload:", error);
      document.getElementById("response").innerText = "Erro no upload.";
    });
}
