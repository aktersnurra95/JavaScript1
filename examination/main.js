const response = await fetch('questions.json');
const questions = await response.json();

const quizDiv = document.querySelector(".quiz");
const questionDiv = document.querySelector('.question');
const optionsDiv = document.querySelector('.options');
const controlsDiv = document.querySelector('.controls');
const submitButton = document.querySelector('.submit');

console.log('questions', questions);

let currentQuestion = -1;
let correctAnswers = 0;

//printQuestion(currentQuestion);
//printOptions(currentQuestion);
//printScore();

nextQuestion();

submitButton.addEventListener('click', checkAnswer);

function printQuestion() {
  console.log('fråga', questions[currentQuestion].id);

  questionDiv.innerHTML = `
  <h3>Fråga ${questions[currentQuestion].id} av ${questions.length}</h3>
  <p><b>${questions[currentQuestion].text}</b></p>
  `;
}

function printOptions() {
  switch (questions[currentQuestion].type) {
    case 'single':
      optionsDiv.innerHTML = createMultipleOptions('radio');
      break;
    case 'multiple':
      optionsDiv.innerHTML = createMultipleOptions('checkbox');
      break;
    case 'text':
      optionsDiv.innerHTML = `<label><input type="text" name="option" /></label>`;
      break;
    case 'boolean':
      break;
    case 'scale':
      break;
    default:
  }
}

function createMultipleOptions(inputType) {
  let html = '';
  let i = 0;
  for (const option of questions[currentQuestion].options) {
    html += `<label><input type="${inputType}" name="option" value="${i}" />${option}</label>`;
    i++;
  }
  return html;
}

//check answer and print next question
function checkAnswer(answer = 0) {
  if (answer == questions[currentQuestion].answer) {
    console.log('Rätt svar!');
    correctAnswers++;
  } else {
    console.log('Fel svar!');
  }
  nextQuestion();
}

//if not last question, increment currentQuestion and run printQuestion
function nextQuestion() {
  if (currentQuestion >= questions.length - 1) {
    console.log('last question');
    return;
  }

  currentQuestion++;
  printQuestion();
  printOptions();
}

function printScore() {
  if (correctAnswers == 0) {
    console.log('Du fick alla fel! :(');
  } else if (correctAnswers == questions.length) {
    console.log('Du fick alla rätt! (' + correctAnswers + ')');
  } else {
    console.log('Antal rätt:', correctAnswers);
  }
}