---
name: elementui-menu-block
description: ElementUI Menu block 纵向/横向 — GrapesJS page-builder
metadata:
  type: project
---

在 [menu.js](/app/pages/widgets/page-builder/blocks/element-ui/menu.js) 中实现了两个 menu block，同属"菜单组件"分类：

- `el-menu-vertical` — 纵向菜单（侧边栏风格）
- `el-menu-horizontal` — 横向菜单（导航栏风格，下拉子菜单）

4 个组件类型：
- `el-menu` — 根菜单，同时服务两种模式，通过 `.el-menu--horizontal` 区分
- `el-menu-item` — 叶子项，traits 配置跳转地址(data-url)和跳转方式(data-target: _self/_blank)
- `el-submenu` — 子菜单容器，trait 按钮可添加子项
- `el-menu-children` — 子项包裹容器（仅用于命令查找插入点）

交互：
1. 点击菜单项 → 唯一 active 状态
2. 展开子菜单后点外部 → 收起
3. 导出 HTML 通过 script 函数维持运行时交互

**Why:** 用户需要一个近似 ElementUI Menu 的导航菜单 block，含横向/纵向两种布局。
**How to apply:** 后续扩展直接在 menu.js 中修改对应 block 的 content 或组件类型。
