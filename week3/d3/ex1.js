function displayNumbersDivisible(divisor = 23) {
  let sum = 0;
  let divisibleNumbers = [];

  for (let i = 0; i <= 500; i++) {
    if (i % divisor === 0) {
      divisibleNumbers.push(i);
      sum += i;
    }
  }

  console.log("Outcome:", divisibleNumbers.join(" "));
  console.log("Sum:", sum);
}

displayNumbersDivisible(); 
displayNumbersDivisible(3);
displayNumbersDivisible(45)