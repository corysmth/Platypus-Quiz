let score = 0;
let currentQuestionIndex = 0;

// Define Initial Arrays
// const quiz = [
const questions = [
  {
    question: "What type of animal is a platypus?",
    answers: [
      { text: "Bird", correct: false },
      { text: "Mammal", correct: true },
      { text: "Reptile", correct: false },
      { text: "Amphibian", correct: false }
    ]
  },
  {
    question:
      "Which of the following is an accepted plural alternative for platypuses?",
    answers: [
      { text: "Platypoose", correct: false },
      { text: "Platypigs", correct: false },
      { text: "Platypi", correct: true },
      { text: "Platypodiatrists", correct: false }
    ]
  },
  {
    question: "What 'sixth sense' do platypuses have?",
    answers: [
      { text: "Telepathy", correct: false },
      { text: "Electroreception", correct: true },
      { text: "Empathy", correct: false },
      { text: "Night Vision", correct: false }
    ]
  },
  {
    question:
      "How may years have platypuses been known to live up to in the wild?",
    answers: [
      { text: "12", correct: true },
      { text: "15", correct: false },
      { text: "25", correct: false },
      { text: "50", correct: false }
    ]
  },
  {
    question: "Which of the following would platypuses eat?",
    answers: [
      { text: "Acorns & Nuts", correct: false },
      { text: "Fish & Chips", correct: false },
      { text: "Grass & Berries", correct: false },
      { text: "Shrimp & Beetles", correct: true }
    ]
  },
  {
    question: "Where do male platypuses have venomous spurs?",
    answers: [
      { text: "Ankles", correct: true },
      { text: "Armpits", correct: false },
      { text: "Toes", correct: false },
      { text: "Tails", correct: false }
    ]
  },
  {
    question: "What are baby platypuses called?",
    answers: [
      { text: "Poodles", correct: false },
      { text: "Paddles", correct: false },
      { text: "Puggles", correct: true },
      { text: "Platypups", correct: false }
    ]
  },
  {
    question: "How do platypuses give birth to their young?",
    answers: [
      { text: "Spontaneous Combustion", correct: false },
      { text: "Live Birth", correct: false },
      { text: "Pollination", correct: false },
      { text: "Lay Eggs", correct: true }
    ]
  },
  {
    question: "What unique feature do platypuses share with koalas?",
    answers: [
      { text: "Kind Eyes", correct: false },
      { text: "Bioflourescence", correct: true },
      { text: "Electroreception", correct: false },
      { text: "Night Vision", correct: false }
    ]
  },
  {
    question: "What is a group of platypuses called?",
    answers: [
      { text: "A Paddle", correct: true },
      { text: "A Puddle", correct: false },
      { text: "A Pack", correct: false },
      { text: "A Platter", correct: false }
    ]
  }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const correctAudio = new Audio("correct.mp3");
const incorrectAudio = new Audio("incorrect.mp3");

function startQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  nextButton.innerHTML = "Next";
  showQuestion();
}

function showQuestion() {
  resetState();
  let currentQuestion = questions[currentQuestionIndex];
  // questionNo adds the question # to question text
  let questionNo = currentQuestionIndex + 1;
  questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

  currentQuestion.answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerHTML = answer.text;
    button.classList.add("btn");
    answerButtons.appendChild(button);
    if (answer.correct) {
      button.dataset.correct = answer.correct;
    }
    button.addEventListener("click", selectAnswer);
  });
}

// function to remove previous question answer options
function resetState() {
  nextButton.style.display = "none";
  while (answerButtons.firstChild) {
    answerButtons.removeChild(answerButtons.firstChild);
  }
}

function selectAnswer() {
  const selectedBtn = event.target;
  const isCorrect = selectedBtn.dataset.correct === "true";
  if (isCorrect) {
    selectedBtn.classList.add("correct");
    score++;
    correctAudio.play();
  } else {
    selectedBtn.classList.add("incorrect");
    incorrectAudio.play();
  }
  Array.from(answerButtons.children).forEach((button) => {
    if (button.dataset.correct === "true") {
      button.classList.add("correct");
    }
    button.disabled = true;
  });
  nextButton.style.display = "block";
}

function showScore() {
  resetState();
  if (score < 5) {
    questionElement.innerHTML =
      "You scored " +
      score +
      " out of " +
      questions.length +
      "." +
      "\nToo Bad! Let's try again!";
  } else if (score >= 5 && score <= 8) {
    questionElement.innerHTML =
      "You scored " +
      score +
      " out of " +
      questions.length +
      "." +
      "\nNot bad, but you can do better! Try again!";
  } else {
    questionElement.innerHTML =
      "You scored " +
      score +
      " out of " +
      questions.length +
      "." +
      "\nGreat Job! You're Platytastic!";
  }
  nextButton.innerHTML = "Play Again";
  nextButton.style.display = "block";
}

function handleNextButton() {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    showQuestion();
  } else {
    showScore();
  }
}

nextButton.addEventListener("click", () => {
  if (currentQuestionIndex < questions.length) {
    handleNextButton();
  } else {
    startQuiz();
  }
});

startQuiz();