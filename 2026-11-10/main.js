const people = [
  { firstName: "Penelope", lastName: "Carnoghan", age: 93, color: "Red" },
  { firstName: "Seline", lastName: "Otridge", age: 18, color: "Maroon" },
  { firstName: "Michaela", lastName: "Truitt", age: 89, color: "Orange" },
  { firstName: "Anne", lastName: "Fosbraey", age: 76, color: "Maroon" },
  { firstName: "Marylin", lastName: "Polson", age: 24, color: "Crimson" },
  { firstName: "Matias", lastName: "Bielfelt", age: 44, color: "Teal" },
  { firstName: "Inez", lastName: "Duchatel", age: 59, color: "Teal" },
  { firstName: "Henka", lastName: "Greally", age: 19, color: "Green" },
  { firstName: "Crista", lastName: "Diggens", age: 33, color: "Fuchsia" },
  { firstName: "Sarena", lastName: "Bayfield", age: 98, color: "Green" }
];

renderPeople();

function renderPeople() {
  const main = document.querySelector('main');

  for (const person of people) {
    console.log(person);

    const div = document.createElement('div');
    div.classList.add('person');

    const nameElement = document.createElement('p');
    nameElement.classList.add('name');
    nameElement.textContent = person.firstName + ' ' + person.lastName;
    nameElement.style.color = person.color;

    const ageElement = document.createElement('p');
    ageElement.classList.add('age');
    ageElement.textContent = person.age + ' years';

    div.append(nameElement, ageElement);

    main.append(div);
  }
}