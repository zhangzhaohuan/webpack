'use strict';

const path = require('path');
const fs = require('fs');

const appDirectory = fs.realpathSync(process.cwd());  //cwd是指当前node命令执行时所在的文件夹目录；
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);


module.exports = {
  resolveApp:resolveApp
}