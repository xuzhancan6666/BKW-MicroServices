/**
 * 数据库连接模块
 * 基于 Knex 初始化 MySQL 连接池，挂载到 app.db 上
 *
 * 使用方式：
 *   const db = app.db
 *   const list = await db('page_content').select('*')
 */
const knex = require('knex')

module.exports = (app) => {
  // 从环境配置中读取 MySQL 连接参数
  const { mysql: config } = app.config

  // 创建 Knex 实例（连接池）
  const db = knex({
    client: 'mysql',
    connection: {
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      charset: 'utf8mb4',
    },
    pool: { min: 2, max: 10 },
  })

  console.log('✅ MySQL 连接池已初始化')

  return db
}
