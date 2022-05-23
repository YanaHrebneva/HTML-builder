const fs = require('fs');
const path = require('path');
let originalFolder = path.join(__dirname,'files');
let copyFolder = path.join(__dirname,'files-copy');

function copyDir (){

  fs.mkdir(copyFolder, {recursive:true}, (err) => {
    if (err) throw err;

    fs.readdir(copyFolder, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.unlink(path.join(copyFolder, file), (err) => {
          if (err) throw err;
        });
      });
    });  

    fs.readdir(originalFolder, (err, files) => {
      if (err) throw err;
      files.forEach(file => {
        fs.copyFile(path.join(originalFolder, file), path.join(copyFolder, file), err => {
          if (err) throw err;
        });
      });
    });
  });
}

copyDir();