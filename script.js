// Define the quiz data
const quiz = [
  {
    question: "What is the capital of France?",
    options: ["Paris", "London", "Berlin", "Rome"],
    answer: 0
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Mercury"],
    answer: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
    answer: 2
  }
  // Add more questions and answers here
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextButton");

function displayQuestion() {
  const currentQuiz = quiz[currentQuestion];

  questionElement.textContent = currentQuiz.question;
  optionsElement.innerHTML = "";

  // Display answer options
  for (let i = 0; i < currentQuiz.options.length; i++) {
    const option = document.createElement("button");
    option.textContent = currentQuiz.options[i];
    option.addEventListener("click", selectAnswer);
    optionsElement.appendChild(option);
  }
}

function selectAnswer(event) {
  const selectedOption = event.target;

  // Remove selected class from other options
  const options = optionsElement.getElementsByTagName("button");
  for (let i = 0; i < options.length; i++) {
    options[i].classList.remove("selected");
  }

  selectedOption.classList.add("selected");
}

function showResult() {
  questionElement.innerHTML = "";
  optionsElement.innerHTML = "";

  const resultElement = document.createElement("div");
  resultElement.classList.add("result");

  const resultMessage = document.createElement("p");
  resultMessage.classList.add("result-message");
  resultMessage.textContent = "You scored";

  const resultScore = document.createElement("p");
  resultScore.classList.add("result-score");
  resultScore.textContent = `${score} out of ${quiz.length} questions!`;

  resultElement.appendChild(resultMessage);
  resultElement.appendChild(resultScore);

  // Append the result element to the options container
  optionsElement.appendChild(resultElement);

  nextButton.style.display = "none";
}

function checkAnswer() {
  const selectedOption = optionsElement.querySelector("button.selected");

  if (selectedOption) {
    const selectedIndex = Array.from(optionsElement.children).indexOf(selectedOption);
    if (selectedIndex === quiz[currentQuestion].answer) {
      score++;
    }
    currentQuestion++;
    if (currentQuestion < quiz.length) {
      displayQuestion();
    } else {
      showResult();
    }
  }
}

displayQuestion();

nextButton.addEventListener("click", () => {
  checkAnswer();
});
