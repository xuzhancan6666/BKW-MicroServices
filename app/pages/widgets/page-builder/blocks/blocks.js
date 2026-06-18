const pc = [
  // ==================== 基础标签（PC，px 单位） ====================
  {
    id: 'html-heading',
    label: '标题 H1',
    category: '基础标签',
    componentName: 'CQHeading',
    content: `<h1 style="font-size:22px;font-weight:700;color:#333;margin:0 0 8px;padding:0;">标题文字</h1>`,
  },
  {
    id: 'html-heading2',
    label: '标题 H2',
    category: '基础标签',
    componentName: 'CQHeading2',
    content: `<h2 style="font-size:18px;font-weight:700;color:#333;margin:0 0 6px;padding:0;">标题文字</h2>`,
  },
  {
    id: 'html-heading3',
    label: '标题 H3',
    category: '基础标签',
    componentName: 'CQHeading3',
    content: `<h3 style="font-size:16px;font-weight:600;color:#333;margin:0 0 6px;padding:0;">标题文字</h3>`,
  },
  {
    id: 'html-paragraph',
    label: '段落',
    category: '基础标签',
    componentName: 'CQParagraph',
    content: `<p style="font-size:13px;color:#555;line-height:1.6;margin:0 0 8px;padding:0;">这是一段段落文字，可自由编辑内容。</p>`,
  },
  {
    id: 'html-span',
    label: '行内文本',
    category: '基础标签',
    componentName: 'CQSpan',
    content: `<span style="font-size:12px;color:#666;">行内文本</span>`,
  },
  {
    id: 'html-link',
    label: '超链接',
    category: '基础标签',
    componentName: 'CQLink',
    content: `<a href="#" style="color:#409eff;text-decoration:none;font-size:12px;">超链接</a>`,
  },
  {
    id: 'html-list',
    label: '无序列表',
    category: '基础标签',
    componentName: 'CQList',
    content: `<ul style="padding-left:16px;margin:0;font-size:12px;color:#555;line-height:1.8;">
      <li>列表项目一</li>
      <li>列表项目二</li>
      <li>列表项目三</li>
    </ul>`,
  },
  {
    id: 'html-blockquote',
    label: '引用',
    category: '基础标签',
    componentName: 'CQBlockquote',
    content: `<blockquote style="margin:0;padding:12px 16px;border-left:3px solid #409eff;background:#f8f9fa;font-size:12px;color:#666;font-style:italic;">这是一段引用文字。</blockquote>`,
  },
]

const app = [
  // ==================== 基础标签（APP 端，rem 单位，1rem = 16px） ====================
  {
    id: 'html-heading',
    label: '标题 H1',
    category: '基础标签',
    componentName: 'CQHeading',
    content: `<h1 style="font-size:1.375rem;font-weight:700;color:#333;margin:0 0 0.5rem;padding:0;">标题文字</h1>`,
  },
  {
    id: 'html-heading2',
    label: '标题 H2',
    category: '基础标签',
    componentName: 'CQHeading2',
    content: `<h2 style="font-size:1.125rem;font-weight:700;color:#333;margin:0 0 0.375rem;padding:0;">标题文字</h2>`,
  },
  {
    id: 'html-heading3',
    label: '标题 H3',
    category: '基础标签',
    componentName: 'CQHeading3',
    content: `<h3 style="font-size:1rem;font-weight:600;color:#333;margin:0 0 0.375rem;padding:0;">标题文字</h3>`,
  },
  {
    id: 'html-paragraph',
    label: '段落',
    category: '基础标签',
    componentName: 'CQParagraph',
    content: `<p style="font-size:0.8125rem;color:#555;line-height:1.6;margin:0 0 0.5rem;padding:0;">这是一段段落文字，可自由编辑内容。</p>`,
  },
  {
    id: 'html-span',
    label: '行内文本',
    category: '基础标签',
    componentName: 'CQSpan',
    content: `<span style="font-size:0.75rem;color:#666;">行内文本</span>`,
  },
  {
    id: 'html-link',
    label: '超链接',
    category: '基础标签',
    componentName: 'CQLink',
    content: `<a href="#" style="color:#409eff;text-decoration:none;font-size:0.75rem;">超链接</a>`,
  },
  {
    id: 'html-list',
    label: '无序列表',
    category: '基础标签',
    componentName: 'CQList',
    content: `<ul style="padding-left:1rem;margin:0;font-size:0.75rem;color:#555;line-height:1.8;">
      <li>列表项目一</li>
      <li>列表项目二</li>
      <li>列表项目三</li>
    </ul>`,
  },
  {
    id: 'html-blockquote',
    label: '引用',
    category: '基础标签',
    componentName: 'CQBlockquote',
    content: `<blockquote style="margin:0;padding:0.75rem 1rem;border-left:0.1875rem solid #409eff;background:#f8f9fa;font-size:0.75rem;color:#666;font-style:italic;">这是一段引用文字。</blockquote>`,
  },
]

export default (canvasMode) => canvasMode === 'APP' ? app : pc
