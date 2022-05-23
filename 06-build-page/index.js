const fs = require('fs');
const path = require('path');
const { readdir, copyFile } = require('fs/promises')
let templateFile = ''
const templatePath = path.join(__dirname, '/template.html');
const stream = fs.createReadStream(templatePath);
const resultPath = path.join(__dirname + '/project-dist/')

function copyDirectory(source, dest) {
    console.log(source,dest)
    readdir(source)
        .then(items => items.forEach(item => {
         fs.stat(path.join(source+item), (error, stats) => {
            if (error) {
              console.log(error);
            }
            else {
            if (stats.isFile()) copyFile(source+item, dest+item)
              else if (stats.isDirectory()) {
                  fs.mkdir(dest+item+'/', (err) => {
                    if (err) {
                        return console.error(err);
                    }
                    console.log('Directory created successfully!');
                  })
                  copyDirectory(path.join(source+item+'/',dest+item+'/'))
                }
            }
          }) ;
        }))
  }

stream.on('data', (data) => templateFile += data.toString());
stream.on('end', () => {
    const regexp = /{{\w{1,}}}/g
    const matches = templateFile.match(regexp);
    let counter = 0;
    matches.forEach(match => {
        const filename = match.slice(2, -2);
        const readStream = fs.createReadStream(path.join(__dirname, '/components/', filename + '.html'));
        readStream.on('data', (data) => {
            counter++;
            templateFile = templateFile.replace(match, data.toString())
        })
        readStream.on('close', () => {
            if (counter == matches.length) {
                const writer = fs.createWriteStream(path.join(resultPath, '/index.html'))
                writer.write(templateFile)
                writer.close()
            }
        })
    })
})

fs.mkdir(resultPath, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
})

const assetsDir = path.join(__dirname,'/assets/')
fs.mkdir(path.join(resultPath,'/assets/'),{recursive: true},(err) => {
    if (err) {
        return console.error(err);
    }
    console.log('Directory created successfully!');
})
copyDirectory(assetsDir,path.join(resultPath+'/assets/'))
const source = path.join(__dirname+'/styles/')
const destination = path.join(__dirname+'/project-dist/')
const destFile = 'style.css';
let globalStyles = [];
const writer2 = fs.createWriteStream(destination+destFile)
try {
    readdir(source, { withFileTypes: true })
        .then(items => {
            items.forEach(item => {
                console.log(item)
                if (!item.isFile()) return;
                if (path.extname(item.name) !== '.css') return;
                const stream = fs.createReadStream(source + item.name)
                stream.on('data', (data) => {
                    let dat = data.toString();
                    globalStyles.push(dat);
                    writer2.write(dat);
                    stream.close()
                })
            })      
        })
} catch (error) {
    throw error;
}

