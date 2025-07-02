const details = 
    { 
        my: 'name',
        is : 'Rudolf',
        the: 'reindeer'
    }

let jomla = " ";
for (const key in details){
    jomla += `${key} ${details[key]}`
}

console.log(jomla)