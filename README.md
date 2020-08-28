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
