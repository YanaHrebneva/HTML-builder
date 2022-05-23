const fs = require('fs');
const path = require('path');
let stream = new fs.ReadStream(path.join(__dirname,'text.txt'), 'utf8');
stream.on('data', data => console.log(data));