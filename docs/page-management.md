# 页面内容管理模块

## 功能概述

页面内容管理模块用于管理 GrapesJS 编辑器产出的页面数据。支持页面的增删改查，存储编辑器的项目 JSON（用于恢复编辑）和渲染后的 HTML（用于最终展示）。

## 数据表结构

### page_content

| 字段 | 类型 | 说明 |
|------|------|------|
| id | INT PK AUTO_INCREMENT | 主键 |
| project_key | VARCHAR(64) | 所属项目标识（如 taobao），预留多项目过滤 |
| ref_type | VARCHAR(32) | 关联业务类型（activity / product），预留 |
| ref_id | INT | 关联业务 ID，预留 |
| title | VARCHAR(255) | 页面标题 |
| description | VARCHAR(500) | 页面描述 / 备注 |
| content_json | LONGTEXT | GrapesJS 项目 JSON（用于恢复编辑） |
| content_html | LONGTEXT | 渲染后的 HTML 片段（用于最终展示） |
| locale | VARCHAR(16) | 语言版本（zh_CN / zh_HK / en_US） |
| version | INT | 版本号，每次保存 +1 |
| status | TINYINT | 状态：0=草稿 1=已发布 |
| created_at | DATETIME | 创建时间 |
| updated_at | DATETIME | 更新时间 |

## API 接口

| 方法 | 路径 | 说明 |
|------|------|------|
| GET | `/api/page/content/list` | 分页列表（schema-table 组件调用） |
| GET | `/api/page/content/:id` | 单条详情 |
| POST | `/api/page/content` | 新建页面 |
| PUT | `/api/page/content/:id` | 更新页面 |
| DELETE | `/api/page/content/list?id=xxx` | 删除页面 |

## 请求 / 响应示例

### 列表

```
GET /api/page/content/list?page=1&size=10
```

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "落地页",
      "description": "",
      "locale": "zh_CN",
      "version": 3,
      "status": 1,
      "created_at": "2026-06-02T12:00:00.000Z",
      "updated_at": "2026-06-02T14:00:00.000Z"
    }
  ],
  "metadata": { "total": 1 }
}
```

### 新建

```
POST /api/page/content
Content-Type: application/json

{ "title": "新页面", "description": "描述", "locale": "zh_CN" }
```

### 更新（保存 GrapesJS 内容）

```
PUT /api/page/content/1
Content-Type: application/json

{
  "title": "落地页",
  "content_json": "{ \"pages\": [...], \"styles\": [...] }",
  "content_html": "<div>...</div>"
}
```

> `content_json` 存 `editor.getProjectData()` 的 JSON.stringify 结果，用于下次打开编辑器时恢复。  
> `content_html` 存 `editor.getHtml()` 的内联样式版本，用于最终渲染展示。  
> 每次更新 `content_json` 或 `content_html`，`version` 自动 +1。

## 文件说明

| 文件 | 作用 |
|------|------|
| [sql/init.sql](../sql/init.sql) | 建表 SQL |
| [config/config.default.js](../config/config.default.js) | 默认 MySQL 配置 |
| [config/config.local.js](../config/config.local.js) | 本地 MySQL 配置 |
| [app/extend/db.js](../app/extend/db.js) | Knex 连接池初始化 |
| [app/service/page-service.js](../app/service/page-service.js) | 数据库操作封装 |
| [app/controller/page.js](../app/controller/page.js) | 请求处理 |
| [app/router/page.js](../app/router/page.js) | 路由注册 |

## 使用步骤

1. 确认 MySQL 已安装运行
2. 执行建表脚本：
   ```bash
   mysql -u root -p < sql/init.sql
   ```
3. 根据需要修改 [config/config.local.js](../config/config.local.js) 中的 MySQL 连接信息
4. 启动项目，API 即可工作

## 与 GrapesJS 联动流程

```
page-builder.vue                 后端 API
     │                              │
     │  保存时：                      │
     ├─ editor.getProjectData() ────→ PUT /api/page/content/:id
     │   (JSON.stringify)           │  (content_json)
     │                              │
     ├─ editor.getHtml()           ──→ PUT /api/page/content/:id
     │   + inlineCss                │  (content_html)
     │                              │
     │  加载时：                      │
     └─ GET /api/page/content/:id ──→ editor.loadProjectData()
        (content_json)              │
```
