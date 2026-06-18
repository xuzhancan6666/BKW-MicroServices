const pc = [
  // ==================== 布局（PC，px 单位） ====================
  {
    id: 'layout-resizable',
    label: '自由块',
    category: '布局',
    componentName: 'CQLayout',
    content: `<div data-gjs-type="resizable-div" style="min-width:100px;min-height:64px;background:#f0f0f0;"></div>`,
  },
  {
    id: 'layout-horizontal',
    label: '横向排列',
    category: '布局',
    componentName: 'CQLayoutH',
    content: `<div data-gjs-type="resizable-div" data-layout="horizontal" style="display:flex;align-items:flex-start;gap:4px;padding:8px;background:#f0f0f0;">
      <div data-gjs-type="resizable-div" style="flex:1;height:64px;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;height:64px;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;height:64px;background:#fafafa;"></div>
    </div>`,
  },
  {
    id: 'layout-vertical',
    label: '纵向排列',
    category: '布局',
    componentName: 'CQLayoutV',
    content: `<div data-gjs-type="resizable-div" data-layout="vertical" style="display:flex;flex-direction:column;gap:4px;padding:8px;background:#f0f0f0;">
      <div data-gjs-type="resizable-div" style="height:64px;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="height:64px;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="height:64px;background:#fafafa;"></div>
    </div>`,
  },
]

const app = [
  // ==================== 布局（APP 端，rem 单位） ====================
  {
    id: 'layout-resizable',
    label: '自由块',
    category: '布局',
    componentName: 'CQLayout',
    content: `<div data-gjs-type="resizable-div" style="min-width:6.25rem;min-height:4rem;background:#f0f0f0;"></div>`,
  },
  {
    id: 'layout-horizontal',
    label: '横向排列',
    category: '布局',
    componentName: 'CQLayoutH',
    content: `<div data-gjs-type="resizable-div" data-layout="horizontal" style="display:flex;align-items:flex-start;gap:0.25rem;padding:0.5rem;background:#f0f0f0;">
      <div data-gjs-type="resizable-div" style="flex:1;height:4rem;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;height:4rem;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="flex:1;height:4rem;background:#fafafa;"></div>
    </div>`,
  },
  {
    id: 'layout-vertical',
    label: '纵向排列',
    category: '布局',
    componentName: 'CQLayoutV',
    content: `<div data-gjs-type="resizable-div" data-layout="vertical" style="display:flex;flex-direction:column;gap:0.25rem;padding:0.5rem;background:#f0f0f0;">
      <div data-gjs-type="resizable-div" style="height:4rem;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="height:4rem;background:#fafafa;"></div>
      <div data-gjs-type="resizable-div" style="height:4rem;background:#fafafa;"></div>
    </div>`,
  },
]

export default (canvasMode) => canvasMode === 'APP' ? app : pc
