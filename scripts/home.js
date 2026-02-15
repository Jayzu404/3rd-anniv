const modal = document.querySelector('.modal');
const envelope = document.querySelector('.envelope');

envelope.addEventListener('click', () => {
  showModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = 'none';
}

function showModal() {
  modal.style.display = 'flex';
}