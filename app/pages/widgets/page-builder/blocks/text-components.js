const pc = [
  // ==================== 文本组件（PC，px 单位） ====================
  {
    id: 'comp-editable-text',
    label: '富文本块',
    category: '文本组件',
    content: `<div data-gjs-type="editable-text" style="padding:16px;min-height:48px;width:100%;">
      <p style="margin:0;color:#999;">点击编辑内容</p>
    </div>`,
  },
  {
    id: 'text-heading',
    label: '标题',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:24px 0;text-align:center;">
      <p style="margin:0 0 8px;font-size:12px;color:#06b6d4;letter-spacing:4px;font-family:monospace;">&lt;TITLE /&gt;</p>
      <h1 style="margin:0 0 8px;font-size:32px;font-weight:700;color:#1a1a2e;letter-spacing:2px;">构建智能未来</h1>
      <div style="width:60px;height:2px;background:linear-gradient(90deg,#06b6d4,#7c3aed);margin:0 auto;"></div>
    </div>`,
  },
  {
    id: 'text-subtitle',
    label: '章节标题',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;align-items:center;gap:12px;padding:16px 0;">
      <span style="font-size:14px;color:#06b6d4;font-family:monospace;">//</span>
      <span style="flex:1;font-size:18px;font-weight:600;color:#1a1a2e;letter-spacing:2px;">核心功能</span>
      <span style="flex:1;height:1px;background:linear-gradient(90deg,#e0e0e0,transparent);"></span>
    </div>`,
  },
  {
    id: 'text-highlight',
    label: '提示块',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:16px 20px;font-size:14px;line-height:1.8;color:#e0e0e0;background:#1a1a2e;border-radius:6px;border-left:3px solid #06b6d4;font-family:monospace;">
      <p style="margin:0;"><span style="color:#06b6d4;">$</span> 系统提示：这是一条高亮通知信息，用于引起用户关注。</p>
    </div>`,
  },
  {
    id: 'text-card',
    label: '信息卡片',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:24px;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:8px;border:1px solid rgba(6,182,212,0.2);text-align:center;">
      <p style="margin:0 0 4px;font-size:28px;color:#06b6d4;font-family:monospace;">{ }</p>
      <p style="margin:0 0 8px;font-size:16px;font-weight:600;color:#e0e0e0;">数据驱动决策</p>
      <p style="margin:0;font-size:13px;color:#8899aa;line-height:1.6;">基于实时数据分析，提供精准的业务洞察与智能化解决方案。</p>
    </div>`,
  },
  {
    id: 'text-stat',
    label: '数据看板',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;justify-content:space-around;padding:24px;background:#f8faff;border-radius:8px;border:1px solid #e8edf5;">
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#06b6d4;font-family:monospace;">99.9%</div>
        <div style="font-size:12px;color:#8899aa;margin-top:4px;">可用性</div>
      </div>
      <div style="width:1px;background:linear-gradient(180deg,transparent,#e0e0e0,transparent);"></div>
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#7c3aed;font-family:monospace;">&lt;50ms</div>
        <div style="font-size:12px;color:#8899aa;margin-top:4px;">响应延迟</div>
      </div>
      <div style="width:1px;background:linear-gradient(180deg,transparent,#e0e0e0,transparent);"></div>
      <div style="text-align:center;">
        <div style="font-size:32px;font-weight:700;color:#06b6d4;font-family:monospace;">10M+</div>
        <div style="font-size:12px;color:#8899aa;margin-top:4px;">日活用户</div>
      </div>
    </div>`,
  },
  {
    id: 'text-quote',
    label: '引用',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:24px;background:#f0f4ff;border-radius:8px;text-align:center;border:1px solid #e0e8f5;">
      <p style="margin:0 0 12px;font-size:13px;color:#7c3aed;letter-spacing:2px;font-family:monospace;">&gt;&gt; 观点 &lt;&lt;</p>
      <p style="margin:0 0 12px;font-size:18px;font-weight:400;line-height:1.8;color:#1a1a2e;font-style:italic;">"代码如同诗歌，简洁即是优雅。"</p>
      <p style="margin:0;font-size:13px;color:#8899aa;font-family:monospace;">-- engineer.log</p>
    </div>`,
  },
  {
    id: 'text-tag',
    label: '技术标签',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;flex-wrap:wrap;gap:8px;padding:12px 0;">
      <span style="display:inline-block;padding:4px 12px;font-size:12px;border-radius:4px;background:#1a1a2e;color:#06b6d4;border:1px solid rgba(6,182,212,0.3);font-family:monospace;">React</span>
      <span style="display:inline-block;padding:4px 12px;font-size:12px;border-radius:4px;background:#1a1a2e;color:#7c3aed;border:1px solid rgba(124,58,237,0.3);font-family:monospace;">Vue</span>
      <span style="display:inline-block;padding:4px 12px;font-size:12px;border-radius:4px;background:#1a1a2e;color:#06b6d4;border:1px solid rgba(6,182,212,0.3);font-family:monospace;">Python</span>
      <span style="display:inline-block;padding:4px 12px;font-size:12px;border-radius:4px;background:#1a1a2e;color:#7c3aed;border:1px solid rgba(124,58,237,0.3);font-family:monospace;">Go</span>
      <span style="display:inline-block;padding:4px 12px;font-size:12px;border-radius:4px;background:#1a1a2e;color:#06b6d4;border:1px solid rgba(6,182,212,0.3);font-family:monospace;">Docker</span>
    </div>`,
  },
]

const app = [
  // ==================== 文本组件（APP 端，rem 单位） ====================
  {
    id: 'comp-editable-text',
    label: '富文本块',
    category: '文本组件',
    content: `<div data-gjs-type="editable-text" style="padding:1rem;min-height:3rem;width:100%;">
      <p style="margin:0;color:#999;">点击编辑内容</p>
    </div>`,
  },
  {
    id: 'text-heading',
    label: '标题',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:1.5rem 0;text-align:center;">
      <p style="margin:0 0 0.5rem;font-size:0.75rem;color:#06b6d4;letter-spacing:0.25rem;font-family:monospace;">&lt;TITLE /&gt;</p>
      <h1 style="margin:0 0 0.5rem;font-size:2rem;font-weight:700;color:#1a1a2e;letter-spacing:0.125rem;">构建智能未来</h1>
      <div style="width:3.75rem;height:0.125rem;background:linear-gradient(90deg,#06b6d4,#7c3aed);margin:0 auto;"></div>
    </div>`,
  },
  {
    id: 'text-subtitle',
    label: '章节标题',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;align-items:center;gap:0.75rem;padding:1rem 0;">
      <span style="font-size:0.875rem;color:#06b6d4;font-family:monospace;">//</span>
      <span style="flex:1;font-size:1.125rem;font-weight:600;color:#1a1a2e;letter-spacing:0.125rem;">核心功能</span>
      <span style="flex:1;height:0.0625rem;background:linear-gradient(90deg,#e0e0e0,transparent);"></span>
    </div>`,
  },
  {
    id: 'text-highlight',
    label: '提示块',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:1rem 1.25rem;font-size:0.875rem;line-height:1.8;color:#e0e0e0;background:#1a1a2e;border-radius:0.375rem;border-left:0.1875rem solid #06b6d4;font-family:monospace;">
      <p style="margin:0;"><span style="color:#06b6d4;">$</span> 系统提示：这是一条高亮通知信息，用于引起用户关注。</p>
    </div>`,
  },
  {
    id: 'text-card',
    label: '信息卡片',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:1.5rem;background:linear-gradient(135deg,#1a1a2e 0%,#16213e 100%);border-radius:0.5rem;border:0.0625rem solid rgba(6,182,212,0.2);text-align:center;">
      <p style="margin:0 0 0.25rem;font-size:1.75rem;color:#06b6d4;font-family:monospace;">{ }</p>
      <p style="margin:0 0 0.5rem;font-size:1rem;font-weight:600;color:#e0e0e0;">数据驱动决策</p>
      <p style="margin:0;font-size:0.8125rem;color:#8899aa;line-height:1.6;">基于实时数据分析，提供精准的业务洞察与智能化解决方案。</p>
    </div>`,
  },
  {
    id: 'text-stat',
    label: '数据看板',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;justify-content:space-around;padding:1.5rem;background:#f8faff;border-radius:0.5rem;border:0.0625rem solid #e8edf5;">
      <div style="text-align:center;">
        <div style="font-size:2rem;font-weight:700;color:#06b6d4;font-family:monospace;">99.9%</div>
        <div style="font-size:0.75rem;color:#8899aa;margin-top:0.25rem;">可用性</div>
      </div>
      <div style="width:0.0625rem;background:linear-gradient(180deg,transparent,#e0e0e0,transparent);"></div>
      <div style="text-align:center;">
        <div style="font-size:2rem;font-weight:700;color:#7c3aed;font-family:monospace;">&lt;50ms</div>
        <div style="font-size:0.75rem;color:#8899aa;margin-top:0.25rem;">响应延迟</div>
      </div>
      <div style="width:0.0625rem;background:linear-gradient(180deg,transparent,#e0e0e0,transparent);"></div>
      <div style="text-align:center;">
        <div style="font-size:2rem;font-weight:700;color:#06b6d4;font-family:monospace;">10M+</div>
        <div style="font-size:0.75rem;color:#8899aa;margin-top:0.25rem;">日活用户</div>
      </div>
    </div>`,
  },
  {
    id: 'text-quote',
    label: '引用',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="padding:1.5rem;background:#f0f4ff;border-radius:0.5rem;text-align:center;border:0.0625rem solid #e0e8f5;">
      <p style="margin:0 0 0.75rem;font-size:0.8125rem;color:#7c3aed;letter-spacing:0.125rem;font-family:monospace;">&gt;&gt; 观点 &lt;&lt;</p>
      <p style="margin:0 0 0.75rem;font-size:1.125rem;font-weight:400;line-height:1.8;color:#1a1a2e;font-style:italic;">"代码如同诗歌，简洁即是优雅。"</p>
      <p style="margin:0;font-size:0.8125rem;color:#8899aa;font-family:monospace;">-- engineer.log</p>
    </div>`,
  },
  {
    id: 'text-tag',
    label: '技术标签',
    category: '文本组件',
    content: `<div data-gjs-type="text" style="display:flex;flex-wrap:wrap;gap:0.5rem;padding:0.75rem 0;">
      <span style="display:inline-block;padding:0.25rem 0.75rem;font-size:0.75rem;border-radius:0.25rem;background:#1a1a2e;color:#06b6d4;border:0.0625rem solid rgba(6,182,212,0.3);font-family:monospace;">React</span>
      <span style="display:inline-block;padding:0.25rem 0.75rem;font-size:0.75rem;border-radius:0.25rem;background:#1a1a2e;color:#7c3aed;border:0.0625rem solid rgba(124,58,237,0.3);font-family:monospace;">Vue</span>
      <span style="display:inline-block;padding:0.25rem 0.75rem;font-size:0.75rem;border-radius:0.25rem;background:#1a1a2e;color:#06b6d4;border:0.0625rem solid rgba(6,182,212,0.3);font-family:monospace;">Python</span>
      <span style="display:inline-block;padding:0.25rem 0.75rem;font-size:0.75rem;border-radius:0.25rem;background:#1a1a2e;color:#7c3aed;border:0.0625rem solid rgba(6,182,212,0.3);font-family:monospace;">Go</span>
      <span style="display:inline-block;padding:0.25rem 0.75rem;font-size:0.75rem;border-radius:0.25rem;background:#1a1a2e;color:#06b6d4;border:0.0625rem solid rgba(6,182,212,0.3);font-family:monospace;">Docker</span>
    </div>`,
  },
]

export default (canvasMode) => canvasMode === 'APP' ? app : pc
