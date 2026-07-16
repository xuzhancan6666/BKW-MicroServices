import { ref } from 'vue'

/**
 * 将 HTML 写入组件的 content 属性并同步 DOM
 * GrapesJS v0.22 优先使用子组件序列化，子组件为空时才用 content 属性
 */
function setComponentContent(comp, html) {
  comp.empty()
  comp.set('content', html)
  const el = comp.getEl()
  if (el) el.innerHTML = html
}

/**
 * useRichTextModal — 富文本弹窗交互 composable
 *
 * 所有状态在函数作用域内，每次调用独立，不会跨编辑器实例污染。
 *
 * 交互流程：
 *  1. 拖入富文本块 → 显示默认占位内容
 *  2. 用户选中组件，在属性面板点击"编辑内容"按钮
 *  3. 弹出富文本弹窗，编辑完成点确认
 *  4. 内容 + 样式写入对应节点
 */
export function useRichTextModal() {
  const showRichTextModal = ref(false)
  const modalInitialContent = ref('')
  let activeComponent = null
  let editor = null

  function openModal(component) {
    activeComponent = component
    const el = component.getEl()
    modalInitialContent.value = el?.innerHTML || component.get('content') || ''
    showRichTextModal.value = true
  }

  function onRichTextConfirm(html) {
    if (!activeComponent) return
    setComponentContent(activeComponent, html)
    activeComponent = null
    showRichTextModal.value = false
  }

  function onRichTextCancel() {
    activeComponent = null
    showRichTextModal.value = false
  }

  function init(ed) {
    editor = ed

    // 注册组件类型
    ed.DomComponents.addType('editable-text', {
      model: {
        defaults: {
          name: '富文本',
          draggable: true,
          resizable: {
            keyWidth: 'width',
            keyHeight: 'height',
            handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
            min_dim: 20,
          },
          style: { width: '100%' },
          traits: [
            {
              type: 'button',
              name: 'edit-content',
              label: '编辑内容',
              text: '打开富文本编辑器',
              command: 'open-rich-text-modal',
            },
          ],
        },
      },
    })

    // 注册命令：traits 面板按钮触发
    ed.Commands.add('open-rich-text-modal', {
      run(editor) {
        const component = editor.getSelected()
        if (!component || component.get('type') !== 'editable-text') return
        if (activeComponent) return
        openModal(component)
      },
    })

    // 加载数据后恢复 DOM 内容（不自动弹窗）
    ed.on('component:mount', (component) => {
      if (component.get('type') !== 'editable-text') return
      const content = component.get('content')
      if (content) {
        const el = component.getEl()
        if (el) el.innerHTML = content
      }
    })
  }

  function loadData(ed, data) {
    ed.loadProjectData(data)
  }

  function clearMap() {
    activeComponent = null
  }

  return {
    showRichTextModal,
    modalInitialContent,
    init,
    loadData,
    clearMap,
    onRichTextConfirm,
    onRichTextCancel,
  }
}
