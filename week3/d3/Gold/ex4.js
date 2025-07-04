function isOmnipresent(arr, value) {
  return arr.every(subArray => subArray.includes(value));
}

console.log(isOmnipresent([[3, 4], [8, 3, 2], [3], [9, 3], [5, 3], [4, 3]], 3));
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 1)); 
console.log(isOmnipresent([[1, 1], [1, 3], [5, 1], [6, 1]], 6));