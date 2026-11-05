console.log('script start');

const response = await fetch('questions.json');
const questions = await response.json();
const quizArticle = document.querySelector(".quiz");

console.log('questions', questions);

let currentQuestion = 0;
let correctAnswers = 0;

printQuestion(currentQuestion);
showAnswerDialog(currentQuestion);
printScore();

console.log('script end');

function printQuestion(questionIndex) {
  console.log('Fråga', questions[questionIndex].id);

  let html = `
  <h3>Fråga ${questions[questionIndex].id} av ${questions.length}</h3>
  <p><b>${questions[questionIndex].text}</b></p>
  `;

  let i = 1;
  for (const option of questions[questionIndex].options) {
    html += `<p>${i}: ${option}</p>`;
    i++;
  }

  quizArticle.innerHTML = html;
}

//shows a prompt dialog where user has to enter the answer index
function showAnswerDialog(questionIndex, precedingMessage = '') {
  let answer = prompt(precedingMessage + 'Svar: (1-' + questions[questionIndex].options.length + ')');

  checkAnswer(questionIndex, answer);
}

//check answer and print next question
function checkAnswer(questionIndex, answer) {
  if (answer == questions[questionIndex].answer + 1) {
    console.log('Rätt svar!');

    correctAnswers++;
    nextQuestion();
  } else if (answer === null) {
    //break out of function if user press cancel
    console.warn('cancelled');
    return;
  } else if (answer < 1 || answer > questions[questionIndex].options.length || isNaN(answer)) {
    //show dialog again if answer is not one of the options or NaN
    showAnswerDialog(questionIndex, 'Ogiltigt svar! \n');
  } else {
    console.log('Fel svar!');
    //show dialog again if wrong answer  showAnswerDialog(questionIndex, 'Fel svar! \n');
    nextQuestion();
  }
}

//if not last question, increment currentQuestion and run printQuestion
function nextQuestion() {
  if (currentQuestion < questions.length - 1) {
    currentQuestion++;
    printQuestion(currentQuestion);
    showAnswerDialog(currentQuestion);
  } else {
    console.log('last question');
  }
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