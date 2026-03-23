/**
 * JWT 认证中间件
 * 用于验证请求的JWT token
 */

const jwt = require('jsonwebtoken');

module.exports = (app) => {
  return async (ctx, next) => {
    // 排除不需要认证的路径
    const publicPaths = ['/api/auth/login', '/api/auth/register', '/health', '/'];

    if (publicPaths.includes(ctx.path)) {
      await next();
      return;
    }

    // 获取token
    const token = ctx.header.authorization?.replace('Bearer ', '');

    if (!token) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: '未提供认证token'
      };
      return;
    }

    try {
      // 验证token
      const secret = app.config?.get('jwt.secret') || 'default-secret';
      const decoded = jwt.verify(token, secret);

      // 将用户信息保存到ctx.state
      ctx.state.user = decoded;

      console.log(`🔐 用户认证成功: ${decoded.username || decoded.id}`);
      await next();

    } catch (error) {
      ctx.status = 401;
      ctx.body = {
        success: false,
        message: 'token无效或已过期'
      };
    }
  };
};