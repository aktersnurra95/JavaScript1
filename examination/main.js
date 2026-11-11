const response = await fetch('questions.json');
const questions = await response.json();

const quizElement = document.querySelector(".quiz");
const questionElement = document.querySelector('.question');
const optionsElement = document.querySelector('.options');

console.log('questions', questions);

let currentQuestion = -1;
let correctAnswers = 0;

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
    html += `<label><input type="${inputType}" name="option" value="${i}" />${option}</label>`;
    i++;
  }
  return html;
}

//check answer and print next question
function checkAnswer(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const answer = formData.get('option');

  console.log('answer', answer);

  if (answer == questions[currentQuestion].answer) {
    console.log('Rätt svar!');
    correctAnswers++;
  } else if (false) {
    //check multi option answer 
  } else {
    console.log('Fel svar!');
  }
  nextQuestion();

  //MAYBE USE SWITCH CASE ON TYPE TO CHECK FOR DIFFERENT INPUT ANSWER

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