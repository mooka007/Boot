const people = ["Greg", "Mary", "Devon", "James"];

// 1. Remove "Greg"
people.shift();
console.log(people);

// 2. Replace "James" with "Jason"
const jamesIndex = people.indexOf("James");
people[jamesIndex] = "Jason";
console.log(people);

// 3. Add your name to the end
people.push("Alex");
console.log(people);


// 4. Console.log Mary's index
console.log(people.indexOf("Mary"));

// 5. Copy array without "Mary" or "Alex"
const peopleCopy = people.slice(1, 3);
console.log(peopleCopy);

// 6. Index of "Foo"
console.log(people.indexOf("Foo"));

// 7. Last element variable
const last = people[people.length - 1];
console.log(last);


// PART 2
for (let i=0; i < people.length; i++)
{
    console.log(people[i])
}


// 

while(i < people.length){
      console.log(people[i]);

    if (people[i] === "Devon")
    {
        break;
    }
    i++;
}
