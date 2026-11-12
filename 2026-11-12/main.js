import { addEvent, removeEvent } from "./eventHandler.js";

document.body.addEventListener('click', event => {
  console.log('clicked on', event.target);

  if (event.target.closest('p')) {
    //check if user clicked on a P element
  }
});

addEvent('click', 'h2', (event) => {
  event.target.classList.add('green');
  removeEvent(addClassGreen);
});

addEvent('click', 'h3', addClassGreen);



function addClassGreen(event) {
  event.target.classList.add('green');
}