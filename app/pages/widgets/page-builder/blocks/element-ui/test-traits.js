/**
 * test-traits.js — 测试自定义组件 traits 是否能正常显示
 */
export function getTestBlocks() {
  return [
    {
      id: 'test-traits-block',
      label: '测试traits',
      category: '测试',
      content: `<div data-gjs-type="test-box" class="test-box" style="padding:20px;background:#f0f9eb;border:1px solid #e1f3d8;text-align:center;border-radius:4px;">
  <span class="test-box__label">测试组件</span>
</div>`,
    },
  ]
}

export function registerTestType(editor) {
  editor.DomComponents.addType('test-box', {
    isComponent(el) {
      if (el.nodeType === 1 && el.classList.contains('test-box')) {
        return { type: 'test-box' }
      }
    },
    model: {
      defaults: {
        draggable: true,
        traits: [
          { type: 'text', label: '链接地址', name: 'data-url', placeholder: 'https:// 或 /path' },
          { type: 'select', label: '跳转方式', name: 'data-target', options: [
            { value: '_self', name: '当前窗口' },
            { value: '_blank', name: '新窗口' },
          ]},
        ],
      },
    },
  })
}
