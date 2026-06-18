const pc = [
  // ==================== 基础组件（PC，px 单位） ====================
  {
    id: 'comp-divider',
    label: '分割线',
    category: '基础组件',
    content: `<div style="height:1px;background:#e0e0e0;margin:16px 0;width:100%;"></div>`,
  },
  {
    id: 'comp-tag',
    label: '标签',
    category: '基础组件',
    content: `<span style="display:inline-block;padding:2px 8px;font-size:12px;border-radius:4px;background:#ecf5ff;color:#409eff;border:1px solid #d9ecff;">标签</span>`,
  },
  {
    id: 'comp-button',
    label: '按钮',
    category: '基础组件',
    content: `<button style="display:inline-block;padding:8px 20px;font-size:14px;border:none;border-radius:6px;background:#409eff;color:#fff;cursor:pointer;text-align:center;line-height:1;">按钮</button>`,
  },
  {
    id: 'comp-steps-v',
    label: '纵向步骤条',
    category: '基础组件',
    content: `<div style="display:flex;flex-direction:column;gap:0;padding:12px 0;">
      <div style="display:flex;align-items:flex-start;gap:8px;position:relative;padding-bottom:24px;">
        <div style="width:24px;height:24px;border-radius:50%;background:#409eff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;position:relative;z-index:1;">1</div>
        <div style="flex:1;padding-top:2px;"><div style="font-size:14px;font-weight:600;color:#333;">第一步</div><div style="font-size:12px;color:#999;margin-top:4px;">描述信息</div></div>
        <div style="position:absolute;left:11px;top:24px;width:2px;height:24px;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:8px;position:relative;padding-bottom:24px;">
        <div style="width:24px;height:24px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;position:relative;z-index:1;">2</div>
        <div style="flex:1;padding-top:2px;"><div style="font-size:14px;font-weight:600;color:#333;">第二步</div><div style="font-size:12px;color:#999;margin-top:4px;">描述信息</div></div>
        <div style="position:absolute;left:11px;top:24px;width:2px;height:24px;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:8px;position:relative;">
        <div style="width:24px;height:24px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:12px;flex-shrink:0;position:relative;z-index:1;">3</div>
        <div style="flex:1;padding-top:2px;"><div style="font-size:14px;font-weight:600;color:#333;">第三步</div><div style="font-size:12px;color:#999;margin-top:4px;">描述信息</div></div>
      </div>
    </div>`,
  },
  {
    id: 'comp-steps-h',
    label: '横向步骤条',
    category: '基础组件',
    content: `<div style="display:flex;align-items:flex-start;justify-content:center;gap:0;padding:16px 0;">
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:28px;height:28px;border-radius:50%;background:#409eff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:13px;position:relative;z-index:1;">1</div>
        <div style="font-size:13px;font-weight:600;color:#333;margin-top:6px;">第一步</div>
        <div style="font-size:11px;color:#999;margin-top:2px;">描述</div>
        <div style="position:absolute;top:14px;left:calc(50% + 14px);width:calc(100% - 28px);height:2px;background:#409eff;content:'';"></div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:28px;height:28px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:13px;position:relative;z-index:1;">2</div>
        <div style="font-size:13px;font-weight:600;color:#333;margin-top:6px;">第二步</div>
        <div style="font-size:11px;color:#999;margin-top:2px;">描述</div>
        <div style="position:absolute;top:14px;left:calc(50% + 14px);width:calc(100% - 28px);height:2px;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:28px;height:28px;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:13px;position:relative;z-index:1;">3</div>
        <div style="font-size:13px;font-weight:600;color:#333;margin-top:6px;">第三步</div>
        <div style="font-size:11px;color:#999;margin-top:2px;">描述</div>
      </div>
    </div>`,
  },
]

