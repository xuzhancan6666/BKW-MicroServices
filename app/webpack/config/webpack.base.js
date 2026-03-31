/*
    webpack基础配置
*/
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
   // 入口配置
   entry: {
      'entry.page1': './app/pages/page1/entry.page1.js',
      'entry.page2': './app/pages/page2/entry.page2.js',
   },
   // 模块解析. 更具文件类型匹配loader
   module: {
      rules: [{
         test: /\.vue$/,
         use: {
            loader: 'vue-loader'
         }
      },{
         test: /\.js$/,
         include:[
            // 只对业务代码进行babel。加速打包
            path.resolve(process.cwd(), './app/pages')
         ],
         use: {
            loader: 'babel-loader'
         }
      },{
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
          {
            loader: 'url-loader',          // 推荐使用 url-loader，它内部集成了 file-loader
            options: {
              limit: 8 * 1024,              // 小于 8KB 转为 Base64
              name: 'images/[name].[hash].[ext]', // 输出文件名格式
              outputPath: 'assets',         // 输出目录（相对于 output.path）
            },
          },
        ],
      },{
         test: /\.less$/,
         use: ['less-loader', 'style-loader', 'css-loader']
      },
      {
         test: /\.css$/,
         use: ['style-loader', 'css-loader']
      }]
   },
   // 输出目标位置
   output: {
      filename: 'js/[name]_[chunkhash:8].bundle.js',
      path: path.join(process.cwd(), './app/public/dist/prod'),
      publicPath: '/dist/prod',
      crossOriginLoading: 'anonymous'
   },
   // 配置模块解析的具体行文。定义webpack 在打包时。如何找到并解析具体模块路径
   // alias用于我们开发便捷性。通过import xxx from. $page/xxx/xxx
   resolve: {
      extensions: ['.js', '.vue', '.less', '.css'],
      alias: {
         $pages: path.resolve(process.cwd(), './app/pages')
      }
   },
   // 配置 webpacl 优化插件
   plugins: [
      // 处理 .vue 文件，这个插件是必须的
      // 它的功能是将你定义过的其他规则复制并应用到 .vue 文件里。
      // 例如，如果有一张匹配规则 /\.js$/ 的规则，那么它会应用到 .vue 文件中的 <script> 模块中 或者 <style>
      new VueLoaderPlugin(),
      // 把第三方库暴露到 window context 下
      // 它会自动在该模块的顶部添加 import Vue from 'vue'（或 require('vue')）
      new webpack.ProvidePlugin({
         Vue: 'vue'
      }),
      // 定义全局常量
      new webpack.DefinePlugin({
         __VUE_OPTIONS_API__: 'true', // 支持 vue 解析 optionsApi
         __VUE_PROD_DEVTOOLS__: 'false', // 禁用 Vue 调试工具
         __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: 'false' // 禁用生产环境显示 "水合" 信息
      }),
      // 构造最终渲染的 模版 页面
      // 它的目标是根据指定的模板文件生成一个最终可用的模板文件（entry.page1.tpl），
      // 并自动注入 webpack 打包后的静态资源（如 JS、CSS 等）
      new HtmlWebpackPlugin({
         // 产物 （最终模版）：设置输出路径
         filename: path.resolve(process.cwd(), './app/public/dist/', 'entry.page1.tpl'),
         // 指定需要 使用的模版。
         template: path.resolve(process.cwd(), './app/view/entry.tpl'),
         chunks: ['entry.page1']
      }),
       new HtmlWebpackPlugin({
         // 产物 （最终模版）：输出路径
         filename: path.resolve(process.cwd(), './app/public/dist/', 'entry.page2.tpl'),
         template: path.resolve(process.cwd(), './app/view/entry.tpl'),
         chunks: ['entry.page2']
      })
   ],
   // 配置打包输出优化 （代码分割，模块合并，缓存，treeShaking，压缩优化等策略）
   optimization: {}
}