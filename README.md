# webpackdemo版本
* v1.0 基础多页面配置基本完成，分离打包
* v1.1 配置文件移动到config文件夹
* v1.2 webpack 打包组件和基础库

### v1.2 webpack 打包资源

# webpack配置
### webpack版本:4.1.0
* 因为webpack 版本会导致某些插件无法使用或者插件的某个属性无法使用，本webpackdemo使用的版本是4.1.0

### 配置中问题
问题：
webpack：4.1.0 "extract-text-webpack-plugin": "^4.0.0-beta.0",但是无法使用contenthash
结论：
webpack3 + extract-text-webpack-plugin
webpack4 + mini-css-extract-plugin


问题：
不使用html-webpack-externals-plugin，改为


问题：

### 
### webpack4新特性及更新
* 新增mode：
    * production:
启用 FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin 和 UglifyJsPlugin.
    * development:
* 废弃CommonsChunkPlugin,新增optimization.splitChunks和runtimeChunk
    * https://www.cnblogs.com/wmhuang/p/8967639.html
    * CommonsChunkPlugin问题：1.产出的chunk在引入的时候，会包含重复的代码；2.无法优化异步chunk；

* 新增sideEffects
    * 使用：


### 插件介绍
* ModuleConcatenationPlugin[最早出现在webpack3]: scope hositing,将模块按照顺序排列，直接放在里面，减少闭包函数形式【webpack.require】
* tree shaking:必须遵循 ES6 的模块规范 (import & export),是DCE 的一种方式，它可以在打包时忽略没有用到的代码【在 Uglifyjs (或者其他类似的工具) 步骤进行代码精简，把没用的都删除】。
* 

## 其他插件的版本如下
```
    "@babel/core": "^7.5.5",
    "@babel/preset-env": "^7.5.5",
    "@babel/preset-react": "^7.0.0",
    "autoprefixer": "^9.6.1",
    "babel-loader": "^8.0.6",
    "clean-webpack-plugin": "^3.0.0",
    "cross-env": "^5.2.0",
    "css-loader": "^3.2.0",
    "cssnano": "^4.1.10",
    "extract-text-webpack-plugin": "^4.0.0-beta.0",
    "file-loader": "^4.2.0",
    "friendly-errors-webpack-plugin": "^1.7.0",
    "html-webpack-externals-plugin": "^3.8.0",
    "html-webpack-plugin": "^3.2.0",
    "optimize-css-assets-webpack-plugin": "^5.0.3",
    "postcss-flexbugs-fixes": "^4.1.0",
    "postcss-loader": "^3.0.0",
    "react": "^16.8.6",
    "react-dom": "^16.8.6",
    "style-loader": "^1.0.0",
    "url-loader": "^2.1.0",
    "webpack": "^4.1.0",
    "webpack-cli": "^3.3.6",
    "webpack-dev-server": "^3.4.0"
```


### DDL https://juejin.im/post/5d8aac8fe51d4578477a6699
