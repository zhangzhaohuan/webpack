# webpackdemo版本分支
* br1.0 基础多页面配置基本完成，分离打包dll
* br1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* br1.1 配置基本完善：
  * 配置文件移动到config文件夹\
  * 添加eslint\
  * 状态管理\
  * 测试:冒烟|单元|覆盖率
  * 持续集成和Trabis CI

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

## 冒烟测试：test/smoke
使用如下：
```
npm run smoke
```
配置如下：

## 单元测试
使用如下；
```
npm i mocha -D

npm run unit
```
## 测试覆盖率
使用istanbul

## [持续集成和Trabis CI](https://www.travis-ci.org/)
