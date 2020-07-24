# webpackdemo版本分支
* master
* br1.0 基础多页面配置基本完成，分离打包dll
* br1.0.1 基础多页面配置基本完成，HardSourceWebpackPlugin替换dll
* br1.1 配置基本完善
* br1.2 webpack 打包组件和基础库
* br1.3 ssr

## eslint配置：四步
* 第一步：安装包
[eslint](https://www.npmjs.com/package/eslint-config-airbnb)
```
# 此处以react项目为例
npm i babel-eslint eslint-loader -D
npm i eslint eslint-plugin-import eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-jsx-a11y -D
npm i eslint-config-airbnb -D
```
* 第二步：添加.eslintrc.json文件
```
{
  "parser": "babel-eslint",
  "extends": "airbnb",
  "env": {
    "browser": true,
    "node": true
  },
  "rules": {
    "jsx-a11y/click-events-have-key-events": 0,
    "jsx-a11y/no-noninteractive-element-interactions": 0,
    "jsx-a11y/interactive-supports-focus": 0,
    "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
    "react/jsx-one-expression-per-line": "off",
    "react/jsx-closing-tag-location": 0,
    "import/no-unresolved": [
      2,
      {
          "ignore": ["@src","@component","@asset"] // @ 是设置的路径别名
      }
    ]
   }
}
```
* 第三步：添加配置文件.editorconfig
```
# http://editorconfig.org 官网
# .editorconfig 是否生效
root = true

[*]
#缩进风格：空格
indent_style = space
#缩进大小2
indent_size = 2
#换行符lf
end_of_line = lf
#字符集utf-8
charset = utf-8
#是否删除行尾的空格
trim_trailing_whitespace = true
#是否在文件的最后插入一个空行
insert_final_newline = true

[*.md]
trim_trailing_whitespace = false

[Makefile]
indent_style = tab

```

* 第四步：安装vscode插件：EditorConfig for VS Code

### HardSourceWebpackPlugin 替换dll
```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');
new HardSourceWebpackPlugin(),

```
