/**
 * 页面内容管理 - 控制器
 * 处理 HTTP 请求/响应，调用 Service 层完成业务逻辑
 */
module.exports = (app) => {
  const BaseController = require('./base')(app)
  const { pageService } = app.service

  return class PageController extends BaseController {
    /**
     * GET /api/page/content
     * 分页查询页面列表
     */
    async list(ctx) {
      const params = {
        page:        ctx.query.page,
        size:        ctx.query.size,
        project_key: ctx.query.project_key,
        type:        ctx.query.type,
        ids:         ctx.query.ids,
      }

      const { list, total } = await pageService.getList(params)

      this.success(ctx, list, { total })
    }

    /**
     * GET /api/page/content/:id
     * 获取单条页面完整信息（含 content_json / content_html）
     */
    async detail(ctx) {
      const id = parseInt(ctx.params.id, 10)
      if (!id) {
        this.fail(ctx, '参数异常：id 必须为数字', 442)
        return
      }

      const page = await pageService.getById(id)
      if (!page) {
        this.fail(ctx, '页面不存在', 445)
        return
      }

      this.success(ctx, page)
    }

    /**
     * POST /api/page/content
     * 新建页面
     * Body: { title, description?, locale?, project_key?, content_json?, content_html?, status? }
     */
    async create(ctx) {
      const { title } = ctx.request.body
      if (!title) {
        this.fail(ctx, '参数异常：title 不能为空', 442)
        return
      }

      const id = await pageService.create(ctx.request.body)
      const page = await pageService.getById(id)

      this.success(ctx, page)
    }

    /**
     * PUT /api/page/content/:id
     * 更新页面内容
     * Body: { title?, description?, content_json?, content_html?, locale?, status? }
     */
    async update(ctx) {
      const id = parseInt(ctx.params.id, 10)
      if (!id) {
        this.fail(ctx, '参数异常：id 必须为数字', 442)
        return
      }

      // 检查页面是否存在
      const exist = await pageService.getById(id)
      if (!exist) {
        this.fail(ctx, '页面不存在', 445)
        return
      }

      await pageService.update(id, ctx.request.body)
      const page = await pageService.getById(id)

      this.success(ctx, page)
    }

    /**
     * DELETE /api/page/content?id=xxx
     * 删除页面
     */
    async delete(ctx) {
      const id = parseInt(ctx.query.id, 10)
      if (!id) {
        this.fail(ctx, '参数异常：id 不能为空', 442)
        return
      }

      // 检查页面是否存在
      const exist = await pageService.getById(id)
      if (!exist) {
        this.fail(ctx, '页面不存在', 445)
        return
      }

      await pageService.delete(id)

      this.success(ctx, null)
    }

    /**
     * POST /api/page/content/:id/sync
     * 将组件更新同步到所有引用它的页面
     */
    async sync(ctx) {
      const id = parseInt(ctx.params.id, 10)
      if (!id) {
        this.fail(ctx, '参数异常：id 必须为数字', 442)
        return
      }

      const component = await pageService.getById(id)
      if (!component) {
        this.fail(ctx, '组件不存在', 445)
        return
      }
      if (component.type !== 'component') {
        this.fail(ctx, '只有组件类型可以执行同步操作', 442)
        return
      }

      const updatedPages = await pageService.syncComponentToPages(
        id,
        component.content_html || ''
      )

      this.success(ctx, { updatedPages })
    }
  }
}
