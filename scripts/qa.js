const qAContainer = document.getElementById("q-a-container");
const choices = document.getElementById("choices");
const question = document.getElementById("question");
const resultMsg = document.getElementById("result-msg");

const questions = [
  {
    question: "What is my favorite outfit color?",
    choices: ["Red", "Black", "Green"],
    answer: 1,
  },
  {
    question: "What is my favorite food?",
    choices: ["Pizza", "Spicy Fried Chicken", "Burger"],
    answer: 1,
  },
  {
    question: "What is my favorite movie genre?",
    choices: ["Action", "Comedy", "Sci-Fi"],
    answer: 2,
  },
  {
    question: "What is my favorite anime?",
    choices: ["Attack on Titan", "Demon Slayer", "My Hero Academia"],
    answer: 0,
  },
  {
    question: "When was the exact date when we are officially together?",
    choices: ["January 20 2022", "February 20 2023", "March 20 2024"],
    answer: 1,
  },
];

let currentIndex = 0;
let wrongEmojiIndex = 0;

function loadQuestions() {
  if (currentIndex >= questions.length) {
    window.location.href = "guess-it.html";
    return;
  }

  question.innerText = questions[currentIndex].question;

  questions[currentIndex].choices.forEach((choice) => {
    let button = document.createElement("button");
    button.innerText = choice;

    button.addEventListener("click", () =>
      checkAnswer(choice, questions[currentIndex].answer),
    );

    choices.appendChild(button);
  });
}

function checkAnswer(selected, answerIndex) {
  if (selected === questions[currentIndex].choices[answerIndex]) {
    currentIndex++;

    resultMsg.classList.remove("wrong");
    resultMsg.classList.add("correct");

    resultMsg.style.visibility = "visible"; // Show the result message

    resultMsg.innerText = "CORRECT 😊";

    document
      .querySelectorAll("#q-a-container button")
      .forEach((button) => button.remove());
    document.querySelector("#q-a-container #question").innerHTML = "";

    setTimeout(() => {
      resultMsg.style.visibility = "hidden";
      resultMsg.innerText = "";

      loadQuestions();
    }, 1000);
  } else {
    resultMsg.classList.remove("correct");
    resultMsg.classList.add("wrong");

    resultMsg.style.visibility = "visible"; // Show the result message

    if (wrongEmojiIndex === 0) {
      resultMsg.innerText = "wrong 😿";
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 1) {
      resultMsg.innerText = "wrong 😞";
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 2) {
      resultMsg.innerText = "wrong 🥲";
      wrongEmojiIndex = 0;
    }
  }
}

loadQuestions();