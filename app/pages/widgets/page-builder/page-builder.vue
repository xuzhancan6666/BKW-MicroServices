<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">落地页编辑器</span>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button v-if="editorType === 'page'" @click="exportHtml">导出 HTML</el-button>
      <el-button @click="toggleTheme">{{ isLightTheme ? '☀' : '☾' }}</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <!-- GrapesJS 容器 -->
    <div ref="editorContainer" class="editor-container"></div>
    <!-- 富文本弹窗 -->
    <rich-text-modal
      v-if="showRichTextModal"
      :initial-content="modalInitialContent"
      @confirm="onRichTextConfirm"
      @cancel="onRichTextCancel"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import './theme-light.css'
import { inlineStyles, wrapPcContainer } from './util/html-utils'
import getBlocks from './blocks.js'
import getStyleManager from './style-manager'
import getLocaleConfig from './locales'
import RichTextModal from './widgets/rich-text/rich-text-modal.vue'
import { useRichTextModal } from './widgets/rich-text/index.js'
import { registerComponentInstanceType } from './widgets/component-instance/index.js'
import curl from '$common/curl.js'

/* ========== Props & Emit ========== */

const props = defineProps({
  pageId:     { type: [Number, String], default: null },
  initData:   { type: Object, default: null },
  lang:       { type: String, default: 'zh_CN' },
  editorType: { type: String, default: 'page' },
})

const emit = defineEmits(['save', 'back'])

/* ========== State ========== */

const editorContainer = ref()
let editor = null
const isLightTheme = ref(localStorage.getItem('gjs-theme') !== 'dark')

// 组件引用相关
const componentList = ref([])    // { id, title, content_html }[]
const componentLoaded = ref(false)

function toggleTheme() {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('gjs-theme', isLightTheme.value ? 'light' : 'dark')
  editorContainer.value?.classList.toggle('theme-light', isLightTheme.value)
}

/** 使用 desktop 设备 */
const gjsDevice = 'desktop'

/* ========== 富文本弹窗 ========== */

const {
  showRichTextModal,
  modalInitialContent,
  init: rteInit,
  loadData: rteLoadData,
  clearMap: rteClearMap,
  onRichTextConfirm,
  onRichTextCancel,
} = useRichTextModal()

/* ========== Editor Initialization ========== */

function initSetting() {
  return {
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    i18n: getLocaleConfig(props.lang),
    device: gjsDevice,
    showDevices: false,
    styleManager: getStyleManager(props.lang),
    selectorManager: { componentFirst: true },
    layerManager: { appendTo: '.layers-container' },
    storageManager: { type: null },
  }
}

function initEditor() {
  const setting = initSetting()
  editor = grapesjs.init(setting)
  // 应用初始主题
  if (editorContainer.value && isLightTheme.value) {
    editorContainer.value.classList.add('theme-light')
  }
}

/** 注册 layout 组件类型 */
function registerLayoutComponent() {
  editor.DomComponents.addType('resizable-div', {
    model: {
      defaults: {
        name: '自由块',
        draggable: true,
        style: { minHeight: '64px' },
      },
    },
  })
  // 覆盖默认 image 类型，配置 resize 行为
  editor.DomComponents.addType('image', {
    extend: 'image',
    model: {
      defaults: {
        resizable: {
          keyWidth: 'width',
          keyHeight: 'height',
          handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
          min_dim: 20,
        },
      },
    },
  })
  editor.DomComponents.addType('iframe-embed', {
    model: {
      defaults: {
        name: '嵌入',
        resizable: true,
        draggable: true,
      },
    },
  })
}

/** 注册 blocks.js 中定义的全部自定义组件块 */
function registerCustomBlocks() {
  const customBlocks = getBlocks()
  customBlocks.forEach(block => {
    editor.Blocks.add(block.id, {
      label: block.label,
      category: block.category,
      content: block.content,
      ...(block.media ? { media: block.media } : {}),
    })
  })
}

/** 从 API 拉取所有组件并注册为 block（仅 page 模式） */
async function fetchAndRegisterComponentBlocks() {
  const res = await curl({
    method: 'get',
    url: '/api/page/content/list',
    query: { type: 'component', size: 1000 },
  })
  componentList.value = res?.data || []

  // 先注册 component-instance 类型
  registerComponentInstanceType(editor)

  // 再将每个组件注册为 block
  componentList.value.forEach(comp => {
    const id = comp.id
    const html = comp.content_html || '<div style="padding:16px;color:#999;">组件内容为空</div>'
    editor.Blocks.add('component-ref-' + id, {
      label: comp.title || ('组件 #' + id),
      category: '自定义组件',
      content: '<div data-gjs-type="component-instance" data-component-id="' + id + '" data-component-name="' + (comp.title || '') + '">' + html + '</div>',
      media: '<div style="padding:8px;text-align:center;font-size:12px;color:#999;">📦 ' + (comp.title || '组件').slice(0, 8) + '</div>',
    })
  })
  componentLoaded.value = true
}

/** 为组件覆写属性面板（traits） */
function setupTraits() {
  editor.on('component:create', (component) => {
    if (component.get('type') === 'image') {
      component.set('traits', [
        { type: 'text', name: 'src', label: '图片 URL', changeProp: 1 },
        { type: 'text', name: 'alt', label: '描述', changeProp: 1 },
      ])
    }
  })
}

