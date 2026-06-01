/**
 * parse-AEM-util.js
 *
 * 将 GrapesJS 组件树转换为 AEM (Adobe Experience Manager) 风格的 JSON 格式。
 *
 * 使用方式：
 *   import { parseToAEM } from './parse-AEM-util'
 *   const aemJson = parseToAEM(editor)
 *
 * 输出示例：
 *   {
 *     result: {
 *       zh_CN: {
 *         componentList: [
 *           { component: 'CQHeroBanner', props: { title: '...', styles: {...} }, children: [...] },
 *           { component: 'CQRichText', props: { content: '<p>...</p>' } }
 *         ]
 *       }
 *     }
 *   }
 */

// ==================== HTML 标签 → AEM 组件默认映射 ====================
const TAG_MAP = {
  div: 'CQContainer',
  p: 'CQText',
  span: 'CQText',
  h1: 'CQTitle',
  h2: 'CQTitle',
  h3: 'CQTitle',
  h4: 'CQTitle',
  h5: 'CQTitle',
  h6: 'CQTitle',
  img: 'CQImage',
  a: 'CQButtonLink',
  nav: 'CQNavigation',
  header: 'CQHeader',
  footer: 'CQFooter',
  section: 'CQSection',
  article: 'CQArticle',
  input: 'CQInput',
  textarea: 'CQTextarea',
  button: 'CQButton',
  ul: 'CQList',
  ol: 'CQList',
  li: 'CQListItem',
  table: 'CQTable',
  tr: 'CQTableRow',
  td: 'CQTableCell',
  th: 'CQTableHeader',
  hr: 'CQDivider',
  form: 'CQForm',
  video: 'CQVideo',
  iframe: 'CQIFrame',
}

// ==================== 自定义 block 注册表 ====================
// blocks.js 中的 block 可通过 registerBlock() 注册，建立 block id → AEM 组件的映射
const _blockRegistry = new Map()

/**
 * 注册一个自定义 block 的 AEM 映射
 * @param {string}   blockId       blocks.js 中的 id（如 'hero-banner'）
 * @param {string}   componentName AEM 组件名（如 'CQHeroBanner'）
 * @param {Function} [extractProps] 可选：自定义 props 提取函数 (component) => props
 */
export function registerBlock(blockId, componentName, extractProps) {
  _blockRegistry.set(blockId, { componentName, extractProps })
}

/**
 * 批量注册 blocks
 * @param {Array} blocks  blocks.js 的默认导出数组
 */
export function registerBlocks(blocks) {
  blocks.forEach(b => {
    if (b.componentName) {
      _blockRegistry.set(b.id, {
        componentName: b.componentName,
        extractProps: b.extractProps,
      })
    }
  })
}

// ==================== Props 提取 ====================

/**
 * 从 GrapesJS Component 中提取 props
 */
function _extractProps(component) {
  const tag = component.get('tagName') || 'div'
  const styles = component.getStyle() || {}
  const attributes = component.getAttributes() || {}
  const children = component.components()

  const props = {}

  // — 文本内容（从 textnode 子节点提取） —
  if (children && children.length > 0) {
    const textParts = []
    for (let i = 0; i < children.length; i++) {
      const child = children[i] || children.at(i)
      if (!child) continue
      const type = child.get && child.get('type')
      if (type === 'textnode' || type === 'text') {
        const text = child.get && child.get('content')
        if (text) textParts.push(text)
      }
    }
    if (textParts.length > 0) {
      props.content = textParts.join('').trim()
    }
  }

  // — 内联样式 —
  if (Object.keys(styles).length > 0) {
    props.styles = { ...styles }
  }

  // — 特定标签属性 —
  switch (tag) {
    case 'img':
      if (attributes.src) props.imageUrl = attributes.src
      if (attributes.alt) props.altText = attributes.alt
      break
    case 'a':
      if (attributes.href) props.linkUrl = attributes.href
      break
    case 'input':
      if (attributes.placeholder) props.placeholder = attributes.placeholder
      if (attributes.type) props.inputType = attributes.type
      break
    case 'video':
      if (attributes.src) props.videoUrl = attributes.src
      break
    case 'iframe':
      if (attributes.src) props.iframeUrl = attributes.src
      break
  }

  // — data-cq-props JSON 覆写 —
  if (attributes['data-cq-props']) {
    try {
      const override = JSON.parse(attributes['data-cq-props'])
      Object.assign(props, override)
    } catch (e) {
      // ignore invalid JSON
    }
  }

  return props
}

// ==================== 核心转换 ====================

/**
 * 递归转换单个 GrapesJS Component 为 AEM 节点
 * @param {Object} component  GrapesJS Component model
 * @returns {Object|null}  { component, props, children } 或 null
 */
