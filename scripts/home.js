const modal = document.querySelector(".modal");
const envelope = document.querySelector(".envelope");
const songBtns = document.querySelectorAll(".song-btn");
let currentAudio = null;
let currentButton = null;

envelope.addEventListener("click", () => {
  showModal();
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    closeModal();
  }
});

function closeModal() {
  modal.style.display = "none";
}

function showModal() {
  modal.style.display = "flex";
}

songBtns.forEach((btn) => {
  const audio = btn.closest(".song-card").querySelector("audio");

  btn.addEventListener("click", () => {
    // making sure previous audio is reset and pause
    if (currentAudio && currentAudio !== audio) {
      currentAudio.pause();
      currentButton.innerText = "▶";
      currentAudio.currentTime = 0;
    }

    currentAudio = audio;
    currentButton = btn;

    if (audio.paused) {
      audio.play().catch((err) => {
        btn.innerText = "▶";
        console.error("Payback failed: ", err);
      });
      btn.innerText = "⏸";
    } else {
      audio.pause();
      btn.innerText = "▶";
    }

    audio.addEventListener('ended', () => {
      btn.innerText = "▶";
      currentAudio = null;
      currentButton = null;
    });
  });
});