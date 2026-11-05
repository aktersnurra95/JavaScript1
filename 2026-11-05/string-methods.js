let str = ' Hello, I am G  ';

str.toLowerCase();
str.toUpperCase();
str.trim();

//true if string contains
str.includes('hello');

//returns location of x in string
str.indexOf('am');
str.lastIndexOf('I');

//can loop though a string
for (let letter of str) {
  console.log(letter);
}

//returns letters from position/index 0 to letter before position 5
//omit end param to return from first index to end of string
//use negative values to count index from end
str.slice(0, 5);

//split a string by any character into an array of each split
//use empty '' param to split at every letter.
str.split(',');