/**
 * 页面内容管理 - 服务层
 * 封装 page_content 表的数据库操作，供 Controller 调用
 *
 * 注意：extendLoader 在 serviceLoader 之后执行，
 *      构造函数中无法取到 app.db，因此用 getter 延迟获取
 */
module.exports = (app) => {
  const BaseService = require('./base-service')(app)

  return class PageService extends BaseService {
    constructor() {
      super()
      this.tableName = 'page_content'
    }

    /** Knex 实例——由 extend/db.js 初始化，通过 getter 延迟获取 */
    get db() {
      return this.app.db
    }

    /**
     * 分页查询页面列表
     * @param {Object} params - 查询参数
     * @param {number} params.page  - 页码（从 1 开始）
     * @param {number} params.size  - 每页条数
     * @param {string} params.project_key - 项目过滤（可选）
     * @param {string} params.type - 类型过滤: page|component（可选）
     * @returns {{ list: Array, total: number }}
     */
    async getList(params = {}) {
      const page = Math.max(parseInt(params.page, 10) || 1, 1)
      const size = Math.max(parseInt(params.size, 10) || 10, 1)
      const offset = (page - 1) * size

      const query = this.db(this.tableName)
      if (params.project_key) {
        query.where('project_key', params.project_key)
      }
      if (params.type) {
        query.where('type', params.type)
      }

      const [{ total }] = await query.clone().count('* as total')
      const list = await query.clone()
        .select('id', 'title', 'description', 'content_html', 'locale', 'version', 'status', 'mode', 'type', 'created_at', 'updated_at')
        .orderBy('updated_at', 'desc')
        .limit(size)
        .offset(offset)

      return { list, total }
    }

    /**
     * 根据 ID 获取单条页面详情（含完整 content_json / content_html）
     * @param {number} id
     * @returns {Object|null}
     */
    async getById(id) {
      const [row] = await this.db(this.tableName)
        .where('id', id)
        .select('*')

      return row || null
    }

    /**
     * 新建页面
     * @param {Object} data
     * @returns {number} 新记录的自增 ID
     */
    async create(data) {
      const now = new Date()
      const [id] = await this.db(this.tableName).insert({
        project_key: data.project_key || '',
        title:        data.title,
        description:  data.description || '',
        content_json: data.content_json || null,
        content_html: data.content_html || null,
        locale:       data.locale || 'zh_CN',
        version:      1,
        status:       data.status || 0,
        mode:         data.mode || 0,
        type:         data.type || 'page',
        created_at:   now,
        updated_at:   now,
      })

      return id
    }

    /**
     * 更新页面内容
     * @param {number} id
     * @param {Object} data - 要更新的字段
     * @returns {number} 受影响的行数
     */
    async update(id, data) {
      const updateData = { updated_at: new Date() }

      if (data.title !== undefined)       updateData.title = data.title
      if (data.description !== undefined) updateData.description = data.description
      if (data.content_json !== undefined) updateData.content_json = data.content_json
      if (data.content_html !== undefined) updateData.content_html = data.content_html
      if (data.locale !== undefined)      updateData.locale = data.locale
      if (data.status !== undefined)      updateData.status = data.status
      if (data.mode !== undefined)        updateData.mode = data.mode
      if (data.type !== undefined)        updateData.type = data.type

      // 内容变更时版本号 +1
      if (data.content_json !== undefined || data.content_html !== undefined) {
        updateData.version = this.db.raw('version + 1')
      }

      return this.db(this.tableName).where('id', id).update(updateData)
    }

    /**
     * 删除页面
     * @param {number} id
     * @returns {number} 受影响的行数
     */
    async delete(id) {
      return this.db(this.tableName).where('id', id).del()
    }

    /* ========== 组件同步 ========== */

    /**
     * 查找所有引用了指定组件的页面
     * @param {number} componentId
     * @returns {Promise<Array<{id: number, content_json: object}>>}
     */
    async findReferencingPages(componentId) {
      const rows = await this.db(this.tableName)
        .where('type', 'page')
        .whereNotNull('content_json')
        .select('id', 'content_json')

      const result = []
      for (const row of rows) {
        if (!row.content_json) continue
        try {
          const parsed = JSON.parse(row.content_json)
          if (this._hasComponentInstance(parsed, componentId)) {
            result.push({ id: row.id, content_json: parsed })
          }
        } catch {
          continue
        }
      }
      return result
    }

    /**
     * 递归检查 project JSON 中是否包含指定 component 的引用
     */
    _hasComponentInstance(node, componentId) {
      if (!node || typeof node !== 'object') return false

      if (node.attributes) {
        const cid = node.attributes['data-component-id']
        if (cid !== undefined && String(cid) === String(componentId)) return true
      }

      if (Array.isArray(node.components)) {
        return node.components.some(child => this._hasComponentInstance(child, componentId))
      }
      return false
    }

    /**
     * 将组件的最新内容同步到所有引用它的页面
     * 更新 content_json 中对应 component-instance 节点的子组件内容，重置 status=0
     * @param {number} componentId
     * @param {string} newContentHtml - 组件最新的 content_html
     * @returns {Promise<number>} 更新的页面数
     */
    async syncComponentToPages(componentId, newContentHtml) {
      const pages = await this.findReferencingPages(componentId)
      let count = 0

      for (const page of pages) {
        this._updateComponentInstances(page.content_json, componentId, newContentHtml)
        const updatedJson = JSON.stringify(page.content_json)

        await this.db(this.tableName)
          .where('id', page.id)
          .update({
            content_json: updatedJson,
            status: 0,
            updated_at: new Date(),
          })
        count++
      }
      return count
    }

    /**
     * 递归更新 project JSON 中所有指定 component 的实例内容
     * 策略：保留 component-instance 外壳，替换其 components 子节点为新的 HTML 文本节点
     */
    _updateComponentInstances(node, componentId, newHtml) {
      if (!node || typeof node !== 'object') return

      if (node.type === 'component-instance') {
        const cid = node.attributes && node.attributes['data-component-id']
        if (cid !== undefined && String(cid) === String(componentId)) {
          // 替换子组件为新的 HTML 内容（用 text node 避免被解析为子组件）
          node.components = [
            { type: 'text', content: newHtml },
          ]
        }
        // component-instance 内部不会有嵌套的 component-instance，不再递归
        return
      }

      if (Array.isArray(node.components)) {
        node.components.forEach(child =>
          this._updateComponentInstances(child, componentId, newHtml))
      }
    }
  }
}
