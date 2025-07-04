function abbrev_name(fullName){
    const nameParts = fullName.trim().split(' ')
    if (nameParts.length < 2){
        return fullName
    }
    const firstName = nameParts[0]
    const lastInitialName = nameParts[1][0]
    return `${firstName} ${lastInitialName}`
}


console.log(abbrev_name("Robin Singh"));  
console.log(abbrev_name("John Doe")); 
console.log(abbrev_name("Alice"));  