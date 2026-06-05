/*
 * 默认配置（所有环境共用）
 * 会被 config.local / config.beta / config.prod 中的同名配置覆盖
 */
module.exports = () => ({
   name: 'this is default',
   // MySQL 数据库连接配置
   mysql: {
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: 'root',
      database: 'bkw_micro',
   },
})