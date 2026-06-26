# GrapesJS 编辑器精简重构方案

## 目标

下游用户为非开发人员，简化编辑器功能，降低使用门槛。

---

## 现状问题

1. **两份重复代码** — `page-builder.vue` 和 `mobile-builder.vue` 大量重复逻辑，但 PC/APP 只是一个 `canvasMode` 的差异
2. **Block 定义分散** — 5 个文件（`blocks`/`layout`/`media`/`basic-components`/`text-components`），且每个文件内 PC/APP 两份重复定义
3. **`gjs-preset-webpage` 插件冗余** — 插件自带的 import、device-switcher、theme 配置等功能对非开发用户没用
4. **样式面板太复杂** — 用户不需要精确控制 padding/margin 四个方向，也不需要 box-shadow、border-radius 精细调节
5. **Traits 面板复杂** — 背景图片 URL、iframe 地址等属性对非开发人员不友好
6. **设备切换器混淆** — 用户可能误切换到桌面/平板模式，导致编辑和导出版本不一致

---

## 重构方案

### 一、组件合并

```
page-builder.vue (PC + APP 合一)
mobile-builder.vue (删除，不再需要)
```

合并为一套组件，通过 `canvasMode` prop 区分 PC/APP 模式：
- PC 模式：画布宽度 `1280px`，显示桌面设备
- APP 模式：画布宽度 `375px`，锁定手机设备，隐藏设备切换器

### 二、Block 精简

| 当前 | 重构后 |
|------|--------|
| 布局 (3个: 自由块/横向/纵向) | **布局** (保留 3 个) |
| 基础标签 (8个: h1-h3/段落/行内文本/链接/列表/引用) | **文本** (合并: 标题/段落/列表/引用) |
| 媒体 (3个: 图片/视频/嵌入) | **媒体** (保留: 图片/视频/嵌入) |
| 基础组件 (5个: 分割线/标签/按钮/纵向步骤条/横向步骤条) | **组件** (精简为: 按钮/分割线/标签) |
| 文本组件 (8个: 富文本块/标题/章节标题/提示块/卡片/数据看板/引用/技术标签) | 删除 (与基础标签功能重叠, 或改成模板库) |

Block 定义文件从 5 个合并为 **1 个文件** `blocks.js`，PC/APP 样式差异通过 `canvasMode` 决定 px 或 rem。

### 三、移除 `gjs-preset-webpage`

插件只提供 3 个 block（link-block、quote、text-basic），这些与自定义 block 重叠，移除后：
- 不再加载插件的自定义面板（设备按钮、import/export 命令）
- 改用 GrapesJS 原生面板配置，只保留必要的按钮
- 移除 import 代码功能（非开发用户不需要）

需要 GrapesJS 原生提供的功能：
- `Blocks`（组件面板）
- `Layers`（图层管理）
- `Style Manager`（样式编辑）
- `Traits`（属性编辑）
- `Canvas`（画布）

### 四、Style Manager 精简

**精简为 2 个面板**：

```
尺寸 (精简)
  - 宽度
  - 高度
  - 内边距 (整体, 不拆方向)
  - 外边距 (整体, 不拆方向)

外观 (合并)
  - 背景色
  - 圆角
  - 字体大小 (下拉选择: 12/14/16/18/20/24/32px)
  - 字体颜色
  - 对齐方式
  - 行高
```

删除：`border`、`box-shadow`、`padding-top/left` 等细粒度属性。

### 五、Toolbar 精简

| 按 | 钮 | 说明 |
|----|-----|------|
| ← 返回 | 返回列表页 |
| 标题 | 当前页面名称 |
| 撤销/重做 | 基础编辑操作 |
| 清空画布 | 重置 |
| 保存 | 保存到后台 |
| 导出 HTML | 下载完整 HTML |

### 六、数据导出简化

- **PC 模式**：导出时 px 保持不变，外层容器 `max-width: 1200px; margin: 0 auto;`
- **APP 模式**：block 模板直接使用 rem，不再需要 `pxToRem` 转换；运行时插入视口缩放脚本

---

## 目录结构（重构后）

```
page-builder/
├── page-builder.vue        # 主组件 (PC/APP 合并)
├── blocks.js               # 所有 block 定义 (单文件)
├── locales/
│   ├── index.js
│   ├── zh_CN.js
│   ├── zh_HK.js
│   └── en_US.js
├── util/
│   └── html-utils.js       # inlineStyles 只保留这个
├── widgets/
│   └── rich-text/           # 富文本弹窗不变
└── 适配方案.md              # 保留方案文档
```

---

## 实现顺序

1. 合并 `page-builder.vue`（删除 mobile-builder.vue，PC/APP 合一）
2. 移除 `gjs-preset-webpage` 依赖
3. 重构 block 定义（5 文件 → 1 文件，精简类别）
4. 重构 style-manager（精简为 2 面板）
5. 重构 toolbar（只保留必要按钮）
6. APP 导出 rem（block 模板直接用 rem，不转换）
7. PC 导出 max-width 容器
