/*
 * 本地开发环境配置
 * 覆盖 config.default.js 中的同名配置
 */
module.exports = {
   name: 'this is Local',
   // MySQL 连接配置（本地开发）
   mysql: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'bkw_micro',
   },
}