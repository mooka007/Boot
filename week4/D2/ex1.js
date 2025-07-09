const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];

colors.forEach((color, index) => 
    console.log(`${index + 1}# choice is ${color}`)
);


if (colors.includes("Violet")) {
    console.log("Yeah, it's in the list!");
} else {
    console.log("No ...");
}