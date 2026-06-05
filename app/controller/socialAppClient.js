module.exports = (app) => {
   const BaseController = require('./base')(app)
   const { socialAppClientService } = app.service

   return class SocialAppClientController extends BaseController{
      async getListByApp(ctx) {
         const res = socialAppClientService.getList()

         this.success(ctx, res, {total: res.length})
      }

      async deleteListByApp(ctx) {
         const { id } = ctx.query
         socialAppClientService.deleteList(id)
         const list = socialAppClientService.getList()

         this.success(ctx, list, {total: list.length})
      }
   }
}