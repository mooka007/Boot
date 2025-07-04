function capitalize(str) {
  let even = '';
  let odd = '';
  
  for (let i = 0; i < str.length; i++) {
    if (i % 2 === 0) {
      even += str[i].toUpperCase();
      odd += str[i].toLowerCase();
    } else {
      even += str[i].toLowerCase();
      odd += str[i].toUpperCase();
    }
  }
  
  return [even, odd];
}

console.log(capitalize("abcdef")); 