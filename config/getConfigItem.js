const fs = require('fs');
const paths = require('./paths');

const projectView = require(paths.resolveApp('./project.view.json'));
const getEntry = function () {
  const entry = {};
  const dirs = fs.readdirSync(paths.resolveApp('./src/pages'));
  dirs.forEach(element => {
    entry[element] = `./src/pages/${element}`
  });
  return entry;
}

const getHtmlWebPack = function () {
  const htmlWebPack = [];
  const dirs = fs.readdirSync(paths.resolveApp('./src/pages'));
  dirs.forEach(element => {
    const obj = projectView[element] || {
      "chunks": ["vendors", "reactbase", "jquery", "runtimechunk", element]
    }
    htmlWebPack.push(obj);
  });
  return htmlWebPack;
}

module.exports = {
  getEntry,
  getHtmlWebPack
}