/**
 * 初始化编辑器数据
 */
function loadInitialData() {
  editor.setDragMode('select')
  if (props.initData) {
    console.log('loadInitialData: initData keys =', Object.keys(props.initData))
    console.log('loadInitialData: pages count =', props.initData.pages?.length)
    if (props.initData.pages?.[0]?.frames?.[0]?.component) {
      const comp = props.initData.pages[0].frames[0].component
        }
    editor.loadProjectData(props.initData)
  } else {
    console.log('loadInitialData: no initData, starting with empty canvas')
  }
}

onMounted(async () => {
  initEditor()
  // 先注册基础组件类型
  registerLayoutComponent()
  // 注册 BLock
  registerCustomBlocks()
  // 隐藏布局管理器按钮（业务人员不需要）
  editor.Panels.removeButton('views', 'open-layers')
  // 再初始化富文本（注册 editable-text 类型、命令、事件）
  rteInit(editor)
  setupTraits()
  // Page 模式下从 API 拉取组件并注册为 block
  if (props.editorType === 'page') {
    await fetchAndRegisterComponentBlocks()
  }
  loadInitialData()
})

/* ========== Project Data ========== */

function clearEditorCanvas() {
  editor.DomComponents.clear()
  editor.CssComposer.clear()
  rteClearMap()
}

/** 外部调用：加载项目数据（editor-view 切换页面时使用） */
function loadPageData(data) {
  if (!editor) return
  if (data) editor.loadProjectData(data)
}

defineExpose({ loadPageData })

/* ========== 组件实例引用处理 ========== */

/** 递归遍历 component 树，剥离 component-instance 的子内容（保存引用而非快照） */
function stripComponentInstances(data) {
  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'component-instance') {
      node.components = []
      return
    }
    if (Array.isArray(node.components)) {
      node.components.forEach(walk)
    }
  }
  if (data?.pages) {
    data.pages.forEach(page => {
      if (page.frames) {
        page.frames.forEach(frame => {
          if (frame.component) walk(frame.component)
        })
      }
    })
  }
}

/* ========== Save ========== */

function handleSave() {
  if (!editor) return

  const projectData = editor.getProjectData()
  // 剥离 component-instance 子内容，只保留引用 ID
  stripComponentInstances(projectData)

  const html = editor.getHtml()
  const fullCss = editor.getCss()
  console.log('html', html)
  console.log('fullCss', fullCss)
  // 组件：剥离 <body> 包裹 + 内联样式，确保内容独立完整
  // 页面：内联样式后包裹自适应容器
  let inlined
  if (props.editorType === 'component') {
    inlined = inlineStyles(html, fullCss)
  } else {
    inlined = inlineStyles(html, fullCss)
    inlined = wrapPcContainer(inlined)
  }
  console.log('inlined..', inlined)
  // return
  emit('save', {
    pageId: props.pageId,
    mode: 0,
    content_json: JSON.stringify(projectData),
    content_html: inlined,
  })
}

/* ========== Export ========== */

function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  let inlined = inlineStyles(html, fullCss)

  // 外层包裹自适应容器
  inlined = wrapPcContainer(inlined)

  const fullHtml = [
    '<!DOCTYPE html>',
    '<html lang="zh-CN">',
    '<head>',
    '  <meta charset="UTF-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body>',
    inlined,
    '</body>',
    '</html>',
  ].join('\n')
  const blob = new Blob([fullHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.html'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 page.html')
}

/* ========== Sync ========== */

async function handleSync() {
  if (!props.pageId) return
  try {
    const res = await curl({
      method: 'post',
      url: '/api/page/content/' + props.pageId + '/sync',
    })
    if (res?.success) {
      const count = res.data?.updatedPages || 0
      if (count > 0) {
        ElMessage.success('已更新 ' + count + ' 个页面的引用数据，这些页面需重新发布')
      } else {
        ElMessage.info('没有页面引用此组件')
      }
    } else {
      ElMessage.error('同步失败')
    }
  } catch {
    ElMessage.error('同步请求失败')
  }
}

/* ========== Actions ========== */

function goBack() {
  emit('back')
}

function clearCanvas() {
  if (!editor) return
  clearEditorCanvas()
  ElMessage.success('画布已清空')
}

onBeforeUnmount(() => {
  editor?.destroy()
  editor = null
})
</script>

<style scoped>
.page-editor {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.editor-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
  z-index: 10;
  flex-shrink: 0;
}
.page-title {
  flex: 1;
  font-weight: 600;
}
.editor-container {
  flex: 1;
  overflow: hidden;
}
</style>

<style>
/* ========== GrapesJS 全局样式 ========== */
.gjs-pn-buttons {
  justify-content: flex-end;
}

/* 属性面板按钮 trait 样式 */
.gjs-trt-trait .gjs-field button[data-trait-command] {
  width: 100%;
  padding: 6px 12px;
  border: 1px solid #409eff;
  border-radius: 4px;
  background: #409eff;
  color: #fff;
  font-size: 13px;
  cursor: pointer;
  transition: background .2s;
}
.gjs-trt-trait .gjs-field button[data-trait-command]:hover {
  background: #3a8ee6;
  border-color: #3a8ee6;
}
</style>
