/**
 * 响应格式化中间件
 * 统一API响应格式
 */

module.exports = (app) => {
  return async (ctx, next) => {
    try {
      await next();

      // 如果已经有响应体且不是对象，不处理
      if (ctx.body === undefined || ctx.body === null) {
        ctx.body = {
          success: true,
          message: 'Success',
          data: null
        };
        return;
      }

      // 如果已经是标准格式，不处理
      if (ctx.body && typeof ctx.body === 'object' && 'success' in ctx.body) {
        return;
      }

      // 格式化响应
      ctx.body = {
        success: true,
        message: 'Success',
        data: ctx.body,
        timestamp: new Date().toISOString()
      };

    } catch (error) {
      // 错误处理
      console.error('❌ 应用错误:', error);

      ctx.status = error.status || 500;
      ctx.body = {
        success: false,
        message: process.env.NODE_ENV === 'production' ? 'Internal Server Error' : error.message,
        ...(process.env.NODE_ENV !== 'production' && { stack: error.stack })
      };
    }
  };
};