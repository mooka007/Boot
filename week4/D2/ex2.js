const colors = ["Blue", "Green", "Red", "Orange", "Violet", "Indigo", "Yellow"];
const ordinal = ["th","st","nd","rd"];

colors.forEach((color, index) => {
    const position = index + 1;
    const suffix = 
    position % 100 >= 11 && position % 100 <= 13 ? 'th' :  
        ordinal[position % 10] || 'th';
        console.log(`${index + 1}# choice is ${color}`);

        console.log(`${position}${suffix} choice is ${color}.`);

});
