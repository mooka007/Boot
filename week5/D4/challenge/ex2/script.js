const minutesLived = require('./date');

const prompt = require('prompt-sync')();
const birthdate = prompt('Enter your birthdate (YYYY-MM-DD): ');
console.log(`You've lived approximately ${minutesLived(birthdate)} minutes.`);