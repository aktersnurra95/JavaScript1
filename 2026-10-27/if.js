let prompt = require("prompt-sync")();

let minAge = 15;
let discountAge = 65;

let age = prompt("input age: ");

console.log(age);

if (age >= discountAge) {
  console.log("You are old enough to buy energy drinks and get a small discount.");
}
else if (age >= minAge) {
  console.log("You are old enough to buy energy drinks.");
} else if (age < minAge) {
  console.log("You have to be 15 or older to buy energy drinks, come back in " + (minAge - age) + " years.");
} else {
  console.warn("Please input your age as a numerical value");
}

console.log("end of code");
