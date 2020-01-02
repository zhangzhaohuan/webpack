const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { HotModuleReplacementPlugin, optimize, DefinePlugin, DllReferencePlugin } = require('webpack');
const paths = require('./paths');
const webpackBase = require('./webpack.base');

module.exports = webpackMerge(webpackBase, {
  mode: 'development',
  output: {
    path: paths.resolveApp('dist'),
    filename: 'static/[name]/js/[name].[hash:8].js',
    publicPath: '/',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },
  plugins: [
    new HotModuleReplacementPlugin(),
    new CleanWebpackPlugin(),
  ],
  devtool: 'cheap-source-map',
  devServer: {
    contentBase: paths.resolveApp('dist'),
    compress: true,
    hot: true,
    stats: 'errors-only',
    historyApiFallback: true    //以免刷新页面404
  },
}) 