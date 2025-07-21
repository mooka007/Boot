const holidays = [
  { name: "New Year's Day", date: new Date(new Date().getFullYear() + 1, 0, 1) },
  { name: "Valentine's Day", date: new Date(new Date().getFullYear(), 1, 14) },
];

function timeUntilNextHoliday() {
  const now = new Date();
  let nextHoliday = null;
  let minDiff = Infinity;

  holidays.forEach(holiday => {
    const diff = holiday.date - now;
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nextHoliday = holiday;
    }
  });

  if (!nextHoliday) {
    return "No upcoming holidays found";
  }

  const days = Math.floor(minDiff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((minDiff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((minDiff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((minDiff % (1000 * 60)) / 1000);

  return {
    today: now.toDateString(),
    message: `The next holiday (${nextHoliday.name}) is in ${days} days and ${hours}:${minutes}:${seconds} hours`
  };
}

module.exports = timeUntilNextHoliday;