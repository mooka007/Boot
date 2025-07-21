const prompt = require('prompt-sync')();

function validateName(name) {
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  return regex.test(name);
}

const fullName = prompt('Enter your full name (e.g. "John Doe"): ');
console.log('Name is valid:', validateName(fullName));