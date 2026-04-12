module.exports = (app) => {
   const BaseController = require('./base')(app)

   return class ProjectController extends BaseController {
      async getList(ctx) {
         const { dslService } = app.service
         const res = dslService.getDsl(ctx)

         this.success(ctx, res, {})
      }

      async getProject(ctx) {
         const { dslService } = app.service
         const res = dslService.getDslProject(ctx)

         this.success(ctx, res, {})
      }
   }
}