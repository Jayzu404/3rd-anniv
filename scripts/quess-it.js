const btn = document.getElementById("submit-btn");
const input = document.getElementById("guess-input");
const secretWord = "asemco hilltop";
const wrongMsg = document.querySelector(".wrong");

let wrongMsgCount = 0;

btn.addEventListener("click", () => {
  if (input.value.toLowerCase() === secretWord) {
    window.location.href = 'menu.html';
  } else {
    wrongMsg.style.visibility = "visible";

    if (wrongMsgCount === 0) {
      wrongMsg.innerText = "wrong 😿";
      wrongMsgCount++;
    } else if (wrongMsgCount === 1) {
      wrongMsg.innerText = "wrong 😞";
      wrongMsgCount++;
    } else if (wrongMsgCount === 2) {
      wrongMsg.innerText = "wrong 🥲";
      wrongMsgCount = 0;
    }
  }
});