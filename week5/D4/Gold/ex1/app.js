const getFileInfo = require('./file-info');

const info = getFileInfo();
console.log('File exists:', info.exists);
console.log('File size:', info.size);
console.log('Created at:', info.createdAt);