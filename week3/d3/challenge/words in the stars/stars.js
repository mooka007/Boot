const prompt = require("prompt-sync")();

function wordsInFrame() {
  const words = prompt("Enter words separated by commas:").split(",").map(word => word.trim());
  const maxLength = Math.max(...words.map(word => word.length));
  
  const border = "*".repeat(maxLength + 4);
  console.log(border);
  
  words.forEach(word => {
    console.log(`* ${word.padEnd(maxLength)} *`);
  });
  
  console.log(border);
}

wordsInFrame();


