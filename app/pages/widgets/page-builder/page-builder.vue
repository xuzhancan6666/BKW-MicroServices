<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">落地页编辑器</span>
      <el-button @click="loadLast">恢复上次</el-button>
      <el-button @click="exportHtml">导出 HTML</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button @click="appSetting">app</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <!-- GrapesJS 容器 -->
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import 'grapesjs/dist/css/grapes.min.css'
import zh from 'grapesjs/locale/zh'
import customBlocks from './blocks'
import { inlineStyles } from './html-utils'

/* ========== Props & Emit ========== */

const props = defineProps({
  pageId:          { type: [Number, String], default: null },
  initData:        { type: Object, default: null },
  pageTitle:       { type: String, default: '' },
  pageDescription: { type: String, default: '' },
  pageStatus:      { type: Number, default: 0 },
  initAppMode:     { type: Boolean, default: false },
})

const emit = defineEmits(['save', 'back'])

/* ========== State ========== */

const editorContainer = ref()
let editor = null
const STORAGE_KEY = 'grapesjs_page_data'

/* ========== Editor Initialization ========== */

function initEditor() {
  editor = grapesjs.init({
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    storageManager: { type: 'local', autosave: true, autoload: false, stepsBeforeSave: 1 },
    i18n: { locale: 'zh', messages: { zh } },
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: { 'gjs-preset-webpage': {} },
    showDevices: false,
  })
}

function registerCustomBlocks() {
  customBlocks.forEach(block => {
    editor.Blocks.add(block.id, {
      label: block.label,
      category: block.category,
      content: block.content,
      ...(block.media ? { media: block.media } : {}),
    })
  })
}

function setupDevices() {
  console.log('editor.DeviceManager', editor.DeviceManager)
  editor.DeviceManager.add('app')
}

function setupPanels() {
  editor.on('component:selected', () => {
    const openSm = editor.Panels.getButton('views', 'open-sm')
    if (openSm) openSm.set('active', true)
  })
}

function setupTraits() {
  editor.on('component:create', (component) => {
    if (component.get('type') === 'image') {
      component.set('traits', [
        { type: 'text', name: 'src', label: '图片 URL' },
        { type: 'text', name: 'alt', label: '描述' },
        { type: 'text', name: 'width', label: '宽度' },
        { type: 'text', name: 'height', label: '高度' },
      ])
    }
  })
}

function loadInitialData() {
  // 默认选择模式（非拖拽），避免误触
  editor.setDragMode('select')

  if (props.initData) {
    applyProjectData(props.initData)
  } else if (props.initAppMode) {
    editor.setDevice('app')
  }
}

onMounted(() => {
  initEditor()
  window.__gjsEditor = editor // 调试用
  registerCustomBlocks()
  setupDevices()
  setupPanels()
  setupTraits()
  loadInitialData()
})

/* ========== Watchers ========== */

watch(() => props.initAppMode, (val) => {
  if (editor) editor.setDevice(val ? 'app' : 'desktop')
}, {immediate: true})

/* ========== Project Data ========== */

function clearEditorCanvas() {
  editor.DomComponents.clear()
  editor.CssComposer.clear()
}

function applyProjectData(data) {
  editor.loadProjectData(data)
  if (data._appMode) editor.setDevice('app')
}

/** 外部调用：加载项目数据（editor-view 切换页面时使用） */
function loadPageData(data) {
  if (!editor) return
  // loadProjectData 内部会全量替换组件和样式，无需先 clear
  if (data) applyProjectData(data)
}

defineExpose({ loadPageData })

/* ========== Save ========== */

function handleSave() {
  if (!editor) return
  if (!props.pageTitle && !props.pageId) {
    ElMessage.warning('页面名称不能为空')
    return
  }

  const projectData = editor.getProjectData()
  projectData._appMode = props.initAppMode
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)

  emit('save', {
    pageId: props.pageId,
    title: props.pageTitle,
    description: props.pageDescription,
    status: props.pageStatus,
    mode: editor.getDevice() === 'app' ? 1 : 0,
    content_json: JSON.stringify(projectData),
    content_html: inlined,
  })

  localStorage.setItem(STORAGE_KEY, JSON.stringify(projectData))
  localStorage.setItem('grapesjs_export_html', inlined)
}

/* ========== Export ========== */

function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)
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

/* ========== Actions ========== */

function goBack() {
  emit('back')
}

function loadLast() {
  if (!editor) return
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) editor.loadProjectData(JSON.parse(raw))
}

function clearCanvas() {
  if (!editor) return
  clearEditorCanvas()
  ElMessage.success('画布已清空')
}

function appSetting() {
  setupDevices()
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
.editor-container :deep(.gjs-devices) {
  display: none;
}
</style>
