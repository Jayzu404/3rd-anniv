const images = document.querySelectorAll("img");
const modal = document.querySelector(".modal");
const modalImg = document.getElementById("modal-img");
const closeBtn = document.querySelector(".close");

images.forEach((img) => {
  img.addEventListener("click", () => {
    modalImg.src = img.src;
    modal.alt = img.src;
    modal.style.display = "flex";
  });
});

closeBtn.addEventListener("click", () => {
  closeModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
}