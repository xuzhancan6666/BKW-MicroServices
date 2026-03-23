const Koa = require('koa')
const path = require('path')
const {sep} = path
const env = require('./env')
module.exports = {
   // 个人配置挂载到 options 上。 options给到我们app
   start(options = {}) {
      const app = new Koa()

      app.options = options
      // 基础路径
      app.basicDir = process.cwd()
      // 业务路径。sep用于不同系统的转译 --> /
      app.businessPath = path.resolve(options.basicDir, `${sep}app`)

      // 初始化当前环境
      app.env = env()

      // 添加一个简单的路由处理
      app.use(async (ctx) => {
         ctx.body = 'Hello World! Koa server is running.'
      })

      try {
         const port = process.env.PORT || 3000
         const host = process.env.IP || 'localhost'

         app.listen(port, host, () => {
            console.log(`Server running at http://${host}:${port}`)
         })
      } catch (error) {
         console.error('Failed to start server:', error)
      }
   }
}

