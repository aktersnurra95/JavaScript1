//wich mulitplacion table
let table = +prompt('Which table?');
let html = '';

html += '<select>';
for (let i = 1; i <= 12; i++) {
  html += `<option>${i}</option>`;
}
html += '</select>';

for (let i = 1; i <= 12; i++) {
  //string concatenation with +
  //console.log(i + ' × ' + table + ' = ' + (i * table));

  //or with template literals
  html += `<p>${table} × ${i} = ${i * table}</p>\n`;
}

document.querySelector('body').innerHTML = html;
