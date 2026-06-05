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

      const [{ total }] = await query.clone().count('* as total')
      const list = await query.clone()
        .select('id', 'title', 'description', 'locale', 'version', 'status', 'mode', 'created_at', 'updated_at')
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
  }
}
