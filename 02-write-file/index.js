const fs = require('fs');
const path = require('path');
let filePath = path.join(__dirname,'text.txt');
let stream = new fs.WriteStream(filePath, 'utf8');

fs.open(filePath, 'w', (err) => {
  if (err) throw err;
});

const rl = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout,
  prompt: 'Hi! Please, enter your text:'
});

rl.prompt();

rl.on('line', (input) => {
  if (input === 'exit') {
    rl.close();
    process.exit();
  }
  stream.write(input + '\n');
});

rl.on('close', () => {
  console.log('Thank U! Bye!');
});