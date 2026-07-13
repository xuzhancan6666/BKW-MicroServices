/**
 * html-utils.js
 *
 * GrapesJS 工具函数：将 CSS 内联到 HTML 中，生成自包含的 HTML 片段。
 * 以及 px→rem 转换（用于 APP 模式导出）。
 */

/**
 * 将 GrapesJS 输出的 ID 选择器 CSS 内联到 HTML 元素上
 *
 * 输入：
 *   html: '<div id="isvz"><p id="i8nr3">text</p></div>'
 *   css:  '#isvz{background:#f7f7f7}#i8nr3{color:#666}'
 * 输出：
 *   '<div id="isvz" style="background:#f7f7f7"><p id="i8nr3" style="color:#666">text</p></div>'
 *
 * @param {string} html  GrapesJS 输出的 HTML（元素带 id）
 * @param {string} css   GrapesJS 输出的 CSS（#id 选择器规则）
 * @returns {string}  样式已内联的 HTML
 */
export function inlineStyles(html, css) {
  if (!html || !css) return html

  // 1. 解析 CSS 提取 #id → styles 映射
  const ruleMap = {}
  const idRuleRe = /#([\w-]+)\s*\{([^}]*)\}/g
  let match
  while ((match = idRuleRe.exec(css)) !== null) {
    const id = match[1]
    const styles = match[2].trim()
    if (id && styles) {
      ruleMap[id] = styles
    }
  }

  if (Object.keys(ruleMap).length === 0) return html

  // 2. 解析 HTML，内联样式
  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')

  function walk(el) {
    if (el.nodeType !== 1) return
    const id = el.getAttribute('id')
    if (id && ruleMap[id]) {
      const existing = el.getAttribute('style') || ''
      const append = existing && !existing.endsWith(';') ? ';' : ''
      el.setAttribute('style', existing + append + ruleMap[id])
    }
    for (let i = 0; i < el.children.length; i++) {
      walk(el.children[i])
    }
  }

  for (let i = 0; i < doc.body.children.length; i++) {
    walk(doc.body.children[i])
  }

  return doc.body.innerHTML
}

/**
 * 将 CSS 中的 px 值转换为 rem（用于 APP 模式导出）
 *
 * 只转换尺寸相关属性（width、padding、margin、font-size 等），
 * 边框、阴影等不影响布局的属性不转换。
 *
 * @param {string} css          GrapesJS 输出的 CSS 文本
 * @param {number} baseFontSize 基准字号，默认 16
 * @returns {string}  已转换的 CSS
 */
export function convertPxToRem(css, baseFontSize = 16) {
  if (!css) return css

  const convertProps = [
    'width', 'height', 'min-width', 'min-height', 'max-width', 'max-height',
    'padding', 'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin', 'margin-top', 'margin-right', 'margin-bottom', 'margin-left',
    'font-size',
    'border-radius', 'border-top-left-radius', 'border-top-right-radius',
    'border-bottom-left-radius', 'border-bottom-right-radius',
    'gap', 'row-gap', 'column-gap',
    'flex-basis',
    'top', 'right', 'bottom', 'left',
  ]

  const propPattern = `(${convertProps.join('|')})\\s*:\\s*([^;]+)`
  const re = new RegExp(propPattern, 'gi')

  return css.replace(re, (match, property, value) => {
    const newValue = value.replace(/([\d.]+)px/g, (_m, num) => {
      const rem = (parseFloat(num) / baseFontSize).toFixed(4).replace(/\.?0+$/, '')
      return rem + 'rem'
    })
    return `${property}: ${newValue}`
  })
}

/**
 * 为导出的 HTML 片段添加 PC 端自适应容器
 */
export function wrapPcContainer(html) {
  return '<div class="page-container" style="width:100%;margin:0 auto;padding:0 1rem;box-sizing:border-box;">\n' + html + '\n</div>'
}

/**
 * 生成 APP 端视口等比缩放脚本
 *
 * 原理：根据屏幕宽度 / 设计宽度 × 基准字号 动态设置根字号，
 * 页面内所有 rem 单位自动等比缩放。
 * - 宽高比限制（pad 上不会拉变形）
 * - resize 监听（横竖屏切换）
 * - 最大字号上限防止平板字号过大
 *
 * @param {number} designWidth  画布设计宽度，默认 375
 * @param {number} maxWidth     触达上限宽度的屏幕宽度，默认 540
 * @param {number} baseFontSize 基准根字号 px，默认 16
 */
export function getFlexibleScript(designWidth, maxWidth, baseFontSize) {
  designWidth = designWidth || 375
  maxWidth = maxWidth || 540
  baseFontSize = baseFontSize || 16
  return '<script>\n' +
    ';(function() {\n' +
    '  var dw = ' + designWidth + '\n' +
    '  var mw = ' + maxWidth + '\n' +
    '  var bf = ' + baseFontSize + '\n' +
    '  function set() {\n' +
    '    var w = Math.min(document.documentElement.clientWidth, mw)\n' +
    '    document.documentElement.style.fontSize = (w / dw * bf) + "px"\n' +
    '  }\n' +
    '  set()\n' +
    '  window.addEventListener("resize", set)\n' +
    '  window.addEventListener("orientationchange", set)\n' +
    '})()\n' +
    '</script>'
}

/**
 * 构建完整的导出 HTML 文档
 *
 * 处理流程：
 *   1. 剥离 getHtml() 自带的 &lt;script&gt;（jsInHtml 默认 true）
 *   2. 内联 GrapesJS 的 ID 选择器样式到元素上
 *   3. 页面类型包裹自适应容器
 *   4. 组装完整 HTML：CSS Reset + &lt;style&gt; 兜底 + 内联内容 + JS 交互脚本
 *
 * @param {object} opts
 * @param {string} opts.html       GrapesJS editor.getHtml()
 * @param {string} opts.css        GrapesJS editor.getCss()
 * @param {string} [opts.js]       GrapesJS editor.getJs()
 * @param {string} [opts.editorType]  'page' | 'component', 默认 'page'
 * @returns {string}  完整的 HTML 文档
 */
export function buildExportHtml({ html, css, js, editorType = 'page' } = {}) {
  if (!html) return ''

  // 1. 剥离 getHtml() 自动追加的 &lt;script&gt;，单独放在 body 末尾
  const cleanHtml = html.replace(/<script>[\s\S]*?<\/script>/g, '')

  // 2. 内联 ID 选择器样式
  let inlined = inlineStyles(cleanHtml, css)

  // 3. 页面类型包裹自适应容器
  if (editorType !== 'component') {
    inlined = wrapPcContainer(inlined)
  }

  // 4. 构建各标签
  const styleTag = css ? '<style>\n' + css + '\n</style>' : ''
  const jsTag = js ? '<script>\n' + js + '\n<' + '/script>' : ''
  const resetTag = '<style>\n  * { margin: 0; padding: 0; box-sizing: border-box; }\n</style>'

  // 5. 组装完整文档
  return [
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
}
