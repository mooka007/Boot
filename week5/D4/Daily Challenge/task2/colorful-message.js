const chalk = require('chalk');

function displayColorfulMessage() {
  console.log(chalk.blue.bold('This is an important message!'));
  console.log(chalk.green.italic('Successfully completed the task'));
  console.log(chalk.red.bgWhite('Warning: Proceed with caution'));
}

module.exports = displayColorfulMessage;