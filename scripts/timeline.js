const heartContainer = document.getElementById("floating-hearts");

//store random hearts images w/ file path
// const heartImages = ['assets/images/heart1.png', 'assets/images/heart2.png'];

function createHeart(){
  const heart = document.createElement('img');

  heart.classList.add('heart-img');

  // const randomImages = heartImages[Math.floor(Math.random() * heartImages.length)];
  heart.src = 'assets/images/heart1.png';

  heart.style.left = Math.random() * 100 + "vw";

  heart.style.width = 195 + 'px';
  heart.style.height = 150 + 'px';
  const duration = Math.random() * 3 + 9;

  heart.style.animationDuration = duration + 's';

  heartContainer.appendChild(heart);

  setTimeout(()=>{
    heart.remove();
  }, duration * 500);

}

setInterval(createHeart, 500);

window.addEventListener("load", () => {
  const audio = document.getElementById("background-music");

  // Attempt to autoplay
  audio.play().catch(() => {
    // If autoplay fails, wait for user interaction
    document.addEventListener("click", () => {
      audio.muted = false; // Unmute and play on user interaction
      audio.play();
    });
  });
});