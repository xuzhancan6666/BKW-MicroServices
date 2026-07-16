纵向菜单 

## v3.0.0 — 重构为仅一级菜单
- 清空所有二级/子菜单逻辑
- 移除 `el-menu-children` 组件
- 移除 `addSubmenuItem` / `addMenuItem` 命令
- 移除 `el-menu` script（只在 view 处理 active 切换）
- 移除 `component:create` / `component:selected` 动态 traits 切换
- 移除横向菜单（仅保留纵向）
- 移除独立 menuItem block
- 简化 CSS 为仅纵向样式
- traits 固定为 `[链接地址]` + `[跳转方式]`
