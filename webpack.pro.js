const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const HtmlWebpackExternalsPlugin = require('html-webpack-externals-plugin')
const autoprefixer = require('autoprefixer');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, DllReferencePlugin } = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');


module.exports = {
    mode: 'production',
    entry: {
        index: './src/index.js',
        search: './src/search.js',
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'static/js/[name].[hash:8].js',
        chunkFilename: '[name].[chunkhash:8].chunk.js'
    },
    module: {
        rules: [
            {
                oneOf: [
                    {
                        test: /\.(js|jsx)$/,
                        use: 'babel-loader',
                        include: path.join(__dirname, 'src'),
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
                        test: /\.(sass|scss)$/,
                        exclude: /\.module\.(scss|sass)$/,
                        use: [
                            {
                                loader: MiniCssExtractPlugin.loader
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
                                loader: MiniCssExtractPlugin.loader
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
                                    name: 'static/image/[name].[hash:8].[ext]'
                                }
                            }
                        ]
                    },
                    {
                        test: /.(woff|woff2|eot|ttf|otf)$/,
                        loader: 'file-loader',
                        options: {
                            name: 'static/media/[name].[hash:8].[ext]'
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
            '@src': path.resolve(__dirname, './src'),
            '@component': path.resolve(__dirname, './src/component'),
            '@asset': path.resolve(__dirname, './src/asset'),
        }
    },
    optimization: {
        splitChunks: {
            chunks: 'all',      //[all、initial、async]:[所有、入口、异步]
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,        //每个异步模块的最大并发请求数：注意：同时又两个模块满足拆分条件的时候更大的包会先被拆分
            maxInitialRequests: 3,      //每个入口文件的最大并发请求数：注意：同时又两个模块满足拆分条件的时候更大的包会先被拆分
            // automaticNameDelimiter: '~',
            // name: 'custom_common_chunk',
            // splitChunks的配置项都是作用于cacheGroup上的，
            cacheGroups: {
                default: {
                    // name: 'default',
                    minChunks: 2,
                    priority: -20,  //权重
                    reuseExistingChunk: true
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    priority: -10
                },
                reactbase: {
                    name: 'reactbase',
                    chunks: 'initial',      //[all、initial、async]:[所有、入口、异步]
                    test: (module) => (/react/.test(module.context) || /react-dom/.test(module.context)
                        || /react-router-dom/.test(module.context) || /react-loadable/.test(module.context)),
                    priority: -1,  //权重
                    maxInitialRequests: 5,
                    reuseExistingChunk: false
                },
                jquery: {
                    name: 'jquery',
                    chunks: 'initial',      //[all、initial、async]:[所有、入口、异步]
                    test: (module) => (/jquery/.test(module.context)),
                    priority: -1, //权重
                    reuseExistingChunk: false
                }
            }
        }
    },
    plugins: [
        new FriendlyErrorsWebpackPlugin(),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/index.html'),
            filename: 'index.html',
            chunks: ['index', 'reactbase', 'jquery', 'vendors'],
            // chunks: ['index', 'custom_common_chunk'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, 'src/search.html'),
            filename: 'search.html',
            chunks: ['search', 'reactbase', 'vendors'],
            // chunks: ['search', 'custom_common_chunk'],
            inject: true,
            minify: {
                html5: true,
                collapseWhitespace: true,
                preserveLineBreaks: false,
                minifyCSS: true,
                minifyJS: true,
                removeComments: false
            }
        }),
        // new HtmlWebpackExternalsPlugin({
        //     externals: [
        //         {
        //             module: 'react',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react.min.js',
        //             global: 'React',
        //         },
        //         {
        //             module: 'react-dom',
        //             entry: 'https://11.url.cn/now/lib/16.2.0/react-dom.min.js',
        //             global: 'ReactDOM',
        //         },
        //     ],
        // }),
        new MiniCssExtractPlugin({
            filename: 'static/css/[name].[hash:8].css',
            chunkFilename: '[id].[hash:8].css',
        }),
        new OptimizeCssAssetsPlugin({
            assetNameRegExp: /.css$/g,
            cssProcessor: require('cssnano'),
            cssProcessorPluginOptions: {
                preset: ['default', { discardComments: { removeAll: true } }],
            },
            canPrint: true
        }),
        new DefinePlugin({
            'process.env': JSON.stringify(process.env)
        }),

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
}