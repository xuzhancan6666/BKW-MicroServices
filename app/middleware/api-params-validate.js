const { ZodError } = require('zod');
const { z } = require('zod');
module.exports = (app) => {
  return async (ctx, next) => {
    // 为 ctx 添加验证方法
    ctx.validate = function(schema, data, options = {}) {
      try {
        app.logger.info('--[validate schema]--data:', data, schema.parse(data))
        console.log('data', ctx.request, data)
        return schema.parse(data);
      } catch (error) {
         const err = new Error('参数验证失败');
         err.status = 442;
         err.message = '参数验证失败';
         err.details = error;
         throw err;
      }
    };

    // 添加快捷验证方法
    ctx.validateBody = function(schema) {
      return ctx.validate(schema, ctx.request.body);
    };

    ctx.validateQuery = function(schema) {
      console.log('--[validateQuery schema]--query:', ctx.query)
      return ctx.validate(schema, ctx.query);
    };

    ctx.validateParams = function(schema) {
      return ctx.validate(schema, ctx.params);
    };

    const { method: method, url: url } = ctx.request
    const schema = app.routerSchema;
    const currentSchemaList = schema[url] ? schema[url][method.toLowerCase()] : []

    if(Array.isArray(currentSchemaList) && currentSchemaList.length > 0) {
      for(let i = 0; i < currentSchemaList.length; i++) {
         const item = currentSchemaList[i]
         const schema = z.object(item.schema)

         switch(item.type) {
            case 'data':
               ctx.validateBody(schema)
               break
            case 'query':
               ctx.validateQuery(schema)
               break
            case 'params':
               ctx.validateParams(schema)
               break
         }
      }
   };

   await next();
  }
}
