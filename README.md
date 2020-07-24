# webpackdemo版本
v1.0 基础多页面配置基本完成，分离打包
v1.0.1 source-webpack-plugin替换dll

### v1.0
* ddl配置
### v1.0.1
* source-webpack-plugin替换dll


### [DLL发展过程](https://juejin.im/post/5d8aac8fe51d4578477a6699)
>DLL发展过程：DLL 手动配置->AutoDllPlugin->hard-source-webpack-plugin

```
npm run build
dll时间：2365ms
hard-source-webpack-plugin：首次4025ms,第二次400ms

npm run start
splitChunks:2242s

hard-source-webpack-plugin：首次2232ms,第二次923ms

```
### 


