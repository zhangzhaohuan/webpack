const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
    entry: {
        'large-number-zzh': './src/index.js',
        'large-number-zzh.min': './src/index.js'
    },
    output: {
        filename: '[name].js',
        library: 'largeNumberZzh',
        libraryTarget: 'umd',
        libraryExport: 'default'
    },
    mode: 'none',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                include: /\.min\.js$/,
            })
        ]
    }
}