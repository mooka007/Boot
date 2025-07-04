function isBlank(str) {
  return !str || str.trim().length === 0;
}



console.log(isBlank(''));      
console.log(isBlank(' '));     
console.log(isBlank('\t'));    
console.log(isBlank('\n'));    
console.log(isBlank('abc'));   
console.log(isBlank(' abc ')); 