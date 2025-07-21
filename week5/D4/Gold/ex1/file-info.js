const path = require('path');
const fs = require('fs');

function getFileInfo() {
  const filePath = path.join(__dirname, 'data', 'example.txt');
  
  const exists = fs.existsSync(filePath);
  const stats = fs.statSync(filePath);
  
  return {
    exists,
    size: stats.size + ' bytes',
    createdAt: stats.birthtime.toLocaleString()
  };
}

module.exports = getFileInfo;