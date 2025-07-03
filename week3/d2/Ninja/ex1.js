const person1 = {
  fullName: "John Doe",
  mass: 78,
  height: 1.30,
  calculateBMI: function() {
    return this.mass / (this.height * this.height);
  }
};

const person2 = {
  fullName: "Jane Smith",
  mass: 92,
  height: 0.95, 
  calculateBMI: function() {
    return this.mass / (this.height * this.height);
  }
};

function compareBmi(person1, person2){
    const bmiPerson1 = person1.calculateBMI()
    const bmiPerson2 = person2.calculateBMI()

    if (bmiPerson1 > bmiPerson2){
        console.log(`${person1.fullName} has a higher BMi, which is ${person1.calculateBMI().toFixed(2)}`)
    }
    else if (bmiPerson2 > bmiPerson1){
        console.log(`${person2.fullName} has a higher BMi, which is ${person2.calculateBMI().toFixed(2)} `)
    } else {
        console.log("both has the same BMi")
    }

}

compareBmi(person1, person2)