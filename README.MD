# hym-react-cli
![version](https://img.shields.io/badge/version-2.0.0-green)

# 说明

    基于create-react-app的React + Ts + Stylus + Cesium + dll集成脚手架, 可根据个人需要一键配置可选模板
    优点: 一键配置可选模板，自动安装依赖，生成文件夹目录

# 使用

    npm i -g hym-react-cli

    npx create-hym-react <projectName> --template <template>

```javascript
<projectName> 项目名称
<template> 可选模板, <template>内填入使用的模板, 以逗号隔开, 如果不填默认为不配置模板。可选值: ts,cesium,stylus,dll,all。all为配置所有模板

事例: create-hym-react demo --template ts,stylus
```

## 扩展webpack

```javascript
/*
    node

    react-app-rewired 对webpack配置进行扩展。
                      用法: 在根目录新建 config-overrides.js文件, 然后配置npm命令，详情见package.json。
*/
$ npm i react-app-rewired customize-cra -D

/*
    config-overrides.js
*/
module.exports = function override(...args)
// args[i] = function (config, env) { return config }
// config: react输出的webpack配置对象
// env: 模式

/*
    如果不希望配置文件在根目录并且自定义文件名称，可以在package.json增加如下配置：

    package.json
*/
"config-overrides-path": path // path为你定义的路径，如： './目录/文件名'
```
## 配置dll

在使用的库过多或过大时我们需要配置dll对一些库单独打包以优化构建速度，所以在该模板中配置了dll。

```typescript
$ npm i webpack-cli add-asset-html-webpack-plugin -D
```

```typescript
/*
    dll的基本配置可以在以下文件中找到：
        ./scripts/dll.js    development配置
        ./scripts/dll_bundle.js     production配置
        ./scripts/overrides.js -> dllConfig     引入配置
*/
/*
    用法：
        1. 在dll.js和dll_bundle.js的vendor添加需要单独打包的库
        2. 执行一次npm run dll 和 npm run dll:build
*/
```

## 配置Cesium

./scripts/overrides.js -> cesiumConfig 已经包含了Cesium配置，下面只说明Cesium的静态资源配置：

```typescript
$ npm i cesium -S
$ npm i copy-webpack-plugin -D
```

```typescript
import { Ion } from 'cesium'

// 为当前项目配置Cesium静态资源的根路径
window.CESIUM_BASE_URL = process!.env!.NODE_ENV === 'development' ? devPath : prodPath
// 设置令牌
Ion.defaultAccessToken = xxx
```
