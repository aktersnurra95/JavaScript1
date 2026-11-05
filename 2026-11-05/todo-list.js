const sleep = ms => new Promise(res => setTimeout(res, ms));

let todoList = ['Eat', 'Sleep', 'Work'];

renderList();

function renderList() {
  let html = '';
  for (let todo of todoList) {
    html += `<div>${todo}</div>`;
  }
  document.querySelector('.todo-list').innerHTML = html;
}

document.querySelector('#add-first').addEventListener('click', () => {
  let todo = prompt('What do you want to add last in the list?');

  if (todo) {
    todoList.unshift(todo);
    renderList();
  }
});

document.querySelector('#add-last').addEventListener('click', () => {
  let todo = prompt('What do you want to add last in the list?');

  if (todo) {
    todoList.push(todo);
    renderList();
  }
});

document.querySelector('#remove-first').addEventListener('click', async () => {
  let removed = todoList.pop();
  renderList();
  await sleep();
  alert(`Removed ${removed} from the front of the list`);
});

document.querySelector('#remove-last').addEventListener('click', async () => {
  let removed = todoList.shift();
  renderList();
  await sleep();
  alert(`Removed ${removed} from the end of the list`);
});