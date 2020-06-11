// 为打印的日志添加颜色
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
// 本地服务器
const webpackDevServer = require('webpack-dev-server');

// 开发环境webpack配置文件
const webpackDevConfig = require('./webpack.dev.js');


webpackDevServer.addDevServerEntrypoints(webpackDevConfig, webpackDevConfig.devServer);

const compiler = webpack(webpackDevConfig);

const server = new webpackDevServer(compiler, webpackDevConfig.devServer);

server.listen(8080,'127.0.0.1', () => {
  console.log(chalk.green('******************************************************************'));
  console.log(chalk.green('server in running on localhost:8080'));
  console.log(chalk.green('******************************************************************'));
});


