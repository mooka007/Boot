const { format, addDays } = require('date-fns');

function getFormattedDate() {
  const today = new Date();
  const futureDate = addDays(today, 5);
  return format(futureDate, 'MMMM do, yyyy h:mm:ss a');
}

module.exports = getFormattedDate;