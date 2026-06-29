<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">落地页编辑器</span>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button @click="exportHtml">导出 HTML</el-button>
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
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import './theme-light.css'
import { inlineStyles, wrapPcContainer, getFlexibleScript } from './util/html-utils'
import getBlocks from './blocks.js'
import getStyleManager from './style-manager'
import getLocaleConfig from './locales'
import RichTextModal from './widgets/rich-text/rich-text-modal.vue'
import { useRichTextModal } from './widgets/rich-text/index.js'

/* ========== Props & Emit ========== */

const props = defineProps({
  pageId:    { type: [Number, String], default: null },
  initData:  { type: Object, default: null },
  canvasMode:{ type: String, default: 'PC' },
  lang:      { type: String, default: 'zh_CN' }, // zh_CN | zh_HK | en_US
})

const emit = defineEmits(['save', 'back'])

/* ========== State ========== */

const editorContainer = ref()
let editor = null
const isLightTheme = ref(localStorage.getItem('gjs-theme') !== 'dark')

function toggleTheme() {
  isLightTheme.value = !isLightTheme.value
  localStorage.setItem('gjs-theme', isLightTheme.value ? 'light' : 'dark')
  editorContainer.value?.classList.toggle('theme-light', isLightTheme.value)
}

/** PC 使用 desktop 设备，APP 用自定义 375px 设备 */
const CANVAS_WIDTH = { PC: 'desktop', APP: 'mobile-app' }
const gjsDevice = computed(() => CANVAS_WIDTH[props.canvasMode] || CANVAS_WIDTH.PC)

/** APP 模式使用的自定义设备定义 */
const appDeviceDef = { id: 'mobile-app', name: '手机', width: '375px' }

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
    device: gjsDevice.value,
    showDevices: false,
    deviceManager: {
      devices: props.canvasMode === 'APP' ? [appDeviceDef] : [],
    },
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

/** 为组件覆写属性面板（traits） */
function setupTraits() {
  editor.on('component:create', (component) => {
    if (component.get('type') === 'image') {
      component.set('traits', [
        { type: 'text', name: 'src', label: '图片 URL' },
        { type: 'text', name: 'alt', label: '描述' },
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

onMounted(() => {
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

/* ========== Save ========== */

function handleSave() {
  if (!editor) return

  const projectData = editor.getProjectData()
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  let inlined = inlineStyles(html, fullCss)

  // PC 模式：外层包裹自适应容器
  if (props.canvasMode !== 'APP') {
    inlined = wrapPcContainer(inlined)
  }

  emit('save', {
    pageId: props.pageId,
    mode: props.canvasMode === 'APP' ? 1 : 0,
    content_json: JSON.stringify(projectData),
    content_html: inlined,
  })
}

/* ========== Export ========== */

function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  console.log('getHtml:', html)
  console.log('getCss:', fullCss)
  let inlined = inlineStyles(html, fullCss)

  const headItems = ['  <meta charset="UTF-8">']

  if (props.canvasMode === 'APP') {
    // APP 模式：block 已使用 rem，注入视口缩放脚本
    inlined = '<div id="app-root">\n' + inlined + '\n</div>'
    headItems.push(
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">',
      '  <style>html,body{margin:0;padding:0;} body{font-size:16px;}</style>',
      getFlexibleScript(375),
    )
  } else {
    // PC 模式：外层包裹自适应容器
    inlined = wrapPcContainer(inlined)
    headItems.push(
      '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    )
  }

  const fullHtml = [
    '<!DOCTYPE html>',
    '<html lang="zh-CN">',
    '<head>',
    ...headItems,
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
