const timeUntilHoliday = require('./date');
const result = timeUntilHoliday();
console.log(`Today is ${result.today}`);
console.log(result.message);