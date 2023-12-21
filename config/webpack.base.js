const glob = require('glob');
const os = require("os");
const HtmlWebpackPlugin = require('html-webpack-plugin');
// webpack5使用异常
// const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const {  DefinePlugin } = require('webpack');
//css浏览器前缀
const autoprefixer = require('autoprefixer');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
// const WebpackBar = require("webpackbar");

// HardSourceWebpackPlugin 替换dll
// const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
//路经和路径函数
const paths = require('./paths');
const projectView = require(paths.resolveApp('./project.view.json'));
const NODE_ENV = process.env.NODE_ENV;
const contentHash8 = NODE_ENV === 'production' ? '[contenthash:8]' : '';
// cpu核数
const threads = os.cpus().length;

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
      const chunks = (projectView[pageName]&& projectView[pageName].chunks) || ["vendors", "reactbase", "jquery", "runtimechunk", pageName]
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
            use: [
              {
                loader: "thread-loader",
                // 有同样配置的 loader 会共享一个 worker 池
                options: {
                  // 产生的 worker 的数量，默认是 (cpu 核心数 - 1)，或者，
                  // 在 require('os').cpus() 是 undefined 时回退至 1
                  workers: threads,
            
                  // 一个 worker 进程中并行执行工作的数量
                  // 默认为 20
                  workerParallelJobs: 50,
            
                  // 额外的 node.js 参数
                  workerNodeArgs: ['--max-old-space-size=1024'],
            
                  // 允许重新生成一个僵死的 work 池
                  // 这个过程会降低整体编译速度
                  // 并且开发环境应该设置为 false
                  poolRespawn: false,
            
                  // 闲置时定时删除 worker 进程
                  // 默认为 500（ms）
                  // 可以设置为无穷大，这样在监视模式(--watch)下可以保持 worker 持续存在
                  poolTimeout: 2000,
            
                  // 池分配给 worker 的工作数量
                  // 默认为 200
                  // 降低这个数值会降低总体的效率，但是会提升工作分布更均一
                  poolParallelJobs: 50,
            
                  // 池的名称
                  // 可以修改名称来创建其余选项都一样的池
                  name: "my-pool"
                },
              },
            {
              loader: 'babel-loader',
              options: {
                "cacheCompression": false, 
                "cacheDirectory": true, 
              }
            }  
            ],
            include: paths.resolveApp('src')
          },
          {
            test: /\.css$/,
            exclude: /\.module\.css$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
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
            test: /\.(less)$/,
            exclude: /\.module\.(less)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
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
              'less-loader'
            ]
          },
          {
            test: /\.module\.(less)$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader,
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
              'less-loader'
            ]
          },
          {     
            test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
            // 3.合理的规范:
            // 3.1.对于小一点的图片, 可以进行base64编码
            // 3.2.对于大一点的图片, 单独的图片打包, 形成url地址, 单独的请求这个url图片
            type: "asset",
            parser: {
              dataUrlCondition: {
                maxSize: 10 * 1024
              }
            },
            generator: {
              filename: `asset/image/[name]${contentHash8}.[ext]`
            }, 
          },
          {
            test: /.(woff|woff2|eot|ttf|otf)$/,
            type: "asset/resource",
            generator: {
              filename: 'asset/font/[name].[ext]'
            }, 
          },
          {
            exclude: [/\.(js|jsx)$/, /\.html$/, /\.json$/, /\.(sa|sc|le|c)ss$/],
            type: "asset/resource",
            generator: {
              filename: 'asset/other/[name].[ext]'
            }, 
          },
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
          minChunks: 2,
          priority: -20,  //权重
          reuseExistingChunk: true  //
        },
        defaultVendors: {
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
    // new WebpackBar(),
    new DefinePlugin({
      'process.env': JSON.stringify(process.env)
    }),
    function () {
      this.hooks.done.tap('done', (stats) => {
        // 构建异常和错误处理
        if (stats.compilation.errors && stats.compilation.errors.length && process.argv.indexOf('--watch') == -1) {
          console.log('build error');
          console.log(stats.compilation.errors);
          process.exit(1);
        }
      })
    }
  ].concat(htmlWebpackPlugins),
  performance: {
    maxEntrypointSize: 300000
  }
}
