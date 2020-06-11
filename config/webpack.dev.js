const path = require('path');
const chalk = require('chalk');

const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin, optimize, DefinePlugin, DllReferencePlugin } = require('webpack');
const paths = require('./paths');
const webpackBase = require('./webpack.base');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

//进度条
const ProgressBarPlugin = require('progress-bar-webpack-plugin');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  output: {
    path: paths.resolveApp('dist'),
    filename: 'static/[name]/js/[name].[hash:8].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name]/css/[name].css',
      chunkFilename: '[id].css',
    }),
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
    new ProgressBarPlugin({
      complete: chalk.green('█'),
      incomplete: chalk.white('█'),
      format: '  :bar ' + chalk.green.bold(':percent') + ' :msg',
      clear: false
    }),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    clientLogLevel: 'warning',
    contentBase: paths.resolveApp('dist'),
    compress: true,
    hot: true,
    stats: 'errors-only',
    open: true,
    historyApiFallback: true    //以免刷新页面404
  },
}) 