const glob = require('glob');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const { optimize, DefinePlugin } = require('webpack');
//css浏览器前缀
const autoprefixer = require('autoprefixer');
// 压缩css
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// 抽离css: dev/pro 文件hash的支持不一样
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// HardSourceWebpackPlugin 替换dll
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//路经和路径函数
const paths = require('./paths');
const projectView = require(paths.resolveApp('./project.view.json'));

const setMPA = () => {
  const entry = {};
  const htmlWebpackPlugins = [];
  const entryFiles = glob.sync(paths.resolveApp('./src/pages/*/index.js'));
  Object.keys(entryFiles)
    .map((index) => {
      const entryFile = entryFiles[index];
      const match = entryFile.match(/src\/pages\/(.*)\/index\.js/);
      const pageName = match && match[1];
      entry[pageName] = entryFile;
      const chunks = projectView[pageName].chunks || ["vendors", "reactbase", "jquery", "runtimechunk", pageName]
      return htmlWebpackPlugins.push(
        new HtmlWebpackPlugin({
          template: paths.resolveApp(`src/pages/${pageName}/index.html`),
          filename: `${pageName}.html`,
          chunks: chunks,
          inject: true,
          minify: {
            html5: true,
            collapseWhitespace: true,
            preserveLineBreaks: false,
            minifyCSS: true,
            minifyJS: true,
            removeComments: false,
          },
        })
      );
    });
  return {
    entry,
    htmlWebpackPlugins,
  };
};
const { entry, htmlWebpackPlugins } = setMPA();

module.exports = {
  entry: entry,
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            use: ['babel-loader', 'eslint-loader'],
            include: paths.resolveApp('src')
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  // sourceMap: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ]
          },
          {
            test: /\.module\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  // sourceMap: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
            ]
          },
          {
            test: /\.(scss|sass)$/,
            exclude: /\.module\.(scss|sass)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  // sourceMap: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              'sass-loader'
            ]
          },
          {
            test: /\.module\.(scss|sass)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
                options: {
                  hmr: true,
                  reloadAll: true,
                },
              },
              {
                loader: require.resolve('css-loader'),
                options: {
                  importLoaders: 1,
                  modules: true,
                  // sourceMap: true,
                },
              },
              {
                loader: require.resolve('postcss-loader'),
                options: {
                  // Necessary for external CSS imports to work
                  // https://github.com/facebookincubator/create-react-app/issues/2677
                  ident: 'postcss',
                  plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                      overrideBrowserslist: [
                        '>1%',
                        'last 4 versions',
                        'Firefox ESR',
                        'not ie < 9', // React doesn't support IE8 anyway
                      ],
                      flexbox: 'no-2009',
                    }),
                  ],
                },
              },
              'sass-loader'
            ]
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 10240,
                  name: 'asset/image/[name].[hash:8].[ext]'
                }
              }
            ]
          },
          {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            loader: 'file-loader',
            options: {
              name: 'asset/media/[name].[hash:8].[ext]'
            }
          },
          {
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            loader: 'file-loader',
            options: {
              name: 'asset/image/[name].[hash:8].[ext]'
            }
          },
          //放在最后，处理没被其他loader处理的文件
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/, /\.(sa|sc|c)ss$/],
            loader: 'file-loader',
            options: {
              name: 'static/other/[name].[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      '@src': paths.resolveApp('./src'),
      '@component': paths.resolveApp('./src/component'),
      '@asset': paths.resolveApp('./src/asset'),
    }
  },
  optimization: {
    splitChunks: {
      chunks: 'initial',      //[all、initial、async]:[所有、入口、异步]
      minSize: 30000,
      minChunks: 1,
      maxAsyncRequests: 5,        //每个异步模块的最大并发请求数：注意：同时又两个模块满足拆分条件的时候更大的包会先被拆分
      maxInitialRequests: 3,      //每个入口文件的最大并发请求数：注意：同时又两个模块满足拆分条件的时候更大的包会先被拆分
      // automaticNameDelimiter: '~',
      // name: 'custom_common_chunk',
      // splitChunks的配置项都是作用于cacheGroup上的，
      //[ test, priority and reuseExistingChunk ] can only be configured on cache group
      cacheGroups: {
        default: {
          // name:'default',
          minChunks: 2,
          priority: -20,  //权重
          reuseExistingChunk: true  //
        },
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          enforce: true,
          reuseExistingChunk: true
        },
        reactbase: {
          name: 'reactbase',
          chunks: 'all',      //[all、initial、async]:[所有、入口、异步]
          test: (module) => (/react/.test(module.context) || /react-dom/.test(module.context)
            || /react-router-dom/.test(module.context) || /react-loadable/.test(module.context)),
          priority: -1,  //权重
          maxInitialRequests: 5,
          reuseExistingChunk: true
        },
        jquery: {
          name: 'jquery',
          chunks: 'all',      //[all、initial、async]:[所有、入口、异步]
          test: (module) => (/jquery/.test(module.context)),
          priority: -1, //权重
          reuseExistingChunk: true
        },
      }
    },
    // runtimeChunk: {
    //   name: 'runtimechunk'
    // }
  },
  plugins: [
    new HardSourceWebpackPlugin(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    new FriendlyErrorsWebpackPlugin(),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    new optimize.ModuleConcatenationPlugin(),  //scope hosting
    function () {
      this.hooks.done.tap('done', (stats) => {
        // 构建异常和错误处理
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
          console.log('build error');
          process.exit(1);
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  performance: {
    maxEntrypointSize: 300000
  }
}
