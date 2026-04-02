const express = require('express')
const path = require('path')
const webpack = require('webpack')
// devmiddelware 检测更新模块
const devMiddlleware = require('webpack-dev-middleware')
// 热更新进行 变更模块 替换
const hotMiddlleware = require('webpack-hot-middleware')
const {webpackConfig, DEV_SERVER_CONFIG} = require('./config/webpack.dev.js')
console.log('DEV_SERVER_CONFIG.....', DEV_SERVER_CONFIG)
/*
   在这里核心思路： 通过 express.use devMiddlleware + hotMiddlleware 注册我们的中间件。
   devMiddlleware 检测更新模块检测更新模块 --> 文件变化 --> 编译出来 js。css。tpl
      1. 落地我们的 tpl。 供 BFF 层访问页面
      2. js.css 编译存内存中
   hotMiddlleware 热更新进行变更模块替换 --> 发现内存对应文件变化。
      1. 文件变换。通过注入内容刷新。 获取新的编译内容
*/

const app = express()

const compiler = webpack(webpackConfig)
// 指定静态文件目录
app.use(express.static(path.join(__dirname, '../public/dist/')))

// 应用 devMiddelware 中间件 监控文件改动
app.use(devMiddlleware(compiler, {
   // 配置 落地物理文件
   writeToDisk: (filePath) => filePath.endsWith('.tpl'),
   // 资源路径 需要去查找我们的静态资源
   publicPath: webpackConfig.output.publicPath,
   // headers:
   headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization'
   },
   stats: {
      color: true
   }
}))

// 应用hotmiddelware 中间件 实现热更新通讯
app.use(hotMiddlleware(compiler, {
   // 热更新注入 内容地址
   path: `${DEV_SERVER_CONFIG.HMR_PATH}`,
   log: () => {}
}))

console.log('[webpack dev.... 构建.... ]')
// 使用express来启动开发模式的 服务
console.log('[dev server].....')
app.listen(DEV_SERVER_CONFIG.PORT, () => {
   console.log(`Server running at http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}`)
})