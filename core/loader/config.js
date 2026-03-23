/**
 * config loader
 * @param app Koa实例
 * 区分 开发/测试/生产
 * 通过 env 环境 读取不同的 env.config
 * 通过 env.config 覆盖  defualt.config 最后加载到 app.config
 *
 * 目录；config
 * 默认：config/config.default.config
 * 开发：config/config.local.config
 * 测试：config/config.beta.config
 * 生产：config/config.prod.config
 */
const path = require('path')
module.exports = (app) => {
   // 找到 config.defualt.js 目录
   const filePath = path.resolve(app.basicDir, 'config')
   let defaultConfig = {}

   try {
      defaultConfig = require(path.join(filePath, 'config.default.js'))()
   } catch (error) {
      console.error('exceptions..there is no config.default.js.......')
   }

   // 判断 app.env 初始化 选择取不同的 config.{环境}.config
   let envConfig = {}
   try {
      if(app.env.isLocal()) {
         envConfig = require(path.join(filePath, 'config.local.js'))
      } else if (app.env.isBeta()) {
         envConfig = require(path.join(filePath, 'config.beta.js'))
      } else if (app.env.isPro()) {
         envConfig = require(path.join(filePath, 'config.prod.js'))
      }
   } catch (error) {
      console.error('exceptions..there is no config.env.js.......', app.env.isLocal())
   }

   app.config = Object.assign({}, defaultConfig, envConfig)
}