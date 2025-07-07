// main.js
const prompt = require("prompt-sync")();


function calculateTip() {
  // Get input values
  const billAmount = parseFloat(document.getElementById('billAmt').value);
  const serviceQuality = parseFloat(document.getElementById('serviceQual').value);
  let numberOfPeople = parseInt(document.getElementById('numOfPeople').value);

  // Validate inputs
  if (isNaN(billAmount) ){
    alert('Please enter bill amount');
    return;
  }
  
  if (serviceQuality === 0) {
    alert('Please select service quality');
    return;
  }

  // Set default for number of people
  if (isNaN(numberOfPeople)) {
    numberOfPeople = 1;
    document.getElementById('each').style.display = 'none';
  } else {
    document.getElementById('each').style.display = 'block';
  }

  // Calculate tip
  const total = (billAmount * serviceQuality) / numberOfPeople;
  const roundedTotal = total.toFixed(2);

  // Display result
  document.getElementById('totalTip').style.display = 'block';
  document.getElementById('tip').innerHTML = roundedTotal;
}

// Set initial display
document.getElementById('totalTip').style.display = 'none';

// Add click handler
document.getElementById('calculate').onclick = calculateTip;