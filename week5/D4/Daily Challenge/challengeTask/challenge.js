const greet = require('../task1/greeting');
const displayMessage = require('../task2/colorful-message');
const displayContent = require('../task3/read-file');

console.log(greet('Challenge Participant'));

console.log('\nDisplaying colorful messages:');
displayMessage();

console.log('\nReading file content:');
displayContent();