const path = require('path')

module.exports = (app) => {
   // 配置静态文件目录
   const koaStatic = require('koa-static')
   app.use(koaStatic(path.resolve(process.cwd(), './app/public')))

   // 使用nunjuck模版渲染
   // nunjucks 会给 ctx 上下文 进行改造。添加一个 redner
   const koaNunjucks = require('koa-nunjucks-2')
   app.use(koaNunjucks({
      ext: 'html',
      path: path.resolve(process.cwd(), './app/public'),
      nunjucksConfig: {
         noCache: true,
         trimBlocks: true
      }
   }))

   // 引入 ctx.request.body 参数解析中间件
   const bodyParser = require('koa-bodyparser')
   app.use(bodyParser({
      formList: '1000mb',
      enableTypes: ['form', 'json', 'text']
   }))

   // 异常捕获中间件
   app.use(app.$middleware.errorHandler)

   // 签名校验中间件
   app.use(app.$middleware.apiSignVerify)

   // // 参数类型校验
   app.use(app.$middleware.apiParamsVerify)

}