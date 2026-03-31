
const { z } = require('zod');

module.exports = (app) => {
   const BaseController = require('./base')(app)

   return class PorjectController extends BaseController {
      async getList(ctx) {
         const {project: projectService} = this.service
         const res = projectService.getList()
         this.success(ctx, res, {})
      }

      async getListByPost(ctx) {
         const {project: projectService} = this.service
         // 用zod 生成 schema
         const listSchema = z.object({
            page: z.number(),
            pagenum: z.number()
         })
         // 通过我们中间件。给ctx挂载的vildateMethod 进行 ctx 的数据校验
         const validate = ctx.validateBody(listSchema, ctx)
         if(!validate) {
            return
         }
         const res = projectService.getList()
         this.success(ctx, res, {})
      }
   }
}