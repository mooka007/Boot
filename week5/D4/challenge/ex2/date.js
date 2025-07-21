function minutesLived(birthdate) {
  const birthDate = new Date(birthdate);
  const now = new Date();
  const diff = now - birthDate;
  return Math.floor(diff / (1000 * 60));
}

const minutes = minutesLived('1990-05-15');
console.log(`You've lived approximately ${minutes} minutes.`);

module.exports = minutesLived;