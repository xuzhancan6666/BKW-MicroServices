/**
 * blocks.js — 所有自定义 block 定义
 * canvasMode: 'PC'  → rem 弹性单位
 * canvasMode: 'APP' → rem + flexible.js 等比缩放
 */

const px = (v, isApp) => {
  const r = (v / 16).toFixed(4).replace(/\.?0+$/, '')
  return r + 'rem'
}

const layout = (canvasMode) => {
  const isApp = canvasMode === 'APP'

  return [
    {
      id: 'layout-resizable',
      label: '自由块',
      category: '布局',
      content: `<div data-gjs-type="resizable-div" style="width:100%;min-width:${px(280, isApp)};min-height:${px(64, isApp)};background:#f0f0f0;"></div>`,
    },
    {
      id: 'layout-horizontal',
      label: '横向排列',
      category: '布局',
      content: `<div data-gjs-type="resizable-div" data-layout="horizontal" style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:${px(8, isApp)};padding:${px(8, isApp)};background:#f0f0f0;">
        <div data-gjs-type="resizable-div" style="flex:1 1 ${px(200, isApp)};min-height:${px(64, isApp)};background:#fafafa;"></div>
        <div data-gjs-type="resizable-div" style="flex:1 1 ${px(200, isApp)};min-height:${px(64, isApp)};background:#fafafa;"></div>
        <div data-gjs-type="resizable-div" style="flex:1 1 ${px(200, isApp)};min-height:${px(64, isApp)};background:#fafafa;"></div>
      </div>`,
    },
    {
      id: 'layout-vertical',
      label: '纵向排列',
      category: '布局',
      content: `<div data-gjs-type="resizable-div" data-layout="vertical" style="display:flex;flex-direction:column;gap:${px(8, isApp)};padding:${px(8, isApp)};background:#f0f0f0;">
        <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64, isApp)};background:#fafafa;"></div>
        <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64, isApp)};background:#fafafa;"></div>
        <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64, isApp)};background:#fafafa;"></div>
      </div>`,
    },
  ]
}

const text = (canvasMode) => {
  const isApp = canvasMode === 'APP'

  const base = {
    h1: `font-size:${px(22, isApp)};font-weight:700;color:#333;margin:0 0 ${px(8, isApp)};padding:0;`,
    p: `font-size:${px(14, isApp)};color:#555;line-height:1.6;margin:0 0 ${px(8, isApp)};padding:0;`,
    li: `font-size:${px(13, isApp)};color:#555;line-height:1.8;`,
    blockquote: `margin:0;padding:${px(12, isApp)} ${px(16, isApp)};border-left:${px(3, isApp)} solid #409eff;background:#f8f9fa;font-size:${px(14, isApp)};color:#666;font-style:italic;`,
  }

  return [
    {
      id: 'html-heading',
      label: '标题',
      category: '文本',
      content: `<h1 style="${base.h1}">标题文字</h1>`,
    },
    {
      id: 'html-paragraph',
      label: '段落',
      category: '文本',
      content: `<p style="${base.p}">这是一段段落文字，可自由编辑内容。</p>`,
    },
    {
      id: 'html-list',
      label: '列表',
      category: '文本',
      content: `<ul style="padding-left:${px(20, isApp)};margin:0;${base.li}">
        <li>列表项目一</li>
        <li>列表项目二</li>
        <li>列表项目三</li>
      </ul>`,
    },
    {
      id: 'html-blockquote',
      label: '引用',
      category: '文本',
      content: `<blockquote style="${base.blockquote}">这是一段引用文字。</blockquote>`,
    },
  ]
}

const media = (canvasMode) => {
  const isApp = canvasMode === 'APP'

  return [
    {
      id: 'media-image',
      label: '图片',
      category: '媒体',
      content: `<div style="width:100%;min-height:${px(120, isApp)};background:#f0f0f0;overflow:hidden;">
        <img data-gjs-type="image" src="https://via.placeholder.com/400x300" alt="图片" style="width:100%;height:auto;display:block;" />
      </div>`,
    },
    {
      id: 'media-video',
      label: '视频',
      category: '媒体',
      content: `<div data-gjs-type="video" data-video-source="yt" data-video-url="https://www.youtube.com/watch?v=placeholder" style="max-width:100%;"></div>`,
    },
    {
      id: 'media-iframe',
      label: '嵌入',
      category: '媒体',
      content: `<div data-gjs-type="iframe-embed" style="position:relative;width:100%;max-width:100%;padding-bottom:56.25%;background:#000;overflow:hidden;"><iframe src="" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;" allowfullscreen></iframe></div>`,
    },
  ]
}

const components = (canvasMode) => {
  const isApp = canvasMode === 'APP'

  return [
    {
      id: 'comp-editable-text',
      label: '富文本块',
      category: '组件',
      content: `<div data-gjs-type="editable-text" style="padding:${px(16, isApp)};min-height:${px(48, isApp)};width:100%;">
        <p style="margin:0;color:#999;">点击编辑内容</p>
      </div>`,
    },
    {
      id: 'comp-button',
      label: '按钮',
      category: '组件',
      content: `<button style="display:inline-block;padding:${px(8, isApp)} ${px(20, isApp)};font-size:${px(14, isApp)};border:none;border-radius:${px(6, isApp)};background:#409eff;color:#fff;cursor:pointer;text-align:center;line-height:1;">按钮</button>`,
    },
    {
      id: 'comp-divider',
      label: '分割线',
      category: '组件',
      content: `<div style="height:${px(1, isApp)};background:#e0e0e0;margin:${px(16, isApp)} 0;width:100%;max-width:100%;"></div>`,
    },
    {
      id: 'comp-tag',
      label: '标签',
      category: '组件',
      content: `<span style="display:inline-block;padding:${px(2, isApp)} ${px(8, isApp)};font-size:${px(12, isApp)};border-radius:${px(4, isApp)};background:#ecf5ff;color:#409eff;border:${px(1, isApp)} solid #d9ecff;">标签</span>`,
    },
  ]
}

export default function getBlocks(canvasMode) {
  return [
    ...layout(canvasMode),
    ...text(canvasMode),
    ...media(canvasMode),
    ...components(canvasMode),
  ]
}
