
const { z } = require('zod');
module.exports = (app, router) => {
   const { project: projectController } = app.controller
   // const { apiParamsVerify } = app.$middleware
   // // 用户输入 http://ip:port/view/xxx 请求到我们的 service

   // // 定义具体的 Schema
   // const pageSchema = z.object({
   //    body: z.object({
   //       page: z.string(),
   //       pagenum: z.string()
   //    })
   // });
   router.get('/api/project/list', projectController.getList.bind(projectController))
   router.post('/api/post/project/list', projectController.getListByPost.bind(projectController))
}