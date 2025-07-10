//  1
[2] === [2] // false 
{} === {}   // false

// 2
console.log(object2.number); // 4 (references object1)
console.log(object3.number); // 4 (references object2 → object1)
console.log(object4.number); // 5 (new object, unaffected by object1's change)

//  3
class Animal {
  constructor(name, type, color) {
    this.name = name;
    this.type = type;
    this.color = color;
  }
}

class Mammal extends Animal {
  sound(soundMade) {
    return `${soundMade} I'm a ${this.type}, named ${this.name} and I'm ${this.color}`;
  }
}

const farmerCow = new Mammal('Lily', 'cow', 'brown and white');
console.log(farmerCow.sound('Moooo')); 
