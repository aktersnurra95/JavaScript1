const response = await fetch('questions.json');
const questions = await response.json();

console.log('fetched questions', questions);

const div = { 'question': document.querySelector('.question'), 'options': document.querySelector('.options') };
const form = createForm();

let currentQuestion;
let currentQuestionIndex = -1;
let correctAnswers = 0;
let allAnswers = []; //history of all answers

nextQuestion();

function printQuestion() {
  console.log('fråga', currentQuestion.id);

  div.question.innerHTML = `
  <h3>Fråga ${currentQuestion.id} av ${questions.length}</h3>
  <p><b>${currentQuestion.text}</b></p>
  `;
}

//ADD ATTRIBUTE NAME TO FORM AND GET FORM VIA FORM[NAME="NAME"]

function createForm() {
  const form = document.createElement('form');
  div.options.append(form);
  form.addEventListener('submit', checkAnswer);
  return form;
}

function printOptions() {
  switch (currentQuestion.type) {
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
      let html = `<input type="range" name="option" list="values" min="${currentQuestion.min}" max="${currentQuestion.max}" />`;
      html += `<datalist id="values">`;
      for (let i = currentQuestion.min; i <= currentQuestion.max; i++) {
        html += `<option value="${i}" label="${i}"></option>`;
      }
      html += `</datalist>`;
      form.innerHTML = html;
      break;
    default:
      form.innerHTML = '';
  }
  form.innerHTML += `<input type="submit" class="submit" />`;
}

function createMultipleOptions(inputType) {
  let html = '';
  let i = 0;
  for (const option of currentQuestion.options) {
    html += `<label><input type="${inputType}" name="option" value="${i}" />${option}</label><br>`;
    i++;
  }
  return html;
}

//check answer and print next question
function checkAnswer(event) {
  event.preventDefault();
  const answers = currentQuestion.answer;

  console.log('answers', answers);


  for (let { type, name, value, checked } of form.elements) {
    if (type === 'submit' || ((type === 'radio' || type === 'checkbox') && !checked)) continue;
    console.log('input:', type, name, value, checked);

    //do something for each answer
    switch (type) {
      case 'radio':
        allAnswers[currentQuestionIndex] = [isCorrect(value == answers), value];
        break;
      case 'checkbox':
        if (typeof allAnswers[currentQuestionIndex] === 'undefined') {
          allAnswers[currentQuestionIndex] = [];
        }

        console.log('answers.includes(value)', answers.includes(value), 'value', value);

        if (answers.includes(Number(value))) {
          isCorrect();
          allAnswers[currentQuestionIndex][value] = true;
        } else {
          allAnswers[currentQuestionIndex][value] = false;
        }
        break;
      case 'text':
        allAnswers[currentQuestionIndex] = [isCorrect(value.toString().toLowerCase().trim() == answers), value];
        break;
      case 'range':
        allAnswers[currentQuestionIndex] = true;
        break;
      default:
        console.log('not a defined type');
    }
  }

  /* old solution
  const formData = new FormData(event.target);
  const answer = formData.getAll('option');
  console.log('raw answer', answer);
 
  allAnswers.push(answer);
 
  switch (currentQuestion.type) {
    case 'multiple':
      correctAnswer(answer.toString(), currentQuestion.answer.toString());
      break;
    case 'text':
      correctAnswer(answer.toString().toLowerCase().trim(), currentQuestion.answer);
      break;
    case 'single':
    case 'boolean':
      correctAnswer(answer, currentQuestion.answer);
      break;
    case 'scale':
      break;
    default:
      console.log('not a defined type');
 
  }
  */
  nextQuestion();
}

function isCorrect(correct = true) {
  if (correct) {
    console.log('Rätt svar!');
    correctAnswers++;
  } else if (false) {
    //check multi option answer 
  } else {
    console.log('Fel svar!');
  }
  return correct;
}

//if not last question, increment currentQuestion and run printQuestion
function nextQuestion() {
  if (currentQuestionIndex >= questions.length - 1) {
    console.log('last question');
    printScore();
    return;
  }

  currentQuestionIndex++;
  currentQuestion = questions[currentQuestionIndex];
  printQuestion();
  printOptions();
}

function printScore() {
  if (correctAnswers == 0) {
    div.question.textContent = 'Du fick alla fel! :(';
  } else if (correctAnswers == questions.length) {
    div.question.textContent = 'Du fick alla rätt! (' + correctAnswers + ')';
  } else {
    div.question.textContent = 'Antal rätt: ' + correctAnswers;
  }

  console.log('all answers', allAnswers);

  /*
  write out all questions and answers with a loop
  for each question: mark the correct answer as green,
  mark a correct answer wholy green and a wrong answer as red.
  */

  div.options.innerHTML = '';
  let i = 0;
  for (let { id, type, text, options, answer } of questions) {
    const questionAnswer = document.createElement('div');
    div.options.append(questionAnswer);

    let html = `<p>${id}: ${text}</p>`;

    switch (type) {
      case 'single': {
        if (allAnswers[i]?.[0]) {
          questionAnswer.classList.add('green');
        }
        let j = 0;
        for (let option of options) {
          let color = '';
          if (j == answer && j == allAnswers[i]?.[1]) {
            color = 'green select';
          } else if (j == answer && !allAnswers[i]?.[0]) {
            color = 'green';
          }
          else if (j == allAnswers[i]?.[1]) {
            color = 'red select';
          }
          html += `<p class="option ${color}">${option}</p>`;

          j++;
        }
      } break;
      case 'multiple': {
        let j = 0;
        for (let option of options) {
          let color = '';
          if (allAnswers[i]?.[j]) {
            color = 'green select';
          } else if (allAnswers[i]?.[j] == false) {
            color = 'red select';
          } else if (answer.includes(j)) {
            color = 'green';
          }
          html += `<p class="option ${color}">${option}</p>`;

          j++;
        }
      } break;
      case 'text':
        html += `<p class="text">Rätt svar: ${answer}</p><p class="text">Du svarade: ${allAnswers[i][1].trim()}</p>`;
        if (allAnswers[i][0]) {
          questionAnswer.classList.add('green');
        }
        break;
      case 'boolean':
        html += `<p class="text">Du svarade: ${allAnswers[i][1] == true}</p>`;
        if (allAnswers[i][0]) {
          questionAnswer.classList.add('green');
        }
      default:
    }

    questionAnswer.innerHTML = html;

    i++;
  }
}