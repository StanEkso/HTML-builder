const fs = require('fs');
const path = require('path');
const { readdir } = require('fs/promises')

try {
  readdir(path.join(__dirname+'/secret-folder/'), { withFileTypes: true})
    .then(data => data.forEach(item => {
        let info = '';
        info+=item.name.split('.')[0] + ' - '
        if (!item.isFile()) return;
        info+=path.extname(item.name).substring(1) + ' - '
        fs.stat(path.join(__dirname + '/secret-folder/' + item.name), (err,stats) => console.log(info + (stats.size / 1024) + 'kb'))
    }))
} catch (err) {
  console.error(err);
}