const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process')
const { stdin: input, stdout: output } = require('process');
const write = fs.createWriteStream(path.join(__dirname,'/text.txt'))
const rl = readline.createInterface({ input, output });
console.log("Hello world!")
ask();
function ask() {
  rl.question('What do you want to write in? ', (answer) => {
    if (answer === 'exit') {
      rl.close()
    } else {
    write.write(answer)
    ask();
    }
  });
}
process.on('exit', () => console.log('Process ended! Good bye!'))