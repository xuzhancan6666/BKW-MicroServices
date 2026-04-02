const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

// 基础配置
const baseConfig = require('./webpack.base.js');

// devServer 配置
const DEV_SERVER_CONFIG = {
    HOST: '127.0.0.1',
    PORT: 9002,
    HMR_PATH: '/__webpack_hmr', // 官方规定
    TIMEOUT: 20000
};
console.log('baseConfig.entry)....', baseConfig.entry)
// 开发阶段的 entry 配置需要加入 hmr
Object.keys(baseConfig.entry).forEach(v => {
    // 第三方包不作为 hmr 入口
    if (v !== 'vendor') {
        baseConfig.entry[v] = [
            // 主入口文件
            baseConfig.entry[v],
            // 为项目的入口文件注入热更新（HMR）客户端，从而实现代码修改后浏览器自动刷新或局部更新，而无需手动刷新页面
            // 配置我们的服务地址。获取更新内容
            // 告诉 HMR 客户端：“去这个特定的 __webpack_hmr 路径建立长连接，并且超时时间是 20秒”。
            // 浏览器会请求（EventSource/WebSocket）：http://127.0.0.1:9002/__webpack_hmr。
            `webpack-hot-middleware/client?path=http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}${DEV_SERVER_CONFIG.HMR_PATH}&timeout=${DEV_SERVER_CONFIG.TIMEOUT}`
        ]
    }
});

// 生产环境 webpack 配置
const webpackConfig = merge.smart(baseConfig, {
    // 指定开发环境模式
    mode: 'development',
    // 开发阶段 output 配置
    output: {
      // 打包出来文件名
      filename: 'js/[name]_[chunkhash:8].bundle.js',
      // 存放地址
      path: path.join(process.cwd(), './app/public/dist/dev'),
      // development的服务地址 + development的 打包存放地址。
      publicPath: `http://${DEV_SERVER_CONFIG.HOST}:${DEV_SERVER_CONFIG.PORT}/public/dist/dev`,
      globalObject: 'this',
      clean: true // 自动清理输出目录
   },

   plugins: [
      // 热更新替换 插件。
      // 模块热替换允许在应用程序运行时模块替换
      // 能让程序一直保持运行状态
      new webpack.HotModuleReplacementPlugin({
         mutiStep: false
      })
   ]
});

module.exports = {
   // webpakc 配置文件
   webpackConfig,
   // HMR配置文件
   DEV_SERVER_CONFIG
}