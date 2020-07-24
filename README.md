# webpackdemo版本分支
* master
* br1.0 基础多页面配置基本完成，分离打包dll
* br1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* br1.1 配置基本完善
* br1.2 webpack 打包组件和基础库
* br1.3 ssr

# [eslint](https://www.npmjs.com/package/eslint-config-airbnb)
```
# 此处以react项目为例
npm i babel-eslint eslint-loader -D
npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D
npm i eslint-config-airbnb -D
添加.eslintrc.json文件

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
