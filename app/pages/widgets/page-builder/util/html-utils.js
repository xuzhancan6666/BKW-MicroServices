/**
 * html-utils.js
 *
 * GrapesJS 工具函数：将 CSS 内联到 HTML 中，生成自包含的 HTML 片段。
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
 * 为导出的 HTML 片段添加 PC 端自适应容器
 */
export function wrapPcContainer(html) {
  return '<div class="page-container" style="width:100%;max-width:1200px;margin:0 auto;padding:0 1rem;box-sizing:border-box;">\n' + html + '\n</div>'
}

/**
 * 生成 APP 端视口等比缩放脚本
 * @param {number} designWidth  画布设计宽度，默认 375
 */
export function getFlexibleScript(designWidth) {
  designWidth = designWidth || 375
  return '<script>\n' +
    ';(function() {\n' +
    '  var dw = ' + designWidth + '\n' +
    '  var bf = 16\n' +
    '  var s = window.innerWidth / dw\n' +
    '  document.documentElement.style.fontSize = (s * bf) + "px"\n' +
    '})()\n' +
    '</script>'
}
