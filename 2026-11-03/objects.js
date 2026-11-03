let person = {
  firstName: 'Gustav',
  lastName: 'Sulingga',
  age: 30
};

console.log('person', person);

console.log('name', person.firstName + ' ' + person.lastName);
console.log('age', person.age);

let address = {
  street: 'Störtloppsvägen',
  streetNum: '30',
  zipCode: '129 47',
  town: 'Hägersten'
};

let personalData = {
  firstName: 'Gustav',
  lastName: 'Sulingga',
  age: 30,
  address: {
    street: 'Störtloppsvägen',
    streetNum: '30',
    zipCode: '129 47',
    town: 'Hägersten'
  }
};

console.log('personalData', personalData);
console.log('street', personalData.address.street);
