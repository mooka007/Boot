const morseJson = `{
  "0": "-----",
  "1": ".----",
  "2": "..---",
  "3": "...--",
  "4": "....-",
  "5": ".....",
  "6": "-....",
  "7": "--...",
  "8": "---..",
  "9": "----.",
  "a": ".-",
  "b": "-...",
  "c": "-.-.",
  "d": "-..",
  "e": ".",
  "f": "..-.",
  "g": "--.",
  "h": "....",
  "i": "..",
  "j": ".---",
  "k": "-.-",
  "l": ".-..",
  "m": "--",
  "n": "-.",
  "o": "---",
  "p": ".--.",
  "q": "--.-",
  "r": ".-.",
  "s": "...",
  "t": "-",
  "u": "..-",
  "v": "...-",
  "w": ".--",
  "x": "-..-",
  "y": "-.--",
  "z": "--..",
  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "!": "-.-.--",
  "-": "-....-",
  "/": "-..-.",
  "@": ".--.-.",
  "(": "-.--.",
  ")": "-.--.-"
}`;

function toJs() {
  return new Promise((resolve, reject) => {
    const morseObj = JSON.parse(morseJson);
    if (Object.keys(morseObj).length === 0) {
      reject("Morse object is empty!");
    } else {
      resolve(morseObj);
    }
  });
}

function toMorse(morseJS) {
  return new Promise((resolve, reject) => {
    const userInput = prompt("Enter a word or sentence:").toLowerCase();
    const invalidChars = [...userInput].filter(char => !(char in morseJS));
    
    if (invalidChars.length > 0) {
      reject(`Invalid characters: ${invalidChars.join(", ")}`);
    } else {
      const morseTranslation = [...userInput].map(char => morseJS[char]);
      resolve(morseTranslation);
    }
  });
}

function joinWords(morseTranslation) {
  const translationString = morseTranslation.join("\n");
  document.body.innerHTML = `<pre>${translationString}</pre>`;
}

toJs()
  .then(morseObj => toMorse(morseObj))
  .then(morseTranslation => joinWords(morseTranslation))
  .catch(error => console.error(error));