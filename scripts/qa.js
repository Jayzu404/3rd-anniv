const qaContainer = document.getElementById('q-a-container');
const question = document.getElementById('question');
const wrong = document.getElementById('wrong');
const correct = document.getElementById('correct');

const questions = [
  {
    question: 'What is my favorite outfit color?',
    choices: ['Red', 'Black', 'Green'],
    answer: 1
  },
  {
    question: 'What is my favorite food?',
    choices: ['Pizza', 'Spicy Fried Chicken', 'Burger'],
    answer: 1
  },
  {
    question: 'What is my favorite movie genre?',
    choices: ['Action', 'Comedy', 'Sci-Fi'],
    answer: 2
  },
  {
    question: 'When was the exact date when we are officially together?',
    choices: ['January 20 2022', 'February 20 2023', 'March 20 2024'],
    answer: 1
  }
];

let currentIndex = 0;
let wrongEmojiIndex = 0;

function loadQuestions(){
  if (currentIndex >= questions.length) {
    document.body.innerHTML = `
      <div class="completion-btn">
        <button id="timeline-btn">Timeline &rarr;</button>
      </div>
    `;
    document.getElementById('timeline-btn').addEventListener('click', () => {
      window.location.href = 'timeline.html';
    });
    return;
  }

  question.innerText = questions[currentIndex].question;

  questions[currentIndex].choices.forEach((choice) => {
    let button = document.createElement('button');
    button.innerText = choice;

    button.addEventListener('click', () => checkAnswer(choice, questions[currentIndex].answer));

    qaContainer.appendChild(button);
  });
}

function checkAnswer(selected, answerIndex){
  if (selected === questions[currentIndex].choices[answerIndex]) {
    currentIndex++;
    
    wrong.style.visibility = 'hidden';
    correct.style.visibility = 'visible';

    correct.innerText = 'correct 😊';
    document.querySelectorAll('#q-a-container button').forEach(button => button.remove());
    
    setTimeout(() => {
      correct.style.visibility = 'hidden';
      loadQuestions();
    }, 1000);
  } else {
    wrong.style.visibility = 'visible';
    correct.style.visibility = 'hidden';

    if (wrongEmojiIndex === 0) {
      wrong.innerText = 'wrong 😿';
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 1) {
      wrong.innerText = 'wrong 😞';
      wrongEmojiIndex++;
    } else if (wrongEmojiIndex === 2) {
      wrong.innerText = 'wrong 🥲';
      wrongEmojiIndex = 0;
    }
  }
}

loadQuestions();