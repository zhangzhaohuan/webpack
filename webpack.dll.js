const path = require('path')
const webpack = require('webpack')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: {
        react: ['react-dom', 'react','react-loadable','react-router-dom'],
    },
    output: {
        path: path.resolve(__dirname, 'dll'),
        filename: '[name]_dll.js',
        library: '[name]_dll'
    },
    plugins: [
        new CleanWebpackPlugin(),
        new webpack.DllPlugin({ // name === library
            path: path.join(__dirname, 'dll', '[name]_dll.manifest.json'),
            name: '[name]_dll',
            context: __dirname
        })
    ]
}