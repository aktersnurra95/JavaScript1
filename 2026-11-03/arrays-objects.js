let people = [
  {
    firstName: 'Gustav',
    lastName: 'Sulingga',
    age: 30,
    address: {
      street: 'Störtloppsvägen',
      streetNum: '30',
      zipCode: '129 47',
      town: 'Hägersten'
    }
  },
  {
    firstName: 'Lena',
    lastName: 'Karlsson',
    age: 26,
    address: {
      street: 'Störtloppsvägen',
      streetNum: '30',
      zipCode: '129 47',
      town: 'Hägersten'
    }
  },
  {
    firstName: 'Blueberry',
    lastName: '',
    age: 6,
    address: {
      street: 'Störtloppsvägen',
      streetNum: '30',
      zipCode: '129 47',
      town: 'Hägersten'
    }
  }
];

let html = '';

for (let person of people) {
  html += `
  <section class="person">
    <h3>${person.firstName} ${person.lastName} (${person.age})</h3>
    <p>${person.address.street} ${person.address.streetNum}<br>${person.address.zipCode} ${person.address.town}</p>
  `;
}

document.querySelector('body').innerHTML = html;