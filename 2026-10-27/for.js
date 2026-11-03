let prompt = require("prompt-sync")();

let maxValue = prompt("input what value to count to: ");

for (let i = 1; i <= maxValue; i++) {
  console.log(i);
}

console.log("end of code");