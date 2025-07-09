// ------1------

const fruits = ["apple", "orange"];
const vegetables = ["carrot", "potato"];

const result = ['bread', ...vegetables, 'chicken', ...fruits];
console.log(result);

// ------2------

const country = "USA";
console.log([...country]);

// ------Bonus------

let newArray = [...[,,]];
console.log(newArray);
