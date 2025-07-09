// 1
function kgToGram (kg) {
    return kg * 1000;
}
console.log(kgToGram(2));

//  2
const expression  = function (kg) {
    return kg * 1000;
}
console.log(expression(2));

// 3
const kgToGram = kg => kg * 1000;
console.log(kgToGram(2));