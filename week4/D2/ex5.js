const epic = ['a', 'long', 'time', 'ago', 'in a', 'galaxy', 'far far', 'away'];

const sentence = epic.reduce((acc, initiate)=> {
    return `${acc} ${initiate}`
})

console.log(sentence)