const persons = [
    {
        id: 0,
        name: "Imad",
        age: 26
    },    
    {
        id: 1,
        name: "Angel",
        age: 15
    },    
    {
        id: 3,
        name: "Hmad",
        age: 60
    },    
];


const person = persons.findIndex(person=> person.name === "Angel")

console.log(person);
