/*
API 合法性教研
*/
const md5 = require('md5');

module.exports = (app) => {
   return async(ctx, next) => {
      // 只对api请求进行校验 API
      if(ctx.path.indexOf('/api') < 0) {
         return await next()
      }
      // api 请求签名校验
      const {path, method} = ctx
      const {headers} = ctx.request
      // sSign : 签名
      // s_t: 时间
      const {s_sign: sSign, s_t: st} = headers;
      // 密钥 前后端共有 (对称加密)
      const signKey = 'locking';
      // 加密 密钥+时间
      const signature = md5(`${signKey}_${st}`)
      app.logger.info(`${method}-${path} signature: ${signature}`, sSign)

      // 用户有签名。 用户有传输时间。
      // 用户签名 和 上面生成的 signature 相等
      // 并且 时效需要在 600s 内
      if(!sSign || !st || signature !== sSign.toLowerCase() || Date.now() - st > 600 * 1000) {
         ctx.status = 200
         ctx.body = {
            success: false,
            message: 'signature noe correct! or api timeout',
            code: 445
         }
         return
      }

      await next()
   }
}