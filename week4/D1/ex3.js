const isString = (str) => {
    if (typeof str === 'string') {
        return true;
    }
    return false;
}

console.log(isString('hello'));  
console.log(isString([1, 2, 4, 0]));
console.log(isString(123));
console.log(isString({}));
console.log(isString('')); 