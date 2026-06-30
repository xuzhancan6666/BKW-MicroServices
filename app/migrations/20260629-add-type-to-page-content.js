/**
 * 给 page_content 表新增 type 字段，区分"页面"和"组件"。
 * 运行方式：node app/migrations/20260629-add-type-to-page-content.js
 */
const path = require('path')
const root = path.resolve(process.cwd(), 'config')
const defaultCfg = require(path.resolve(root, 'config.default'))()
const localCfg = require(path.resolve(root, 'config.local'))
const merged = { ...defaultCfg, ...localCfg }

const knex = require('knex')({
  client: 'mysql',
  connection: merged.mysql,
})

;(async () => {
  const hasColumn = await knex.schema.hasColumn('page_content', 'type')
  if (hasColumn) {
    console.log('✅ type 列已存在，跳过迁移')
    process.exit(0)
  }

  await knex.schema.table('page_content', (t) => {
    t.string('type', 20).notNullable().defaultTo('page').comment('类型: page=页面, component=组件')
  })

  console.log('✅ 迁移完成：page_content.type 列已添加')
  process.exit(0)
})().catch((err) => {
  console.error('❌ 迁移失败:', err)
  process.exit(1)
})