function _transformComponent(component) {
  if (!component) return null

  const type = component.get('type')
  const tagName = component.get('tagName')
  const attributes = component.getAttributes() || {}

  // — 跳过 wrapper/textnode 类型 —
  if (type === 'wrapper' || type === 'textnode') {
    const children = component.components()
    if (children && children.length > 0) {
      return _transformComponentList(children)
    }
    return null
  }

  // — 检查是否有 data-cq-component 属性（精确覆盖） —
  let aemComponent = attributes['data-cq-component']

  // — 检查 block 注册表 —
  if (!aemComponent) {
    const blockId = attributes['data-block-id']
    if (blockId && _blockRegistry.has(blockId)) {
      const mapping = _blockRegistry.get(blockId)
      aemComponent = mapping.componentName
    }
  }

  // — 按标签名映射 —
  if (!aemComponent && tagName) {
    aemComponent = TAG_MAP[tagName.toLowerCase()] || null
  }

  // 无法识别的非容器元素跳过（如无意义的 span、空 div 等）
  if (!aemComponent) {
    // 递归处理子节点
    const children = component.components()
    if (children && children.length > 0) {
      return _transformComponentList(children)
    }
    return null
  }

  // — 提取 props —
  let props = _extractProps(component)

  // — 如果有注册的 extractProps 回调，允许自定义 —
  const blockId = attributes['data-block-id']
  if (blockId && _blockRegistry.has(blockId)) {
    const mapping = _blockRegistry.get(blockId)
    if (mapping.extractProps) {
      props = { ...props, ...mapping.extractProps(component) }
    }
  }

  // — 递归子节点 —
  let children = null
  const childComponents = component.components()
  if (childComponents && childComponents.length > 0) {
    const parsed = _transformComponentList(childComponents)
    if (parsed && parsed.length > 0) {
      children = parsed
    }
  }

  const node = {
    component: aemComponent,
    props,
  }
  if (children) {
    node.children = children
  }

  return node
}

/**
 * 递归转换 GrapesJS Component 集合
 */
function _transformComponentList(components) {
  if (!components || !components.length) return []

  const result = []
  for (let i = 0; i < components.length; i++) {
    const node = _transformComponent(components[i])
    if (node) {
      if (Array.isArray(node)) {
        result.push(...node)
      } else {
        result.push(node)
      }
    }
  }
  return result
}

// ==================== 公共 API ====================

/**
 * 将 GrapesJS editor 组件树转换为 AEM JSON
 *
 * @param {Object}  editor            GrapesJS editor 实例
 * @param {Object}  [options]
 * @param {string}  [options.locale]  语言代码，默认 'zh_CN'
 * @param {boolean} [options.wrapper] 是否包含 result/componentList 外层结构，默认 true
 * @param {Object}  [options.pageMeta] 页面元信息，如 { title: 'xxx' }
 * @returns {Object} AEM 风格 JSON
 */
export function parseToAEM(editor, options = {}) {
  const {
    locale = 'zh_CN',
    wrapper = true,
    pageMeta = {},
  } = options

  const components = editor.getComponents()
  if (!components || !components.length) {
    return wrapper
      ? { result: { [locale]: { componentList: [] } } }
      : []
  }

  const componentList = _transformComponentList(components)

  if (!wrapper) return componentList

  return {
    result: {
      [locale]: {
        componentList,
        ...pageMeta,
      },
    },
  }
}

/**
 * 多语言版本：分别传入不同语言的 editor，输出 AEM 多语言格式
 *
 * @param {Object} editors  { zh_CN: editor1, zh_HK: editor2, en_US: editor3 }
 * @param {Object} [pageMeta] 页面元信息
 * @returns {Object} AEM 多语言 JSON
 */
export function parseToAEMMulti(editors, pageMeta = {}) {
  const result = {}
  for (const [locale, editor] of Object.entries(editors)) {
    result[locale] = {
      componentList: parseToAEM(editor, { wrapper: false }),
      ...pageMeta,
    }
  }
  return { result }
}

/**
 * 从 HTML 字符串中提取 data-cq-component 信息（轻量解析，用于后端）
 *
 * @param {string} html  HTML 字符串
 * @returns {Array}  [{ component, props, children }]
 */
export function parseHTMLToAEM(html) {
  if (!html || typeof document === 'undefined') {
    // 服务端环境可传入 cheerio 等
    console.warn('[parse-AEM-util] parseHTMLToAEM 需要浏览器 DOM 环境')
    return []
  }

  const parser = new DOMParser()
  const doc = parser.parseFromString(html, 'text/html')
  const children = doc.body.children

  return _parseDOMNodes(children)
}

function _parseDOMNodes(nodes) {
  const result = []
  for (const node of nodes) {
    if (node.nodeType !== 1) continue // 只处理元素节点

    const el = node
    let aemComponent = el.getAttribute('data-cq-component')

    if (!aemComponent) {
      aemComponent = TAG_MAP[el.tagName.toLowerCase()] || null
    }

    if (!aemComponent) {
      // 递归处理子元素
      if (el.children.length > 0) {
        result.push(..._parseDOMNodes(el.children))
      }
      continue
    }

    const props = {}

    // 提取常用属性
    if (el.tagName === 'IMG') {
      props.imageUrl = el.getAttribute('src') || ''
      props.altText = el.getAttribute('alt') || ''
    } else if (el.tagName === 'A') {
      props.linkUrl = el.getAttribute('href') || ''
    } else if (el.tagName === 'INPUT') {
      const ph = el.getAttribute('placeholder')
      if (ph) props.placeholder = ph
    }

    // 内联样式
    const styleAttr = el.getAttribute('style')
    if (styleAttr) props.styles = styleAttr

    // 纯文本内容（不包含子组件时才提取，避免嵌套重复）
    const text = el.textContent?.trim()
    if (text && !el.querySelector('[data-cq-component]')) {
      props.content = text
    }

    const nodeData = { component: aemComponent, props }

    // 递归子节点
    const childComponents = _parseDOMNodes(el.children)
    if (childComponents.length > 0) {
      nodeData.children = childComponents
    }

    result.push(nodeData)
  }
  return result
}

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

export default {
  registerBlock,
  registerBlocks,
  parseToAEM,
  parseToAEMMulti,
  parseHTMLToAEM,
  inlineStyles,
}
