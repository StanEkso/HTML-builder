const fs = require('fs');
const path = require('path');
const readline = require('readline');
const process = require('process')
const { stdin: input, stdout: output } = require('process');
const write = fs.createWriteStream(path.join(__dirname,'/text.txt'))
const rl = readline.createInterface({ input, output });
console.log("Привет, проверяющий!")
ask();
function ask() {
  rl.question('Что вы хотите написать? ', (answer) => {
    if (answer === 'exit') {
      rl.close()
    } else {
    write.write(answer+"\n")
    ask();
    }
  });
}
process.on('exit', () => console.log('Процесс завершен! Пока-пока!'))