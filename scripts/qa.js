const qAContainer = document.getElementById("q-a-container");
const choices = document.getElementById("choices");
const question = document.getElementById("question");
const img = document.getElementById('gif-img');

const questions = [
  {
    question: "What is my favorite outfit color?",
    choices: ["Red", "Black", "Green"],
    answer: 1,
  },
  {
    question: "What is my favorite food?",
    choices: ["Caldereta", "Menudo", "Afritada"],
    answer: 0,
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

const gifs = [
  'assets/images/gif-wrong1.gif',
  'assets/images/gif-wrong2.gif',
  'assets/images/gif-wrong3.gif',
  'assets/images/gif-wrong4.gif',
  'assets/images/gif-wrong5.gif',
  'assets/images/gif-correct1.gif',
  'assets/images/gif-correct2.gif',
  'assets/images/gif-correct3.gif',
  'assets/images/gif-correct4.gif',
  'assets/images/gif-correct5.gif'
];

gifs.forEach(gif => {
  const preloadImg = new Image();
  preloadImg.src = gif;
  preloadImg.alt = 'wrong';
});

let currentIndex = 0;
let wrongEmojiIndex = 0;
let correctIndex = 0;

function loadQuestions() {
  if (currentIndex >= questions.length) {
    window.location.href = "guess-it.html";
    return;
  }

  img.src = '';

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
    img.classList.add('correct-gif');

    if (currentIndex === 1) {
      img.src = 'assets/images/gif-correct1.gif';
    } else if (currentIndex === 2) {
      img.src = 'assets/images/gif-correct2.gif';
    } else if (currentIndex === 3) {
      img.src = 'assets/images/gif-correct3.gif';
    } else if (currentIndex === 4) {
      img.src = 'assets/images/gif-correct4.gif';
    } else if (currentIndex === 5) {
      img.src = 'assets/images/gif-correct5.gif';
    }

    document
      .querySelectorAll("#q-a-container button")
      .forEach((button) => button.remove());
    document.querySelector("#q-a-container #question").innerHTML = "";

    setTimeout(() => {
      loadQuestions();
    }, 1500);
  } else {
    img.classList.remove('correct-gif');
    if (wrongEmojiIndex === 0) {
      img.src = 'assets/images/gif-wrong1.gif';
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 1) {
      img.src = 'assets/images/gif-wrong2.gif';
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 2) {
      img.src = 'assets/images/gif-wrong3.gif';
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 3) {
      img.src = 'assets/images/gif-wrong4.gif';
      wrongEmojiIndex++;
    }  else if (wrongEmojiIndex === 4) {
      img.src = 'assets/images/gif-wrong5.gif';
      wrongEmojiIndex = 0;
    }
  }
}

loadQuestions();