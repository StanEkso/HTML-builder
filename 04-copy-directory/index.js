const fs = require('fs');
const path = require('path');
const { readdir, mkdir, copyFile} = require('fs/promises')

const source = path.join(__dirname+'/files/')
const dest = path.join(source.substring(0,source.length-1)+'-copy/')
mkdir(dest, {recursive: true})

function copyDirectory(source) {
  readdir(source)
      .then(items => items.forEach(item => {
       fs.stat(path.join(source+item), (error, stats) => {
          if (error) {
            console.log(error);
          }
          else {
          if (stats.isFile()) copyFile(source+item, dest+item)
            else if (stats.isDirectory()) copyDirectory(path.join(source+item))
          }
        }) ;
      }))
}
try {
   copyDirectory(source)
  } catch (err) {
    console.error(err);
  }