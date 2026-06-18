import { ref, watch } from 'vue'

/* ========== 富文本内容集合（ref + deep watch 驱动持久化） ========== */

/** 内容数据源，key = componentId, value = html */
const contentMap = ref({})

/**
 * 从画布遍历所有 editable-text 组件，将 data-rte-content 同步到 contentMap
 */
function initContentMap(editor) {
  const next = {}
  if (editor) {
    const wrapper = editor.getWrapper()
    if (wrapper) {
      wrapper.findType('editable-text').forEach((comp) => {
        const id = comp.getId()
        if (!id) return
        const attrs = comp.getAttributes()
        const content = attrs['data-rte-content'] || comp.get('content') || comp.getEl()?.innerHTML || ''
        if (content) next[id] = content
      })
    }
  }
  contentMap.value = next
}

/**
 * useRichTextModal — 富文本弹窗交互 composable
 *
 * 读写统一走 contentMap ref，deep watch 自动将变更同步到组件 data-rte-content 属性。
 */
export function useRichTextModal() {
  /* ---- 弹窗状态 ---- */
  const showRichTextModal = ref(false)
  const modalInitialContent = ref('')
  let activeComponent = null
  let suppressModal = false

  /* ---- 弹窗交互 ---- */

  function openRichTextModal(component) {
    activeComponent = component
    const id = component.getId()
    const content = contentMap.value[id] || component.getEl()?.innerHTML || ''
    modalInitialContent.value = content
    showRichTextModal.value = true
  }

  function onRichTextConfirm(html) {
    if (!activeComponent) return
    const id = activeComponent.getId()
    // 更新组件模型 content 属性（确保 getProjectData() 正确序列化）
    activeComponent.set('content', html)
    // contentMap watch 自动同步到 data-rte-content 属性 + DOM
    contentMap.value[id] = html
    activeComponent = null
    showRichTextModal.value = false
  }

  function onRichTextCancel() {
    activeComponent = null
    showRichTextModal.value = false
  }

  /* ---- 持久化：contentMap → 组件 data-rte-content 属性 ---- */

  let _editor = null

  watch(
    contentMap,
    (map) => {
      if (!_editor) return
      const wrapper = _editor.getWrapper()
      if (!wrapper) return
      wrapper.findType('editable-text').forEach((comp) => {
        const id = comp.getId()
        if (!id || !map[id]) return
        const attrs = comp.getAttributes()
        if (attrs['data-rte-content'] !== map[id]) {
          comp.set('attributes', { ...attrs, 'data-rte-content': map[id] }, { silent: true })
        }
        // 同步 DOM 内容（解决加载已有数据时画布显示默认内容的问题）
        const el = comp.getEl()
        if (el && el.innerHTML !== map[id]) {
          el.innerHTML = map[id]
        }
      })
    },
    { deep: true },
  )

  /* ---- GrapesJS 集成 ---- */

  function init(editor) {
    _editor = editor

    // 注册组件类型
    editor.DomComponents.addType('editable-text', {
      model: {
        defaults: {
          name: '富文本',
          draggable: true,
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
    editor.Commands.add('open-rich-text-modal', {
      run(ed) {
        const component = ed.getSelected()
        if (!component || activeComponent) return
        openRichTextModal(component)
      },
    })

    // 拖入/加载时自动弹窗 + 同步 contentMap
    editor.on('component:mount', (component) => {
      if (component.get('type') !== 'editable-text') return
      // 将组件内容写入 contentMap（watch 自动持久化 data-rte-content）
      const id = component.getId()
      if (id) {
        const attrs = component.getAttributes()
        const content = attrs['data-rte-content'] || component.getEl()?.innerHTML || ''
        if (content) contentMap.value[id] = content
      }
      // 新拖入时自动弹窗
      if (!suppressModal) openRichTextModal(component)
    })
  }

  function loadData(editor, data) {
    suppressModal = true
    try {
      editor.loadProjectData(data)
    } finally {
      suppressModal = false
    }
    initContentMap(editor)
  }

  function clearMap() {
    contentMap.value = {}
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
