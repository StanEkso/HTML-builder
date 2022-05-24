const fs = require('fs');
const path = require('path');
const { readdir, mkdir, copyFile} = require('fs/promises')

const source = path.join(__dirname+'/files/')
const dest = path.join(source.substring(0,source.length-1)+'-copy/')
fs.stat(dest,(err, stat) => {
  if (!err) {
    readdir(dest)
      .then(items => items.forEach(item =>
      fs.rm(dest+item, (err) => err)))  
      .then(items =>copyDirectory(source)); 
  } else {
    copyDirectory(source)
  }
})
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