# webpackdemo版本
* v1.0 基础多页面配置基本完成，分离打包dll
* v1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* v1.1 配置文件移动到config文件夹\添加eslint\状态管理

# v1.1 
* 配置文件config
* 代码规范：eslint、.editorconfig
* 技术栈： react+ react-router + redux + redux-react-hook 


## 配置文件夹config
* webpack.base.js
* webpack.dev.js
* webpack.pro.js
```
* 处理js:压缩、chunk
* 处理css\sass: 支持css module，压缩、抽离
* 处理图片和字体库等其他资源
* 生成html
```



## 代码规范
### [添加eslint](https://www.npmjs.com/package/eslint-config-airbnb)
```
# 此处以react项目为例
npm i babel-eslint eslint-loader -D
npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D
npm i eslint-config-airbnb -D
添加.eslintrc.json文件
```
### [添加editorconfig](https://www.jianshu.com/p/fac7dde906cc)
```
# 添加配置文件.editorconfig
# 安装vscode插件：EditorConfig for VS Code
```

### HardSourceWebpackPlugin 替换dll
```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
new HardSourceWebpackPlugin(),

```
