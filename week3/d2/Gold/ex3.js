let age = [20, 5, 12, 43, 98, 55];

// 1. Sum of all numbers
let sum = 0;
for (let i = 0; i < age.length; i++) {
  sum += age[i];
}
console.log("Sum of all ages:", sum); 

// 2. Highest age in the array
let highestAge = age[0]; 
for (let i = 1; i < age.length; i++) {
  if (age[i] > highestAge) {
    highestAge = age[i];
  }
}
console.log("Highest age:", highestAge);