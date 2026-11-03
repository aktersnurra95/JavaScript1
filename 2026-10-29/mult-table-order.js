const tableAmount = 80;
const tableLength = 15;

//call create selector
createTableSelect(tableAmount);
createOrderSelect();
generateTables(tableLength);

//creates a selector with options 1-12
function createTableSelect(amount) {
  let html = '<label>Choose table: <select class ="table-select">';

  for (let i = 1; i <= amount; i++) {
    html += `<option>${i}</option>`;
  }

  html += '</select></label>';

  document.querySelector('.selector-container').innerHTML = html;

  //grabs the selector and adds an event listener to it
  //on change, run selectTable
  let select = document.querySelector('.table-select');
  select.addEventListener('change', selectTable);
}

function createOrderSelect() {
  let html = '<label>Sorting order: <select class ="order-select"><option>Rising</option><option>Falling</option></select></label>';

  document.querySelector('.order-container').innerHTML = html;

  //grabs the selector and adds an event listener to it
  //on change, run selectOrder
  let select = document.querySelector('.order-select');
  select.addEventListener('change', selectTable);
}

//checks the value of the selects and runs generateTables
// with the grabbed values
function selectTable() {
  let tableSelect = document.querySelector('.table-select');
  let orderSelect = document.querySelector('.order-select');
  generateTables(+tableSelect.value, tableLength, orderSelect.value);
}

//generates a table from the supplied value
function generateTables(length, table = 1, order = "Rising") {
  console.log(order);

  let html = `<h2>The ${table}`;

  let mod10 = table % 10;
  console.log(mod10);
  if (mod10 == 1 && table != 11)
    html += `st`;
  else if (mod10 == 2 && table != 12)
    html += `nd`;
  else if (mod10 == 3 && table != 13)
    html += `rd`;
  else
    html += `th`;

  html += ` multiplication table:</h2>\n<table>`;

  if (order == "Rising") {
    for (let i = 1; i <= length; i++) {
      html += `<tr><td>${table}</td><td>×</td><td>${i}</td><td>=</td><td>${i * table}</td></tr>`;
    }
  } else {
    for (let i = length; i >= 1; i--) {
      html += `<tr><td>${table}</td><td>×</td><td>${i}</td><td>=</td><td>${i * table}</td></tr>`;
    }
  }

  document.querySelector('.table-container').innerHTML = html;
}