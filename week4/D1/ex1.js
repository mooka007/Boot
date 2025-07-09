// predictions.js

// #1
function funcOne() {
    let a = 5;
    if(a > 1) {
        a = 3;
    }
    alert(`inside the funcOne function ${a}`);
}

// #1.1 - Prediction: "inside the funcOne function 3"
// Explanation: 
// - a is initialized to 5
// - The if condition (5 > 1) is true, so a is reassigned to 3
// - The alert shows the final value of a which is 3

// #1.2 - If declared with const:
// Prediction: Error (Assignment to constant variable)
// Explanation: const variables cannot be reassigned after declaration


// #2
let a = 0;
function funcTwo() {
    a = 5;
}

function funcThree() {
    alert(`inside the funcThree function ${a}`);
}

// #2.1 - Predictions:
// funcThree() -> "inside the funcThree function 0"
// funcTwo() -> (no output, but changes global a to 5)
// funcThree() -> "inside the funcThree function 5"
// Explanation:
// - First funcThree() sees the global a (0)
// - funcTwo() modifies the global a to 5
// - Second funcThree() now sees the updated global a (5)

// #2.2 - If declared with const:
// Prediction: Error (Assignment to constant variable)
// Explanation: funcTwo() tries to reassign a const variable which isn't allowed


// #3
function funcFour() {
    window.a = "hello";
}

function funcFive() {
    alert(`inside the funcFive function ${a}`);
}

// #3.1 - Predictions:
// funcFour() -> (no output, sets window.a to "hello")
// funcFive() -> "inside the funcFive function hello"
// Explanation:
// - funcFour() creates a property on the window object
// - funcFive() accesses this global variable through the window object


// #4
let a = 1;
function funcSix() {
    let a = "test";
    alert(`inside the funcSix function ${a}`);
}

// #4.1 - Prediction: "inside the funcSix function test"
// Explanation:
// - The function creates a new local variable a ("test") that shadows the global a (1)
// - Local scope takes precedence over global scope

// #4.2 - If declared with const:
// Prediction: Same output ("inside the funcSix function test")
// Explanation: 
// - const works the same as let in this case for declaration
// - We're creating a new local variable, not reassigning


// #5
let a = 2;
if (true) {
    let a = 5;
    alert(`in the if block ${a}`);
}
alert(`outside of the if block ${a}`);

// #5.1 - Predictions:
// First alert: "in the if block 5"
// Second alert: "outside of the if block 2"
// Explanation:
// - The if block creates a new block-scoped a (5) that shadows the outer a
// - Outside the block, we see the original a (2)

// #5.2 - If declared with const:
// Prediction: Same output as with let
// Explanation:
// - const has the same scoping rules as let in block statements
// - The inner const declaration creates a new block-scoped variable