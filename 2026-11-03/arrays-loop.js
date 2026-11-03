//prefer to name arrays as plural
let names = ['Alex', 'Ben', 'Cheryl', 'Dave'];

console.log('names', names);
console.log('length of names', names.length);
console.log('first element of names', names[0]);
console.log('last element of names', names[names.length - 1]);

for (let i = 0; i < names.length; i++) {
  console.log(i, names[i]);
}

//for of loop
//use singular of your array name as the for of loop variable
for (let name of names) {
  console.log(name);
}