
const prompt = require("prompt-sync")();


// let input = parseInt(prompt("Veulliez entrer un nombre :"));
// //Verification du type
console.log("Type avant conversin ", typeof input);
// Convertir en nombre :
let number = Number(input);

//verification si la conversion est reussie :
if (!isNaN(input)) {
  console.log("Merci ! vous entre le nombre :", input);
  console.log("Type après conversion :", typeof input); // "number"
} else {
  console.log("Ce que vous avez entré n'est pas un nombre valide.");
}

let num = parseInt(prompt("Enter a number: "));

while (num < 10) {
    num = parseInt(prompt("Enter a new number (must be > 10): "));
}

console.log("Final number:", num);