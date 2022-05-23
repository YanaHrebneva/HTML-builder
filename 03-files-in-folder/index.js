const fs = require('fs');
const path = require('path');
let folderPath = path.join(__dirname,'secret-folder');

fs.readdir(folderPath, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    fs.stat(path.join(folderPath, file.name), (err, stats) => {
      if (err) throw err;
      if (file.isFile()) {
        console.log(`${path.basename(file.name).split('.')[0]} - ${path.extname(file.name).slice(1)} - ${stats.size} bytes`);
      }    
    });      
  });
});