const questions = [
  {
    topic: "science",
    question: "How many laws are there in Kepler''s planetary motion?",
    possibleAnswers: ["7", "5", "1","3"],
    correctAnswer: "3",
  },
  {
    topic: "tech",
    question: "What is the best language to learn?",
    possibleAnswers: ["javascript", "python", "ruby"],
    correctAnswer: "javascript",
  },
  {
    topic: "math",
    question: "What is 4 + 4?",
    possibleAnswers: ["5", "7", "8", "10"],
    correctAnswer: "8",
  },
  {
    topic: "science",
    question: "Which of the following technological developments came first?",
    possibleAnswers: ["telegraph", "telescope", "telephone", "teletype"],
    correctAnswer: "telescope",
  },
];

const quizProgress = document.getElementById("quizProgress");
const questionContainer = document.getElementById("questionContainer");
const answerContainer = document.getElementById("answerContainer");

let currentQuestionIndex = 0;
let correctAnswers = 0;
let wrongAnswers = 0;

// Sonuç kutusunu oluştur
const resultBox = document.createElement("div");
resultBox.id = "resultBox";
resultBox.style.display = "none";
resultBox.style.borderRadius = '5px';
resultBox.style.border = "2px solid #ffff";
resultBox.style.padding = "50px";
resultBox.style.color = 'white'
resultBox.style.marginTop = "20px";
resultBox.style.textAlign = "center";
document.body.appendChild(resultBox);

function handleQuestion(index) {
  if (index === questions.length) {
    showResults();
    return;
  }

  quizProgress.innerHTML = "";
  questions.forEach(() => {
    quizProgress.innerHTML += "<span></span>";
  });

  let spans = document.querySelectorAll("span");
  for (let i = 0; i <= index; i++) {
    spans[i].classList.add("seen");
  }

  questionContainer.innerHTML = `
    <p>${questions[index].topic}</p>
    <p>${questions[index].question}</p>
  `;

  answerContainer.innerHTML = "";
  questions[index].possibleAnswers.forEach((answer) => {
    let button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", (e) => checkAnswer(e, index));
    answerContainer.appendChild(button);
  });
}

function checkAnswer(e, index) {
  if (e.target.textContent === questions[index].correctAnswer) {
    correctAnswers++;
  } else {
    wrongAnswers++;
  }

  currentQuestionIndex++;
  handleQuestion(currentQuestionIndex);
}

// Sonuç kutusunu göster
function showResults() {
  questionContainer.innerHTML = "";
  answerContainer.innerHTML = "";
  quizProgress.innerHTML = "";

  resultBox.innerHTML = `
    <h3>Quiz Completed!</h3>
    <p>✅ Correct Answers: ${correctAnswers}</p>
    <p>❌ Wrong Answers: ${wrongAnswers}</p>
    <button id="restartButton">Restart Quiz</button>
  `;
  resultBox.style.display = "block";

  document.getElementById("restartButton").addEventListener("click", restartGame);
}

// Oyunu yeniden başlat
function restartGame() {
  correctAnswers = 0;
  wrongAnswers = 0;
  currentQuestionIndex = 0;
  resultBox.style.display = "none";
  handleQuestion(currentQuestionIndex);
}

handleQuestion(currentQuestionIndex);
