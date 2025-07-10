const removeFalsy = (arr) => arr.filter(Boolean);

console.log(removeFalsy([NaN, 0, 15, false, -22, '', undefined, 47, null])); 
// Output: [15, -22, 47]