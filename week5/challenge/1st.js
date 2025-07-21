function makeAllCaps(words) {
  return new Promise((resolve, reject) => {
    if (words.every(word => typeof word === 'string')) {
      const uppercased = words.map(word => word.toUpperCase());
      resolve(uppercased);
    } else {
      reject("Not all items are strings!");
    }
  });
}

function sortWords(uppercasedWords) {
  return new Promise((resolve, reject) => {
    if (uppercasedWords.length > 4) {
      const sorted = [...uppercasedWords].sort();
      resolve(sorted);
    } else {
      reject("Array length must be > 4");
    }
  });
}

makeAllCaps([1, "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error)); 

makeAllCaps(["apple", "pear", "banana"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result))
  .catch(error => console.log(error)); 

makeAllCaps(["apple", "pear", "banana", "melon", "kiwi"])
  .then(arr => sortWords(arr))
  .then(result => console.log(result)) 
  .catch(error => console.log(error));