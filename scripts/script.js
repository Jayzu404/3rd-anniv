const codeButtons = document.querySelectorAll(".ans-btn");
const delBtn = document.getElementById("del-btn");
const enterBtn = document.getElementById("enter-btn");
const message = document.getElementById("hmmp");
let inputField = document.getElementById("input");

let countEntered = 0;

const correctCode = "022026";

codeButtons.forEach(button => {
  button.addEventListener('click', () => {
    inputField.value += button.textContent;
  });
});

delBtn.addEventListener('click', () => {
  inputField.value = inputField.value.slice(0, -1);
});

enterBtn.addEventListener('click', () => {
  if(correctCode === inputField.value){
    window.location.href = "qa.html";
  } else {
    countEntered++;
  }

  if (countEntered === 1) {
    message.innerHTML = "okay, maybe just a typo 🤔";
  } else if (countEntered === 2) {
    message.innerHTML = "Really? You forgot? <b>Unbelievable! 😑</b>";
  } else if(countEntered === 3) {
    message.innerHTML = "Hint exists for a reason 🙄";
  } else if (countEntered === 4) {
    message.innerHTML = "Wow, okay. This is starting to feel personal. 😤";
  } else if (countEntered === 5) {
    message.innerHTML = "Do I need to send you a calendar invite next year or…? 📅🙄";
  } else if (countEntered > 5) {
    message.innerHTML = "👍";
  }
  
});