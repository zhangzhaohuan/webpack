const path = require('path');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, DllReferencePlugin } = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
//路径和路径函数
const paths = require('./paths');
const webpackBase = require('./webpack.base');

module.exports = webpackMerge(webpackBase, {
  mode: 'production',
  output: {
    path: paths.resolveApp('build'),
    filename: 'static/[name]/js/[name].[hash:8].js',
    publicPath: '/',
    chunkFilename: 'static/chunks/[name].[chunkhash:8].chunk.js'
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/[name]/css/[name].[hash:8].css',
      chunkFilename: 'static/chunks/[id].[hash:8].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new BundleAnalyzerPlugin({
      //  可以是`server`，`static`或`disabled`。
      //  在`server`模式下，分析器将启动HTTP服务器来显示软件包报告。
      //  在“静态”模式下，会生成带有报告的单个HTML文件。
      //  在`disabled`模式下，你可以使用这个插件来将`generateStatsFile`设置为`true`来生成Webpack Stats JSON文件。
      analyzerMode: 'static',
      //  将在“服务器”模式下使用的主机启动HTTP服务器。
      analyzerHost: '127.0.0.1',
      //  将在“服务器”模式下使用的端口启动HTTP服务器。
      analyzerPort: 8888,
      //  路径捆绑，将在`static`模式下生成的报告文件。
      //  相对于捆绑输出目录。
      reportFilename: 'report.html',
      //  模块大小默认显示在报告中。
      //  应该是`stat`，`parsed`或者`gzip`中的一个。
      //  有关更多信息，请参见“定义”一节。
      defaultSizes: 'parsed',
      //  在默认浏览器中自动打开报告
      openAnalyzer: true,
      //  如果为true，则Webpack Stats JSON文件将在bundle输出目录中生成
      generateStatsFile: false,
      //  如果`generateStatsFile`为`true`，将会生成Webpack Stats JSON文件的名字。
      //  相对于捆绑输出目录。
      statsFilename: 'stats.json',
      //  stats.toJson（）方法的选项。
      //  例如，您可以使用`source：false`选项排除统计文件中模块的来源。
      //  在这里查看更多选项：https：  //github.com/webpack/webpack/blob/webpack-1/lib/Stats.js#L21
      statsOptions: null,
      logLevel: 'info' // 日志级别。可以是'信息'，'警告'，'错误'或'沉默'。
    }),
    new CompressionPlugin(),

    // // 手动引入 DLL 动态链接库
    // new DllReferencePlugin({
    //     // 注意！！！
    //     // DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
    //     context: path.resolve(__dirname),
    //     manifest: path.resolve(__dirname, 'dll/react_dll.manifest.json'),
    // }),
    // // 手动引入 DLL 动态链接库
    // new DllReferencePlugin({
    //     // 注意！！！
    //     // DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
    //     context: path.resolve(__dirname),
    //     manifest: path.resolve(__dirname, 'dll/jquery_dll.manifest.json'),
    // }),
    // new AddAssetHtmlPlugin([
    //     {
    //         filepath: path.resolve(__dirname, 'dll/react_dll.js'),
    //         outputPath:'dll',
    //         publicPath:'./dll'
    //     },
    //     {
    //         filepath: path.resolve(__dirname, 'dll/jquery_dll.js'),
    //         outputPath:'dll',
    //         publicPath:'./dll'
    //     }
    // ]),
  ],
})