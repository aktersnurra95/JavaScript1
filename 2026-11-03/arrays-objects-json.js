let response = await fetch('people.json');

let people = await response.json();

let html = '';

for (let person of people) {
  html += `
  <section class="person">
    <h3>${person.firstName} ${person.lastName} (${person.age})</h3>
    <p>${person.address.street} ${person.address.streetNum}<br>${person.address.zipCode} ${person.address.town}</p>
  `;
}

document.querySelector('body').innerHTML = html;