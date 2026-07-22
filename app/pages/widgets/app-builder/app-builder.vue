<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">APP页面编辑器</span>
      <el-button @click="clearCanvas">清空画布</el-button>
      <el-button @click="exportHtml">导出 HTML</el-button>
      <el-button @click="toggleTheme">{{ isLightTheme ? '☀' : '☾' }}</el-button>
      <el-button type="primary" @click="handleSave">保存</el-button>
    </div>
    <!-- GrapesJS 容器 -->
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { ElMessage } from 'element-plus'
import grapesjs from 'grapesjs'
import 'grapesjs/dist/css/grapes.min.css'
import '../page-builder/theme-light.css'
import { inlineStyles, convertPxToRem, getFlexibleScript, buildExportHtml } from '../page-builder/util/html-utils'
import getAppBlocks from './blocks/index.js'
import { registerElementBlockTypes } from '../page-builder/blocks/element-ui/index.js'
import { registerNavMenuType } from '../page-builder/widgets/nav-menu/index.js'
import getLocaleConfig from '../page-builder/locales/index.js'
import getAppStyleManager from './style-manager/index.js'
import curl from '$common/curl.js'

/* ========== Props & Emit ========== */

const props = defineProps({
  pageId:   { type: [Number, String], default: null },
  initData: { type: Object, default: null },
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

/** APP模式固定为 mobilePortrait */
const gjsDevice = 'mobilePortrait'

/* ========== Editor Initialization ========== */

function initSetting() {
  return {
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    i18n: getLocaleConfig('zh_CN'),
    styleManager: getAppStyleManager(),
    selectorManager: { componentFirst: true },
    layerManager: { appendTo: '.layers-container' },
    storageManager: { type: null },
    deviceManager: {
      default: 'appMobile',
      devices: [
        { id: 'appMobile', name: 'APP', width: '375px', height: '100%', widthMedia: '375px' },
      ],
    },
    showDevices: false
  }
}

function initEditor() {
  const setting = initSetting()
  editor = grapesjs.init(setting)
  if (editorContainer.value && isLightTheme.value) {
    editorContainer.value.classList.add('theme-light')
  }
}

/** 注册 APP 布局组件类型 */
function registerLayoutComponent() {
  // APP块（手机端基础容器）
  editor.DomComponents.addType('app-block', {
    model: {
      defaults: {
        name: 'APP块',
        draggable: true,
        resizable: {
          keyWidth: 'width',
          keyHeight: 'height',
          handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
          min_dim: 16,
        },
        layoutDirection: 'vertical',
        borderColor: '#f5f5f5',
        style: {
          minHeight: '1rem',
          minWidth: '1rem',
          border: '1px solid #f5f5f5',
          display: 'flex',
          flexDirection: 'column',
        },
        traits: [
          {
            type: 'select', label: '布局方向', name: 'layoutDirection', changeProp: 1,
            options: [
              { value: 'vertical', name: '纵向' },
              { value: 'horizontal', name: '横向' },
            ],
          },
          { type: 'color', label: '边框颜色', name: 'borderColor', changeProp: 1 },
        ],
      },
    },
  })

  // 覆盖默认 image 类型
  editor.DomComponents.addType('image', {
    extend: 'image',
    model: {
      defaults: {
        resizable: {
          keyWidth: 'width', keyHeight: 'height',
          handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
          min_dim: 20,
        },
      },
    },
  })

  editor.DomComponents.addType('iframe-embed', {
    model: {
      defaults: { name: '嵌入', resizable: true, draggable: true },
    },
  })
}

/** 注册 APP blocks */
function registerAppBlocks() {
  const blocks = getAppBlocks()
  blocks.forEach(block => {
    editor.Blocks.add(block.id, {
      label: block.label,
      category: block.category,
      content: block.content,
      ...(block.media ? { media: block.media } : {}),
    })
  })
}

/** 设置 traits 事件 */
function setupTraits() {
  editor.on('component:create', (component) => {
    if (component.get('type') === 'image') {
      component.set('traits', [
        { type: 'text', name: 'src', label: '图片 URL', changeProp: 1 },
        { type: 'text', name: 'alt', label: '描述', changeProp: 1 },
      ])
    }
  })

  // APP块：布局方向切换
  editor.on('component:update:layoutDirection', (component) => {
    if (component.get('type') !== 'app-block') return
    const el = component.getEl()
    if (!el) return
    const dir = component.get('layoutDirection')
    el.style.flexDirection = dir === 'horizontal' ? 'row' : 'column'
    if (dir === 'horizontal') el.style.flexWrap = 'wrap'
    else el.style.flexWrap = ''
  })

  // APP块：边框颜色
  editor.on('component:update:borderColor', (component) => {
    if (component.get('type') !== 'app-block') return
    const el = component.getEl()
    if (!el) return
    el.style.borderColor = component.get('borderColor') || '#f5f5f5'
  })

  // APP块：挂载时同步 trait → 样式
  editor.on('component:mount', (component) => {
    if (component.get('type') !== 'app-block') return
    const el = component.getEl()
    if (!el) return
    const dir = component.get('layoutDirection')
    if (dir === 'horizontal') {
      el.style.flexDirection = 'row'
    } else {
      el.style.flexDirection = 'column'
    }
    const bc = component.get('borderColor') || '#f5f5f5'
    component.set('borderColor', bc)
    el.style.borderColor = bc
  })
}

/** 加载初始数据 */
function loadInitialData() {
  editor.setDragMode('select')
  if (props.initData) {
    editor.loadProjectData(props.initData)
  }
}

onMounted(async () => {
  initEditor()
  registerLayoutComponent()
  registerNavMenuType(editor)
  registerElementBlockTypes(editor)
  registerAppBlocks()
  editor.Panels.removeButton('views', 'open-layers')
  setupTraits()
  loadInitialData()
})

/* ========== Project Data ========== */

function clearEditorCanvas() {
  editor.DomComponents.clear()
  editor.CssComposer.clear()
}

function loadPageData(data) {
  if (!editor) return
  if (data) editor.loadProjectData(data)
}

defineExpose({ loadPageData })

/* ========== Export ========== */

function getCanvasHeadStyles() {
  const canvasDoc = editor.Canvas.getDocument()
  if (!canvasDoc) return ''
  let result = ''
  canvasDoc.querySelectorAll('head > style').forEach(s => {
    const text = (s.textContent || '').trim()
    if (text && !/^\[data-gjs/.test(text)) {
      result += text + '\n'
    }
  })
  return result
}

function getMergedCss() {
  const headCss = getCanvasHeadStyles()
  const composerCss = editor.getCss() || ''
  return headCss + '\n' + composerCss
}

function exportHtml() {
  if (!editor) return
  const css = getMergedCss()
  const remCss = convertPxToRem(css)
  const flexScript = getFlexibleScript(375, 540, 16)
  const fullHtml = buildExportHtml({
    html: editor.getHtml(),
    css: remCss,
    js: editor.getJs(),
    editorType: 'page',
  })
  // 注入柔性缩放脚本
  const injected = fullHtml.replace('</body>', flexScript + '\n</body>')
  const blob = new Blob([injected], { type: 'text/html;charset=utf-8' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'app-page.html'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 app-page.html')
}

/* ========== Save ========== */

function handleSave() {
  if (!editor) return

  const projectData = editor.getProjectData()
  const html = editor.getHtml()
  const css = editor.getCss() || ''

  // APP 模式：px → rem + 柔性脚本
  const remCss = convertPxToRem(css)
  let inlined = inlineStyles(html, remCss)
  const flexScript = getFlexibleScript(375, 540, 16)
  const styleTag = remCss ? '<style>\n' + remCss + '\n</style>' : ''
  const finalHtml = styleTag + '\n' + inlined + '\n' + flexScript

  emit('save', {
    pageId: props.pageId,
    mode: 1, // APP 模式标识
    content_json: JSON.stringify(projectData),
    content_html: finalHtml,
  })
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
/* GrapesJS 全局样式 */
.gjs-pn-buttons {
  justify-content: flex-end;
}
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
