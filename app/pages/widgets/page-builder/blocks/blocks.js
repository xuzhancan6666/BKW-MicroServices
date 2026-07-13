/**
 * blocks/blocks.js — 所有自定义 block 定义
 * 编辑器内统一使用 px 单位，APP 导出时由导出函数做 px→rem 转换
 */

import { getNavMenuBlocks } from '../widgets/nav-menu/index.js'
import { getElementBlocks } from './element-ui/index.js'

const px = (v) => {
  return v + 'px'
}

const layout = () => [
  {
    id: 'layout-resizable',
    label: '自由块',
    category: '布局',
    content: `<div data-gjs-type="resizable-div" style="width:100%;min-width:${px(280)};min-height:${px(64)};background:#fff;"></div>`,
  },
  {
    id: 'layout-horizontal',
    label: '横向排列',
    category: '布局',
    content: `<div data-gjs-type="resizable-div" data-layout="horizontal" style="display:flex;flex-wrap:wrap;align-items:flex-start;gap:${px(8)};padding:${px(8)};background:#fff;">
      <div data-gjs-type="resizable-div" style="flex:1;min-height:${px(64)};background:#fff;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;min-height:${px(64)};background:#fff;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;min-height:${px(64)};background:#fff;"></div>
    </div>`,
  },
  {
    id: 'layout-vertical',
    label: '纵向排列',
    category: '布局',
    content: `<div data-gjs-type="resizable-div" data-layout="vertical" style="display:flex;flex-direction:column;gap:${px(8)};padding:${px(8)};background:#fff;">
      <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64)};background:#fff;"></div>
      <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64)};background:#fff;"></div>
      <div data-gjs-type="resizable-div" style="width:100%;min-height:${px(64)};background:#fff;"></div>
    </div>`,
  },
]

const text = () => {
  const base = {
    h1: `font-size:${px(22)};font-weight:700;color:#333;margin:0 0 ${px(8)};padding:0;`,
    p: `font-size:${px(14)};color:#555;line-height:1.6;margin:0 0 ${px(8)};padding:0;`,
    li: `font-size:${px(13)};color:#555;line-height:1.8;`,
    blockquote: `margin:0;padding:${px(12)} ${px(16)};border-left:${px(3)} solid #409eff;background:#f8f9fa;font-size:${px(14)};color:#666;font-style:italic;`,
  }

  return [
    { id: 'html-heading', label: '标题', category: '文本', content: `<h1 style="${base.h1}">标题文字</h1>` },
    { id: 'html-paragraph', label: '段落', category: '文本', content: `<p style="${base.p}">这是一段段落文字，可自由编辑内容。</p>` },
    { id: 'html-list', label: '列表', category: '文本', content: `<ul style="padding-left:${px(20)};margin:0;${base.li}"><li>列表项目一</li><li>列表项目二</li><li>列表项目三</li></ul>` },
    { id: 'html-blockquote', label: '引用', category: '文本', content: `<blockquote style="${base.blockquote}">这是一段引用文字。</blockquote>` },
  ]
}

const media = () => [
  {
    id: 'media-image', label: '图片', category: '媒体',
    content: `<img data-gjs-type="image" src="https://via.placeholder.com/200x200" alt="图片" style="width:200px;height:200px;" />`,
  },
  {
    id: 'media-video', label: '视频', category: '媒体',
    content: `<div data-gjs-type="video" data-video-source="yt" data-video-url="https://www.youtube.com/watch?v=placeholder" style="max-width:100%;"></div>`,
  }
]

const components = () => [
  {
    id: 'comp-editable-text', label: '富文本块', category: '组件',
    content: `<div data-gjs-type="editable-text" style="padding:${px(16)};min-height:${px(48)};width:100%;"><p style="margin:0;color:#999;">点击编辑内容</p></div>`,
  },
  {
    id: 'comp-divider', label: '分割线', category: '组件',
    content: `<div style="height:${px(1)};background:#e0e0e0;margin:${px(16)} 0;width:100%;max-width:100%;"></div>`,
  },
  {
    id: 'comp-tag', label: '标签', category: '组件',
    content: `<span style="display:inline-block;padding:${px(2)} ${px(8)};font-size:${px(12)};border-radius:${px(4)};background:#ecf5ff;color:#409eff;border:${px(1)} solid #d9ecff;">标签</span>`,
  },
]

export default function getBlocks() {
  return [
    ...layout(),
    ...text(),
    ...media(),
    ...components(),
    ...getNavMenuBlocks(),
    ...getElementBlocks(),
  ]
}
