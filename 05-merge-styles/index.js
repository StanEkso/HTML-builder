const fs = require('fs');
const path = require('path');
const { readdir, copyFile} = require('fs/promises')

const source = path.join(__dirname+'/styles/')
const destination = path.join(__dirname+'/project-dist/')
const destFile = 'bundle.css';
let globalStyles = [];
const writer = fs.createWriteStream(destination+destFile)
try {
    readdir(source, { withFileTypes: true })
        .then(items => {

            items.forEach(item => {
                if (!item.isFile()) return;
                if (path.extname(item.name) !== '.css') return;
                const stream = fs.createReadStream(source + item.name)
                stream.on('data', (data) => {
                    let dat = data.toString();
                    globalStyles.push(dat);
                    writer.write(dat);
                    stream.close()
                })
            })
            //setTimeout(() => writer.write(globalStyles.join('\n')), 500)
           
        })
} catch (error) {
    throw error;
}