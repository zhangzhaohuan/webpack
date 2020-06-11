# webpackdemo版本
* v1.0 基础多页面配置基本完成，分离打包dll
* v1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* v1.1 配置文件移动到config文件夹\添加eslint\状态管理

# v1.1 
* 配置文件移动到config文件夹
* 添加eslint
* 添加.editorconfig
* 状态管理
* HardSourceWebpackPlugin 替换dll

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
