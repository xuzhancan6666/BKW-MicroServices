module.exports = (app) => {
   const BaseController = require('./base.js')(app)

   return class DslController extends BaseController {
      async getDsl(ctx) {
         const { dslService } = app.service
         const res = dslService.getDsl(ctx)

         this.success(ctx, res, {})
      }
   }
}