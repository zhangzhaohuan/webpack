## 环境依赖
node v14.21.3
npm 6.14.18

## 项目启动
```
npm i
npm start
```
# webpackdemo版本分支
* master 配置基本完善：
  * 配置文件移动到config文件夹\
  * 添加eslint\
  * 状态管理\
  * 测试:冒烟|单元|覆盖率
  * 持续集成和Trabis CI
  * git commit 规范 | changlog自动生成
* br1.0 基础多页面配置基本完成，分离打包dll
* br1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* br1.1 配置基本完善：
  * 配置文件移动到config文件夹\
  * 添加eslint\
  * 状态管理\
  * 测试:冒烟|单元|覆盖率
  * 持续集成和Trabis CI
* br2.0
  * 升级react@18.2、react-dom@18.2
    * [升级中遇到的问题]()
  * redux:redux + redux-react-hook 方案保持不变

  * 升级webpack5.x及其影响
    * 升级webpack4.x-->@5.89.0、webpack-cli4.x->@5.1.4
      使用 npm ls webpack 命令查看存在的问题，然后升级各种loader、plugin
      
      稍微改动
      * 升级webpack-dev-server@3.8.0->4.15.1
      * hash -->contenhash

      需要升级的插件
      * 升级html-webpack-plugin3.x->5.5.3
      * 升级add-asset-html-webpack-plugin@3.1.3->
      * 升级mini-css-extract-plugin@0.8.0->2.7.6
      * 升级speed-measure-webpack-plugin@1.3.3->1.5.0

      需要升级的loader
      * 升级file-loader@4.2.0->@6.2.0
      * 升级css-loader@3.2.0->
      * 升级babel-loader8.x->9.1.3
      * 升级style-loader@1.0.0->@3.3.3
      * 升级url-loader@2.1.0->url-loader@4.1.1

      废弃的插件
      * 废弃optimize-css-assets-webpack-plugin --->css-minimizer-webpack-plugin
          * 这个插件使用 cssnano 优化和压缩 CSS
            * 升级cssnano4.x->6.0.1
          * 在 source maps 和 assets 中使用查询字符串会更加准确，支持缓存和并发模式下运行
      * 废弃extract-text-webpack-plugin@4.0.0-beta.0->mini-css-extract-plugin
          * 异步加载
          * 没有重复的编译（性能）
          * 更容易使用
          * 特别针对 CSS 开发
      * 弃用friendly-errors-webpack-plugin@1.7.0
      * 弃用hard-source-webpack-plugin-->webpack配置项cache
      * 弃用progress-bar-webpack-plugin-->new webpack.ProgressPlugin(handler)或者webpackbar
      * 弃用HotModuleReplacementPlugin--->[webpack-dev-server] "hot: true" automatically applies HMR plugin
      * 弃用clean-webpack-plugin--->[output] "clean: true" automatically delete
* br2.1
      * 弃用url-loader、file-loader--->[资源模块](https://webpack.docschina.org/guides/asset-modules/)

## 配置文件夹config
* webpack.base.js
* webpack.dev.js
* webpack.pro.js
```
* 处理js:压缩、chunk
* 处理css\less: 支持css module，压缩、抽离
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

## 测试：冒烟、单元、覆盖率

### 冒烟测试：test/smoke

使用如下：
```
npm run smoke
```
配置如下：

### 单元测试
使用如下；
```
npm i mocha -D

npm run unit
```
### 测试覆盖率

使用istanbul

## [持续集成和Travis CI](https://www.travis-ci.org/)

```
# 添加.travis.yml 文件
language: node_js

sudo: false

cache:
  apt: true
  directories:
    - node_modules

node_js: stable

install:
  - npm install -D

scripts:
  - npm run unit_rate

```


## [Commit message 和 Change log 编写指南](http://www.ruanyifeng.com/blog/2016/01/commit_message_change_log.html)

#### Commit message规范
常用的提交类型：
* build: 打包静态资源
* chore:构建过程或辅助工具的变动
* docs:文档（documentation）表示 文档上传
* feat:新功能（feature） 表示 新增加的功能
* fix:修复bug
* perf:优化相关,比如提升性能、体验
* refactor:重构（即不是新增功能，也不是修改bug的代码变动）
* revert:回滚到上一个版本
* style:格式（不影响代码运行的变动）
* test:增加测试 表示 增加测试用例
* update: 更新 表示 优化更新的功能

实现如下：
```
npm i validate-commit-msg husky -D
```
package.json添加配置:
```
  "husky": {
    "hooks": {
      "commit-msg": "validate-commit-msg"
    }
  },
```

#### [Change log生成](https://www.npmjs.com/package/conventional-changelog-cli)


```
# 全局安装conventional-changelog-cli
npm i conventional-changelog-cli -g

# 写入package.json的scripts字段
{
  "scripts": {
    "changelog": "conventional-changelog -p angular -i CHANGELOG.md -s"
  }
}

控制台显示自从上次发布以来的变动:conventional-changelog -p angular -i CHANGELOG.md -w
文件中添加自从上次发布以来的变动:conventional-changelog -p angular -i CHANGELOG.md -s
控制台生成所有发布的:conventional-changelog -p angular -i CHANGELOG.md -w -r 0
文件中添加生成所有发布的:conventional-changelog -p angular -i CHANGELOG.md -s -r 0
```
