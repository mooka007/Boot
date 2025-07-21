const fs = require('fs');
const path = require('path');

function displayFileContent() {
  const filePath = path.join(__dirname, 'files', 'file-data.txt');
  try {
    const content = fs.readFileSync(filePath, 'utf8');
    console.log('File content:');
    console.log(content);
  } catch (error) {
    console.error('Error reading file:', error.message);
  }
}

module.exports = displayFileContent;