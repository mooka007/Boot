const fs = require("fs");
// read the content from source.txt
fs.readFile("source.txt", "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content from source.txt: ", data);
});
// Copy a file from source.txt to destination.txt
fs.copyFile("source.txt", "destination.txt", (err) => {
  if (err) {
    console.error("Error copying file:", err);
  } else {
    console.log("File copied successfully!");
  }
});
