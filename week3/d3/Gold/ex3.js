function swapAlpha(word) {
    let swapped = '';
    for (let i = 0; i < word.length; i++) {
        if (word[i] === word[i].toUpperCase() && word[i] !== word[i].toLowerCase()) {
            swapped += word[i].toLowerCase();
        } else {
            swapped += word[i].toUpperCase();
        }
    }
    return swapped;
}

console.log(swapAlpha("AbcDPL")); 