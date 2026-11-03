//call create selector
createTableSelect(30);
generateTables(1);

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

//generates a table from the supplied value
function generateTables(table) {
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

  for (let i = 1; i <= 12; i++) {
    html += `<tr><td>${table}</td><td>×</td><td>${i}</td><td>=</td><td>${i * table}</td></tr>`;
  }

  document.querySelector('.table-container').innerHTML = html;
}

//checks the value of the select and runs generateTables
// with the grabbed value
function selectTable() {
  let select = document.querySelector('.table-select');
  generateTables(+select.value);
}