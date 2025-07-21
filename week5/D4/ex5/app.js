const _ = require('lodash');
const { add, multiply } = require('./math');

const numbers = [1, 2, 3, 4];
const sum = _.sum(numbers);
const product = multiply(5, 6);

console.log(`Sum: ${sum}, Product: ${product}`);