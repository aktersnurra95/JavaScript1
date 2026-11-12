import { addEvent, removeEvent } from "./eventHandler.js";

const body = document.querySelector('body');

const form = document.createElement('form');
//form.attributes('name', 'formname');
form.innerHTML += `
<label><input type="radio" name="radioNum" value="1">1</label>
<label><input type="radio" name="radioNum" value="2">2</label>
<label><input type="radio" name="radioNum" value="3">3</label>
<label><input type="radio" name="radioNum" value="4">4</label>

<label><input type="checkbox" name="checkboxNum" value="1">1</label>
<label><input type="checkbox" name="checkboxNum" value="2">2</label>
<label><input type="checkbox" name="checkboxNum" value="3">3</label>
<label><input type="checkbox" name="checkboxNum" value="4">4</label>

<input type="submit" class="submit" />`;
body.innerHTML = '';
body.append(form);

addEvent('click', 'form[name="formname"]', doSomething);
form.addEventListener('submit', doSomething);



function doSomething(event) {
  event.preventDefault();
  for (let { type, name, value, checked } of form.elements) {
    if (type === 'submit' || ((type === 'radio' || type === 'checkbox') && !checked)) continue;

    console.log(type, name, value, checked);
  }
}