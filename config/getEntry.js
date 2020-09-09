module.exports =   function getEntry(){
  const fs = require('fs');
  const paths = require('./paths');
  const entry = {};
  const dirs =  fs.readdirSync(paths.resolveApp('./src/pages'));
  dirs.forEach(element => {
    entry[element] = `./src/pages/${element}`
  });
  return entry;
}