const app = [
  // ==================== 基础组件（APP 端，rem 单位） ====================
  {
    id: 'comp-divider',
    label: '分割线',
    category: '基础组件',
    content: `<div style="height:0.0625rem;background:#e0e0e0;margin:1rem 0;width:100%;"></div>`,
  },
  {
    id: 'comp-tag',
    label: '标签',
    category: '基础组件',
    content: `<span style="display:inline-block;padding:0.125rem 0.5rem;font-size:0.75rem;border-radius:0.25rem;background:#ecf5ff;color:#409eff;border:0.0625rem solid #d9ecff;">标签</span>`,
  },
  {
    id: 'comp-button',
    label: '按钮',
    category: '基础组件',
    content: `<button style="display:inline-block;padding:0.5rem 1.25rem;font-size:0.875rem;border:none;border-radius:0.375rem;background:#409eff;color:#fff;cursor:pointer;text-align:center;line-height:1;">按钮</button>`,
  },
  {
    id: 'comp-steps-v',
    label: '纵向步骤条',
    category: '基础组件',
    content: `<div style="display:flex;flex-direction:column;gap:0;padding:0.75rem 0;">
      <div style="display:flex;align-items:flex-start;gap:0.5rem;position:relative;padding-bottom:1.5rem;">
        <div style="width:1.5rem;height:1.5rem;border-radius:50%;background:#409eff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.75rem;flex-shrink:0;position:relative;z-index:1;">1</div>
        <div style="flex:1;padding-top:0.125rem;"><div style="font-size:0.875rem;font-weight:600;color:#333;">第一步</div><div style="font-size:0.75rem;color:#999;margin-top:0.25rem;">描述信息</div></div>
        <div style="position:absolute;left:0.6875rem;top:1.5rem;width:0.125rem;height:1.5rem;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:0.5rem;position:relative;padding-bottom:1.5rem;">
        <div style="width:1.5rem;height:1.5rem;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:0.75rem;flex-shrink:0;position:relative;z-index:1;">2</div>
        <div style="flex:1;padding-top:0.125rem;"><div style="font-size:0.875rem;font-weight:600;color:#333;">第二步</div><div style="font-size:0.75rem;color:#999;margin-top:0.25rem;">描述信息</div></div>
        <div style="position:absolute;left:0.6875rem;top:1.5rem;width:0.125rem;height:1.5rem;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;align-items:flex-start;gap:0.5rem;position:relative;">
        <div style="width:1.5rem;height:1.5rem;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:0.75rem;flex-shrink:0;position:relative;z-index:1;">3</div>
        <div style="flex:1;padding-top:0.125rem;"><div style="font-size:0.875rem;font-weight:600;color:#333;">第三步</div><div style="font-size:0.75rem;color:#999;margin-top:0.25rem;">描述信息</div></div>
      </div>
    </div>`,
  },
  {
    id: 'comp-steps-h',
    label: '横向步骤条',
    category: '基础组件',
    content: `<div style="display:flex;align-items:flex-start;justify-content:center;gap:0;padding:1rem 0;">
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#409eff;color:#fff;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;position:relative;z-index:1;">1</div>
        <div style="font-size:0.8125rem;font-weight:600;color:#333;margin-top:0.375rem;">第一步</div>
        <div style="font-size:0.6875rem;color:#999;margin-top:0.125rem;">描述</div>
        <div style="position:absolute;top:0.875rem;left:calc(50% + 0.875rem);width:calc(100% - 1.75rem);height:0.125rem;background:#409eff;content:'';"></div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;position:relative;z-index:1;">2</div>
        <div style="font-size:0.8125rem;font-weight:600;color:#333;margin-top:0.375rem;">第二步</div>
        <div style="font-size:0.6875rem;color:#999;margin-top:0.125rem;">描述</div>
        <div style="position:absolute;top:0.875rem;left:calc(50% + 0.875rem);width:calc(100% - 1.75rem);height:0.125rem;background:#e0e0e0;content:'';"></div>
      </div>
      <div style="display:flex;flex-direction:column;align-items:center;flex:1;text-align:center;position:relative;">
        <div style="width:1.75rem;height:1.75rem;border-radius:50%;background:#e0e0e0;color:#999;display:flex;align-items:center;justify-content:center;font-size:0.8125rem;position:relative;z-index:1;">3</div>
        <div style="font-size:0.8125rem;font-weight:600;color:#333;margin-top:0.375rem;">第三步</div>
        <div style="font-size:0.6875rem;color:#999;margin-top:0.125rem;">描述</div>
      </div>
    </div>`,
  },
]

export default (canvasMode) => canvasMode === 'APP' ? app : pc
