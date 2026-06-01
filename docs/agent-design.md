# LLM Agent 聊天页面设计方案

> 基于 Koa + Vue 3 + Element Plus + Webpack 多入口架构

---

## 集成方式

Agent 页面**不新增 webpack 入口**，而是作为现有 dashboard 的子页面：

```
dashboard 入口 (entry.dashboard.js)
  └── dashboard.vue (主布局)
        └── <router-view>
              ├── schema-view (已有)
              ├── iframe-view (已有)
              ├── sider-view (已有)
              └── agent-chat ← 新增路由组件
```

通过菜单配置中的 `moduleType: 'custom'` 或新增路由指向 agent 组件，由现有 Vue Router 负责渲染。

---

## 整体架构

```
┌─────────────────────────────────────────────┐
│             前端 (Vue 3)                     │
│  agent.vue ──→ agentStore (Pinia)           │
│       │                                     │
│       ▼                                     │
│  common/curl.js (axios + MD5签名)           │
└──────────────┬──────────────────────────────┘
               │  POST /api/agent/chat (JSON)
               │  GET  /api/agent/stream (SSE)
               ▼
┌─────────────────────────────────────────────┐
│            Koa 后端                          │
│  router → controller → service → LLM API    │
│                              ↓               │
│                    agent-core (会话/工具管理)  │
└─────────────────────────────────────────────┘
```

---

## 一、后端

### 1. Service — `app/service/agent-service.js`

核心职责：
- LLM API 调用（Claude / OpenAI）
- 会话管理（内存 Map / Redis）
- 系统提示词注入
- 流式响应（SSE）

```js
class AgentService extends BaseService {
  async chat(sessionId, message) { /* 完整响应 */ }
  async chatStream(sessionId, message) { /* SSE 流 */ }
  getOrCreateSession(sessionId) { /* 获取/创建会话 */ }
  clearSession(sessionId) { /* 清除会话 */ }
}
```

### 2. Controller — `app/controller/agent.js`

| 方法 | 路径 | 用途 |
|------|------|------|
| POST | `/api/agent/chat` | 发送消息，返回完整 JSON 响应 |
| GET | `/api/agent/stream` | SSE 流式聊天，实时输出 |
| POST | `/api/agent/clear` | 清除当前会话历史 |
| GET | `/api/agent/history` | 获取会话历史 |

### 3. Router Schema — `app/router-schema/agent.js`

Zod 校验参数：`message`（必填）、`sessionId`（可选）、`stream`（可选）

### 4. 配置 — `config/config.*.js`

```js
module.exports = {
  llm: {
    provider: 'claude',
    apiKey: process.env.LLM_API_KEY,
    apiUrl: 'https://api.anthropic.com/v1/messages',
    model: 'claude-sonnet-4-20250514',
    maxTokens: 4096,
    systemPrompt: '你是一个智能助手...',
  }
}
```

### 5. API 签名

`api-sign-verify.js` 对 `/api/agent/*` 路径做白名单放行处理，或注册中间件时跳过 agent 路由。

---

## 二、前端

### 文件清单

| 文件 | 说明 |
|------|------|
| `app/pages/agent/agent.vue` | 聊天主页面（通过现有 dashboard 路由加载） |
| `app/store/agent.js` | Pinia 状态管理 |

### 路由集成

在 dashboard 现有的 Vue Router 配置中新增路由，例如：

```js
{
  path: '/agent',
  name: 'agent',
  component: () => import('./agent/agent.vue'), // 懒加载
}
```

路由由菜单模型驱动时，可在 `model/business/model.js` 中新增菜单项：
- `moduleType: 'custom'`（走现有 custom 视图）
- 或 `moduleType: 'schema'` + 自定义 schema 配置
- 或在 sider-view 下新增子路由

无需修改 webpack 配置，无需新增 `entry.*.js`。

### UI 结构

```
┌──────────────────────────────────┐
│            Header                │  标题 + 清空按钮
├──────────────────────────────────┤
│  ┌─── 消息气泡 ──────────┐      │
│  │ 用户: ...             │      │
│  └──────────────────────┘      │
│  ┌─── 消息气泡 ──────────┐      │
│  │ AI: ...               │      │
│  └──────────────────────┘      │
├──────────────────────────────────┤
│  [ 输入框              ] [发送]  │
└──────────────────────────────────┘
```

### Pinia Store — `app/store/agent.js`

```js
{
  sessionId: 'uuid',
  messages: [
    { role: 'user|assistant', content: '...', timestamp: ... },
  ],
  isLoading: false,
  streamingContent: '',
}
```

actions: `sendMessage()`, `clearSession()`, `handleStreamChunk()`

### 消息渲染（打字机与 Markdown 展示）

**不引入打字机库**，采用 `marked` + `highlight.js` 做流式 Markdown 渲染（ChatGPT / Claude 网页版的做法）。

```bash
npm install marked highlight.js
```

在 `agent.vue` 中配置：

```js
import { marked } from 'marked';
import hljs from 'highlight.js';

// 一次性配置 marked，支持代码高亮
marked.setOptions({
  highlight: (code, lang) => {
    if (lang && hljs.getLanguage(lang)) {
      return hljs.highlight(code, { language: lang }).value;
    }
    return hljs.highlightAuto(code).value;
  }
});
```

SSE 流式渲染逻辑（核心只有两行）：

```html
<!-- 模板 -->
<div class="message-content" v-html="marked.parse(content)"></div>
<span v-if="isStreaming" class="cursor">▊</span>
```

```css
/* 光标闪烁动画 */
.cursor {
  animation: blink 0.8s step-end infinite;
}
@keyframes blink {
  50% { opacity: 0; }
}
```

**效果**：SSE 每收到一个 chunk → append 到 `streamingContent` → `marked.parse()` 实时解析为 HTML → Vue 响应式渲染。用户看到的是内容随着流式输出逐步渲染，代码块自动高亮。无需任何打字机库。

---

## 三、集成要点

| 方面 | 说明 |
|------|------|
| 模板渲染 | 复用 `entry.tpl`，页面路径 `/view/agent` |
| 菜单注册 | `model/business/model.js` 新增 agent 菜单，`moduleType: 'custom'` |
| API 签名 | 前端 `curl.js` 已内置 MD5 签名 |
| 错误处理 | `error-handler.js` 全局兜底 |
| 日志 | `app.logger` 记录 LLM 调用日志 |
| 会话存储 | 初期内存 Map，后续迁移 Redis |
| 安全性 | API Key 放服务端，不暴露给前端 |

---

## 五、后续扩展

1. SSE 流式响应
2. 工具调用（Function Calling）
3. 多会话管理（左侧会话列表）
4. 消息持久化（MySQL）
5. Prompt 模板（不同场景预设 system prompt）
6. 速率限制

---

## 六、工作量

| 模块 | 文件数 | 复杂度 |
|------|--------|--------|
| Service | 1 新增 | 中 |
| Controller + Router + Schema | 3 新增 | 低 |
| 前端页面 (Vue + Store) | 3 新增 | 中 |
| 配置改动 (config + middleware) | 2 改动 | 低 |
| **合计** | **~7 新增 + 少量改动** | |
