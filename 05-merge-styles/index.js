const fs = require('fs');
const path = require('path');
let stylesFolder = path.join(__dirname,'styles');
let bundleFile = path.join(__dirname, 'project-dist', 'bundle.css');
let arrayOfStyles = [];

fs.open(bundleFile, 'w', (err) => {
  if (err) throw err;
});

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    if (path.basename(file.name).split('.')[1] === 'css') {
      let readStream = new fs.ReadStream(path.join(stylesFolder, file.name), 'utf8');

      readStream.on('data', chunk => {
        arrayOfStyles.push(chunk + '\n');
      });

      readStream.on('end', () => {
        let writeStream = new fs.WriteStream(bundleFile);
        writeStream.write(arrayOfStyles.join(''));
      });

    }
  });
});