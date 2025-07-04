function biggestNumberInArray(arrayNumber) {
  let biggest = 0;
  for (let num of arrayNumber) {
    if (typeof num === 'number' && num > biggest) {
      biggest = num;
    }
  }
  return biggest;
}

const array = [-1, 0, 3, 100, 99, 2, 99];
const array2 = ['a', 3, 4, 2];
const array3 = [];
console.log(biggestNumberInArray(array));  
console.log(biggestNumberInArray(array2));
console.log(biggestNumberInArray(array3)); 