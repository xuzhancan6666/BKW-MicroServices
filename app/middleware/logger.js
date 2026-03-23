/**
 * 请求日志中间件
 * 记录每个请求的详细信息
 */

module.exports = (app) => {
  return async (ctx, next) => {
    const start = Date.now();
    const requestId = Math.random().toString(36).substr(2, 9);

    // 添加请求ID到响应头
    ctx.set('X-Request-ID', requestId);

    console.log(`🌐 [${new Date().toISOString()}] ${ctx.method} ${ctx.url} - ${requestId}`);

    try {
      await next();

      const duration = Date.now() - start;
      ctx.set('X-Response-Time', `${duration}ms`);

      console.log(`✅ [${new Date().toISOString()}] ${ctx.method} ${ctx.url} - ${ctx.status} - ${duration}ms - ${requestId}`);

    } catch (error) {
      const duration = Date.now() - start;
      console.error(`❌ [${new Date().toISOString()}] ${ctx.method} ${ctx.url} - ERROR - ${duration}ms - ${requestId}:`, error.message);
      throw error;
    }
  };
};