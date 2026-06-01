# 落地页构建器实现记录

## 变更内容

| 操作 | 文件 |
|------|------|
| 新增依赖 | `grapesjs` + `grapesjs-preset-webpage` |
| 新增文件 | `app/pages/widgets/page-builder/page-builder.vue` |
| 新增文件 | `app/pages/widgets/page-builder/blocks.js` |
| 修改文件 | `app/pages/dashboard/complex-view/editor-view/editor-view.vue` |

## 文件说明

### 1. widget 组件 — `app/pages/widgets/page-builder/page-builder.vue`

GrapesJS 编辑器核心组件：
- 初始化 GrapesJS，加载 `gjs-preset-webpage` 预设
- 注册自定义块（从 `blocks.js` 加载）
- 使用 `localStorage` 作为存储（`autosave: true`）
- 顶部工具栏：返回、标题、恢复上次、保存按钮（带 ElMessage 提示）
- 编辑器高度 `100%` 撑满父容器

### 2. 自定义块配置 — `app/pages/widgets/page-builder/blocks.js`

共 **17 个自定义块**，按分类：

| 分类 | 块 |
|------|----|
| 布局 | 1列、2列、3列、4列 |
| Hero | 大横幅、图片背景、简洁 |
| 导航 | 浅色导航、深色导航 |
| 卡片 | 商品卡片、功能卡片、用户评价 |
| 图文 | 左文右图、左图右文 |
| 页脚 | 简洁页脚、多列页脚 |
| 内容 | 文本块、分割线、行动号召 |

### 2. 薄壳组件 — `app/pages/dashboard/complex-view/editor-view/editor-view.vue`

原占位内容改为引入 widget：
```vue
<template>
  <page-builder />
</template>
<script setup>
import PageBuilder from '$widgets/page-builder/page-builder.vue'
</script>
```

## 访问路径

```
路由: /sider/editor （已有，无需新增）
菜单: 通过 model 配置 customConfig.path: '/sider/editor'
```
