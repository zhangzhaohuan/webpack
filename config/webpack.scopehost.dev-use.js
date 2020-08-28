const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { DefinePlugin, DllReferencePlugin } = require('webpack');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionPlugin = require('compression-webpack-plugin');
const paths = require('./paths');

module.exports = {
  entry:'./src/scopeHosting/index.js',
  output: {
    path: paths.resolveApp('dist'),
    filename: 'static/index.js',
    publicPath: '/',
  },
  mode:'development',
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            use: ['babel-loader','eslint-loader'],
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
  plugins: [
    // new CleanWebpackPlugin(),
   new webpack.optimize.ModuleConcatenationPlugin()
  ]

}