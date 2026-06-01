# 可视化落地页构建器设计方案

> 基于 GrapesJS + 现有 Vue 3 架构，嵌入为系统功能页面

---

## 阶段规划

```
阶段一（当前）: 纯前端编辑器页面，GrapesJS 跑起来，本地存储
阶段二（后续）: 接入后端，数据持久化，公开访问 + SEO
```

---

## 阶段一：前端编辑器页面

### 整体结构

```
dashboard.vue
  └── <router-view>
        └── sider-view.vue
              └── <router-view>
                    └── editor-view.vue  ← 已有路由 /sider/editor
                          └── page-builder.vue  ← widgets 组件
```

复用现有链路：
- 路由 `/sider/editor` **已经注册**在 `route.js` 中（指向 `editor-view.vue`）
- `editor-view.vue` 作为薄壳，引入 widgets 层的 `page-builder` 组件
- 通过菜单模型配置侧边栏入口

**不需要新增路由，不需要新增 webpack 入口。**

### 文件清单

| 文件 | 说明 |
|------|------|
| `app/pages/widgets/page-builder/page-builder.vue` | GrapesJS 编辑器核心组件（可复用 widget） |
| `app/pages/dashboard/complex-view/editor-view/editor-view.vue` | 薄壳，引入 widget（已有文件，改内容） |

### Widget 组件 — `page-builder.vue`

放在 `$widgets/` 下，保持可复用，后续其他页面也可引用。

```vue
<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">落地页编辑器</span>
      <el-button type="primary" @click="save">保存</el-button>
      <el-button @click="loadLast">恢复上次</el-button>
    </div>
    <!-- GrapesJS 容器 -->
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { useRouter } from 'vue-router';
import grapesjs from 'grapesjs';
import 'grapesjs-preset-webpage';
import 'grapesjs/dist/css/grapes.min.css';

const router = useRouter();
const editorContainer = ref();
let editor;

const STORAGE_KEY = 'grapesjs_page_data';

onMounted(() => {
  editor = grapesjs.init({
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    // 使用 localStorage 存储，不依赖后端
    storageManager: {
      type: 'local',
      autosave: true,      // 自动保存到 localStorage
      autoload: true,      // 自动加载上次数据
      stepsBeforeSave: 1,  // 每次改动都存
    },
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': {
        // 预设自带 Navbar、Hero、Features、Footer 等模块
        // 支持背景图、样式编辑、响应式预览
      }
    },
  });
});

function save() {
  const data = editor.getProjectData();
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadLast() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw) {
    editor.loadProjectData(JSON.parse(raw));
  }
}

function goBack() {
  editor?.destroy();
  router.back();
}

onBeforeUnmount(() => {
  editor?.destroy();
});
</script>

<style scoped>
.page-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  z-index: 10;
  flex-shrink: 0;
}
.page-title {
  flex: 1;
  font-weight: 600;
}
.editor-container {
  flex: 1;
  overflow: hidden;
}
</style>
```

说明：
- 使用 GrapesJS 自带的 `localStorage` 存储方式，改动即存，刷新恢复
- 工具栏提供"保存"和"恢复上次"按钮，显式控制
- 编辑器高度 `100%` 撑满父容器（由 sider-view 提供）

### 薄壳组件 — `editor-view.vue`（改内容）

原文件仅占位，改为引入 widget：

```vue
<template>
  <page-builder />
</template>

<script setup>
import PageBuilder from '$widgets/page-builder/page-builder.vue';
</script>
```

### 菜单集成

在 `model/business/model.js` 中新增侧边栏菜单项：

```js
{
  name: '落地页编辑',
  moduleType: 'custom',
  customConfig: {
    path: '/sider/editor',
  },
}
```

或者作为某个项目侧边栏下的子菜单项：

```js
// siderConfig.menu 中增加
{
  name: '落地页编辑',
  moduleType: 'custom',
  customConfig: {
    path: '/sider/editor',
  },
}
```

---

## 阶段二：扩展方向（后续需要时再引入）

| 功能 | 说明 |
|------|------|
| **页面管理** | 多页面列表，增删改查 |
| **后端存储** | Service + Controller + API，保存到 MySQL |
| **图片上传** | 配置 GrapesJS Asset Manager 上传接口 |
| **公开访问** | `GET /p/:slug` 路由直接渲染 HTML |
| **SEO** | 服务端输出完整 HTML，搜索引擎可爬取 |
| **多项目隔离** | 按 project_key 区分不同项目的页面 |

---

## 当前阶段工作量

| 内容 | 文件 |
|------|------|
| `npm install grapesjs grapesjs-preset-webpage` | 依赖安装 |
| Widget 组件 | `widgets/page-builder/page-builder.vue` 新文件 |
| 薄壳组件改内容 | `editor-view.vue` 改写 |
| 菜单模型配置 | 按需加菜单项 |
| **合计** | **1 个新文件 + 2 处改动** |
