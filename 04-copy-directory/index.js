const fs = require('fs');
const path = require('path');
const { readdir, mkdir, copyFile} = require('fs/promises')

const source = path.join(__dirname+'/files/')
const dest = path.join(source.substring(0,source.length-1)+'-copy/')
mkdir(dest, {recursive: true})


try {
    readdir(source)
      .then(items => items.forEach(item => copyFile(source+item, dest+item)))
  } catch (err) {
    console.error(err);
  }