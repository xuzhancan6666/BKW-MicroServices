/**
 * 页面内容管理 - 路由
 * 提供 RESTful API：列表 / 详情 / 新建 / 更新 / 删除
 */
module.exports = (app, router) => {
  const { page } = app.controller

  // 页面列表（分页）—— schema-table 组件拼接 /list
  router.get('/api/page/content/list',     page.list.bind(page))
  // 单条页面详情
  router.get('/api/page/content/:id',      page.detail.bind(page))
  // 新建页面
  router.post('/api/page/content',         page.create.bind(page))
  // 更新页面
  router.put('/api/page/content/:id',      page.update.bind(page))
  // 删除页面 —— table-panel 拼接 /list
  router.delete('/api/page/content/list',  page.delete.bind(page))
  // 组件同步 —— 将组件更新推送到引用它的页面
  router.post('/api/page/content/:id/sync', page.sync.bind(page))
}
