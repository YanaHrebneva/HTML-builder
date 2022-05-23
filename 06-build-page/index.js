const fs = require('fs');
const path = require('path');

const templateFile = path.join(__dirname, '/template.html');
const projectFolder = path.join(__dirname, 'project-dist');
const componentsFolder = path.join(__dirname, 'components');
const stylesFolder = path.join(__dirname, 'styles');
const assetsFolder = path.join(__dirname, 'assets');
const newAssetsFolder = path.join(projectFolder, 'assets');

fs.mkdir(projectFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.mkdir(newAssetsFolder, { recursive: true }, (err) => {
  if (err) throw err;
});

fs.open(path.join(projectFolder, 'index.html'), 'w', (err) => {
  if (err) throw err;
});

fs.open(path.join(projectFolder, 'style.css'), 'w', (err) => {
  if (err) throw err;
});

fs.copyFile(templateFile, path.join(projectFolder, 'index.html'), (err) => {
  fs.readFile(path.join(projectFolder, 'index.html'),'utf-8', (err, chunk) => {
    fs.readdir(componentsFolder, (err, files) => {
      files.forEach(file => {
        fs.readFile(path.join(componentsFolder, `${file}`),'utf-8', (err, content) => {
          let tag = path.parse(`${file}`).name;
          chunk = chunk.replace(`{{${tag}}}`, `${content}`);
          fs.writeFile(path.join(projectFolder, 'index.html'), chunk, (err) => {
            if (err) throw err;
          });
            if (err) throw err;
        });
          });
          if (err) throw err;
        });
        if (err) throw err;
    });
  if (err) throw err;
});

fs.readdir(stylesFolder, { withFileTypes: true }, (err, files) => {
  if (err) throw err;
  files.forEach(file => {
    const extName = path.extname(file.name);
    if (extName != '.css') return;
    else {
      let arrayOfStyles = [];
      const readableStream = fs.createReadStream(path.join(stylesFolder, file.name), 'utf-8');
      readableStream.on('data', file => {
        arrayOfStyles.push(file + '\n');
      });

    readableStream.on('end', () => {
      let writableStream = fs.createWriteStream(path.join(projectFolder, 'style.css'), { 
        flags: 'a' 
      });
      writableStream.write(arrayOfStyles.join(''));
    });
  }
})
});

fs.readdir(assetsFolder, { withFileTypes: true }, (err, folders) => {    
  folders.forEach(folder => {
    fs.mkdir(path.join(newAssetsFolder, folder.name), { recursive: true }, (err) => {
      if (err) throw err;
      fs.readdir(path.join(assetsFolder, folder.name), (err, files) => {
        if (err) throw err;
        files.forEach(file => {
          fs.copyFile(path.join(assetsFolder, folder.name, file), path.join(newAssetsFolder, folder.name, file), (err) => {
            if (err) throw err;
          });
        });
      });
    });
  });
  if (err) throw err;
});