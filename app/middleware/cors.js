/**
 * CORS 跨域中间件
 * 处理跨域请求
 */

module.exports = (app) => {
  return async (ctx, next) => {
    const allowedOrigins = app.config?.get('server.cors.origin') || ['http://localhost:8080'];
    const origin = ctx.header.origin;

    // 检查origin是否在允许列表中
    if (origin && allowedOrigins.includes(origin)) {
      ctx.set('Access-Control-Allow-Origin', origin);
    }

    // CORS预检请求
    if (ctx.method === 'OPTIONS') {
      ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
      ctx.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
      ctx.set('Access-Control-Max-Age', '86400'); // 24小时
      ctx.status = 204;
      return;
    }

    // 其他CORS头
    ctx.set('Access-Control-Allow-Credentials', 'true');
    ctx.set('Access-Control-Expose-Headers', 'X-Response-Time');

    await next();
  };
};