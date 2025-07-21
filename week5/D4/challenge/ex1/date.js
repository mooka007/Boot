function timeUntilJanuaryFirst() {
  const now = new Date();
  const nextYear = now.getFullYear() + 1;
  const janFirst = new Date(nextYear, 0, 1);
  
  const diff = janFirst - now;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);
  
  return `January 1st is in ${days} days and ${hours}:${minutes}:${seconds} hours`;
}

module.exports = timeUntilJanuaryFirst;