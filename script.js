var prompt = require('prompt-sync')();
const age = prompt("Enter your age: ")
if (age < 18) {
  console.log("Not eligible");
} else {
  console.log("Yes, Eligible");
}

// using prompt-sync you can take user input







