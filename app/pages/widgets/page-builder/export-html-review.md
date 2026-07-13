# 导出 HTML 功能审查

> 审查日期：2026-07-13
> 涉及文件：page-builder.vue — `exportHtml()` 方法

---

## 现状

```js
function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  let inlined = inlineStyles(html, fullCss)

  inlined = wrapPcContainer(inlined)

  const fullHtml = [
    '<!DOCTYPE html>',
    '<html lang="zh-CN">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body>',
    inlined,
    '</body>',
    '</html>',
  ].join('\n')
  const blob = new Blob([fullHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.html'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 page.html')
}
```

---

## 缺陷与方案

### 缺陷 1：CSS 样式完全丢失

**问题**：`inlineStyles(html, fullCss)` 只处理 `#id{styles}` 选择器。ElementPlus blocks 和 nav-menu 使用属性选择器和伪类（`[data-gjs-type="el-horizontal-menu"]`、`:hover`），这些被 `inlineStyles()` 直接忽略。且 `fullCss` 没有以 `<style>` 标签输出到 `<head>`，导致所有 CSS 规则均不生效。

**方案**：加入 `<style>` 标签兜底。`inlineStyles()` 负责 ID 选择器内联（精确控制单个元素），`<style>` 标签保留属性/类/伪类选择器，互不冲突。

```js
const styleTag = fullCss ? '<style>\n' + fullCss + '\n</style>' : ''

// 插入到 <head> 中
'<head>',
'  <meta charset="UTF-8">',
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
styleTag,
'</head>',
```

---

### 缺陷 2：JavaScript 交互完全丢失

**问题**：没有调用 `editor.getJs()`。所有组件交互（菜单 active 切换、树展开/收起、走马灯切换、导航子菜单展开）在导出 HTML 中全部不工作。

**方案**：调用 `getJs()` 获取组件脚本，输出到 `<body>` 末尾。

```js
const js = editor.getJs()
const jsTag = js ? '<script>\n' + js + '\n</script>' : ''
```

GrapesJS 会自动把 component 的 `script` 函数序列化为 `querySelectorAll → forEach → call(element)` 格式，与 DOM 元素绑定。

---

### 缺陷 3：getHtml() 内嵌 `<script>` 未清理

**问题**：GrapesJS 默认 `jsInHtml: true`，`getHtml()` 返回的 HTML 自带 `<script>` 标签散落在 body 中间。这些脚本在脱离编辑器后可能抛出异常，且渲染位置不理想。

**方案**：剥离后统一放在 body 末尾。

```js
const cleanHtml = html.replace(/<script>[\s\S]*?<\/script>/g, '')
```

---

### 缺陷 4：组件类型不应 wrapPcContainer

**问题**：`exportHtml()` 对所有类型都包裹 `wrapPcContainer`，但 `handleSave()` 对 component 类型跳过了这一步。如果对 component 类型导出，会被包上多余的 PC 容器。

**方案**：与 `handleSave()` 保持一致的判断逻辑。

```js
if (props.editorType === 'component') {
  inlined = inlineStyles(cleanHtml, fullCss)
} else {
  inlined = inlineStyles(cleanHtml, fullCss)
  inlined = wrapPcContainer(inlined)
}
```

---

### 缺陷 5：Blob 缺少 charset

**问题**：`type: 'text/html'` 未指定字符编码，含中文内容在某些浏览器下载可能出现乱码。

**方案**：加上 `charset=utf-8`。

```js
const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' })
```

---

### 缺陷 6：缺少 CSS Reset

**问题**：导出页面没有基础样式重置，不同浏览器默认样式差异可能导致 margin/padding/box-sizing 不一致。

**方案**：在 `<head>` 中加入轻量 reset。

```html
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
</style>
```

或引用外部 normalize（增加网络依赖，不推荐）。

---

## 修复后代码总览

```js
function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const js = editor.getJs()

  // 剥离 getHtml() 自动追加的 <script>
  const cleanHtml = html.replace(/<script>[\s\S]*?<\/script>/g, '')

  let inlined = inlineStyles(cleanHtml, fullCss)
  if (props.editorType !== 'component') {
    inlined = wrapPcContainer(inlined)
  }

  // CSS 兜底：保留属性选择器、伪类等无法内联的样式
  const styleTag = fullCss ? '<style>\n' + fullCss + '\n</style>' : ''
  // JS 交互：导出组件交互脚本
  const jsTag = js ? '<script>\n' + js + '\n</script>' : ''
  // CSS Reset
  const resetTag = '<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n</style>'

  const fullHtml = [
    '<!DOCTYPE html>',
    '<html lang="zh-CN">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    resetTag,
    styleTag,
    '</head>',
    '<body>',
    inlined,
    jsTag,
    '</body>',
    '</html>',
  ].join('\n')

  const blob = new Blob([fullHtml], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.html'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 page.html')
}
```

---

## 影响范围

| 缺陷 | 影响 | 改动量 | 风险 |
|------|------|--------|------|
| CSS 丢失 | ElementPlus 样式全失 | 1 行 | 低 |
| JS 丢失 | 所有交互不工作 | 2 行 | 低 |
| script 未清理 | 可能报错 | 1 行 | 低 |
| 组件包裹 | 组件结构多余 | 3 行 | 低 |
| charset | 中文乱码 | 1 行 | 低 |
| CSS reset | 跨浏览器差异 | 3 行 | 低 |

所有修改集中在 `exportHtml()` 一个函数内，不涉及外部逻辑。
