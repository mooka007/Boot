const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(num, i);
    alert(num);
    return num * 2;
})

// i takes the values 0, 1, 2, 3, 4, 5
// Final newArray = [2, 4, 8, 10, 16, 18]