const response = await fetch('questions.json');
const questions = await response.json();

const quizElement = document.querySelector(".quiz");
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');

console.log('questions', questions);

let currentQuestion = -1;
let correctAnswers = 0;
let allAnswers = [];

nextQuestion();

function printQuestion() {
  console.log('fråga', questions[currentQuestion].id);

  questionElement.innerHTML = `
  <h3>Fråga ${questions[currentQuestion].id} av ${questions.length}</h3>
  <p><b>${questions[currentQuestion].text}</b></p>
  `;
}

function printOptions() {
  const form = document.createElement('form');
  switch (questions[currentQuestion].type) {
    case 'single':
      form.innerHTML = createMultipleOptions('radio');
      break;
    case 'multiple':
      form.innerHTML = createMultipleOptions('checkbox');
      break;
    case 'text':
      form.innerHTML = `<label><input type="text" name="option" /></label>`;
      break;
    case 'boolean':
      form.innerHTML = `<label><input type="radio" name="option" value="1" />Sant</label><br>
      <label><input type="radio" name="option" value="0" />Falskt</label><br>`;
      break;
    case 'scale':
      break;
    default:
  }
  form.innerHTML += `<input type="submit" class="submit" />`;
  optionsElement.innerHTML = '';
  optionsElement.append(form);

  form.addEventListener('submit', checkAnswer);
}

function createMultipleOptions(inputType) {
  let html = '';
  let i = 0;
  for (const option of questions[currentQuestion].options) {
    html += `<label><input type="${inputType}" name="option" value="${i}" />${option}</label><br>`;
    i++;
  }
  return html;
}

//check answer and print next question
function checkAnswer(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const answer = formData.getAll('option');
  console.log('raw answer', answer);

  allAnswers.push(answer);

  switch (questions[currentQuestion].type) {
    case 'multiple':
      correctAnswer(answer.toString(), questions[currentQuestion].answer.toString());
      break;
    case 'text':
      correctAnswer(answer.toString().toLowerCase().trim(), questions[currentQuestion].answer);
      break;
    case 'single':
    case 'boolean':
      correctAnswer(answer, questions[currentQuestion].answer);
      break;
    case 'scale':
      break;
    default:
      console.log('not a defined type');

  }

  nextQuestion();
}

function correctAnswer(answer, correctAnswer) {
  if (answer == correctAnswer) {
    console.log('Rätt svar!');
    correctAnswers++;
  } else if (false) {
    //check multi option answer 
  } else {
    console.log('Fel svar!');
  }
}

//if not last question, increment currentQuestion and run printQuestion
function nextQuestion() {
  if (currentQuestion >= questions.length - 1) {
    console.log('last question');
    printScore();
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

  console.log('all answers', allAnswers);

}