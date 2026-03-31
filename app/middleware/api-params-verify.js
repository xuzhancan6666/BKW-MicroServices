const { ZodError } = require('zod');

module.exports = (app) => {
  return async (ctx, next) => {
    // 为 ctx 添加验证方法
    ctx.validate = function(schema, data, options = {}) {
      try {
        app.logger.info('--[validate schema]--data:', data)
        return schema.parse(data);
      } catch (error) {
        if (error instanceof ZodError) {
          ctx.status = 400;
          ctx.body = {
            success: false,
            message: '参数验证失败',
            error: error
          };
          return null;
        }
        throw error;
      }
    };

    // 添加快捷验证方法
    ctx.validateBody = function(schema) {
      return ctx.validate(schema, ctx.request.body);
    };

    ctx.validateQuery = function(schema) {
      return ctx.validate(schema, ctx.query);
    };

    ctx.validateParams = function(schema) {
      return ctx.validate(schema, ctx.params);
    };

    await next();
  };
};
