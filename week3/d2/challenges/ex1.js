const sentence = "The movie is not that bad, i like it."

const wordNot = sentence.indexOf("not");
const wordBad = sentence.indexOf("bad");


if (wordNot && wordBad && wordBad > wordNot) {
    const newSentence = sentence.slice(0, wordNot) + "good" + sentence.slice(wordBad + 3)
    console.log(newSentence);
} else {
    console.log(sentence)
}
