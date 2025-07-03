
const prompt = require("prompt-sync")();

let num = parseInt(prompt("Enter a number: "));

while (num < 10) {
    num = parseInt(prompt("Enter a new number (must be > 10): "));
}

console.log("Final number:", num);