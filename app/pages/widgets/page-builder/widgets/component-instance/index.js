/**
 * component-instance 组件类型
 * 用于在页面编辑器中展示只读的组件引用实例。
 * 视觉上带蓝色虚线边框 + 右上角标签，不可编辑、不可拖入子元素。
 */
export function registerComponentInstanceType(editor) {
  editor.DomComponents.addType('component-instance', {
    model: {
      defaults: {
        name: '组件引用',
        draggable: true,
        editable: false,
        droppable: false,
        stylable: false,
        highlightable: false,
        copyable: false,
        style: { width: '100%' },
      },
    },
    view: {
      onRender() {
        const el = this.el
        if (!el) return
        const compName = el.getAttribute('data-component-name') || '未命名组件'

        // 蓝色虚线边框
        el.style.outline = '2px dashed #409eff'
        el.style.outlineOffset = '-2px'
        el.style.position = 'relative'

        // 右上角标签
        const existing = el.querySelector('.gjs-component-instance-badge')
        if (existing) existing.remove()

        const badge = document.createElement('div')
        badge.className = 'gjs-component-instance-badge'
        badge.textContent = '组件: ' + compName
        Object.assign(badge.style, {
          position: 'absolute',
          top: '0',
          right: '0',
          background: '#409eff',
          color: '#fff',
          fontSize: '11px',
          padding: '2px 6px',
          borderRadius: '0 0 0 4px',
          zIndex: '10',
          pointerEvents: 'none',
        })
        el.appendChild(badge)

        // 内部子元素禁止单独选中/拖拽
        Array.from(el.children).forEach(child => {
          if (!child.classList.contains('gjs-component-instance-badge')) {
            child.style.pointerEvents = 'none'
          }
        })
      },
    },
  })
}
