// const chalk = require('chalk');
const webpackMerge = require('webpack-merge');
const paths = require('./paths');
const webpackBase = require('./webpack.base');
// 抽离css
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  output: {
    path: paths.resolveApp('dist'),
    filename: 'static/[name]/js/[name].js',
    publicPath: '/',
    chunkFilename: '[name].chunk.js',
    clean: true,
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'static/[name]/css/[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  optimization: {
    minimize: true,
  },
  devtool: 'cheap-source-map',
  cache: {
    type:'memory'
  },
  devServer: {
    proxy: {},
    client: {
      logging: "warn",
    },
    static:{
      directory: paths.resolveApp('dist'),
    },
    compress: true,
    hot: true, //热更新
    open: true,
    historyApiFallback: true    //以免刷新页面404
  },
  stats: 'errors-warnings',
}) 