module.exports = (app) => {
   const BaseService = require('./base-service')(app)
   const modelList = require('../../model/index.js')(app)

   return class DslService extends BaseService {
      getDsl(ctx) {
         return modelList
      }

      getDslProject(ctx) {
         const data = ctx.request.body;
         const { modelkey, projectKey } = data
         const res = modelList.find((m, idx) => m.key === modelkey)
         const project = res.project || {}

         return  project[projectKey] || {}
      }
   }
}