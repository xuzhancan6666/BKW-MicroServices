<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">APP页面编辑器</span>
      <span class="toolbar-label">宽度：</span>
      <el-input-number
        v-model="deviceWidth"
        :min="320"
        :max="768"
        :step="5"
        size="small"
        controls-position="right"
        @change="onDeviceWidthChange"
      />
      <span class="toolbar-unit">px</span>
      <el-button @click="exportHtml">导出 HTML</el-button>
      <el-button @click="clearCanvas">清空画布</el-button>
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
import 'grapesjs-preset-webpage'
import 'grapesjs/dist/css/grapes.min.css'
import { inlineStyles } from './util/html-utils'
import getBlocks from './blocks.js'
import getStyleManager from './style-manager'
import getLocaleConfig from './locales'
import RichTextModal from './widgets/rich-text/rich-text-modal.vue'
import { useRichTextModal } from './widgets/rich-text/index.js'

/* ========== Props & Emit ========== */

const props = defineProps({
  pageId:    { type: [Number, String], default: null },
  initData:  { type: Object, default: null },
  lang:      { type: String, default: 'zh_CN' }, // zh_CN | zh_HK | en_US
})

const emit = defineEmits(['save', 'back'])

/* ========== State ========== */

const editorContainer = ref()
let editor = null
const CANVAS_MODE = 'APP'
const deviceWidth = ref(375)

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
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: { 'gjs-preset-webpage': {} },
    device: 'mobilePortrait',
    showDevices: false,
    styleManager: getStyleManager(props.lang, 'rem'),
    storageManager: { type: null },
  }
}

function initEditor() {
  const setting = initSetting()
  editor = grapesjs.init(setting)
}

/** 注册 layout 组件类型 */
function registerLayoutComponent() {
  editor.DomComponents.addType('resizable-div', {
    model: {
      defaults: {
        name: '自由块',
        resizable: true,
        draggable: true,
        droppable: true,
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
  const keys = ['layout', 'blocks', 'media', 'basicComponents', 'textComponents']
  const customBlocks = getBlocks(keys, CANVAS_MODE)
  customBlocks.forEach(block => {
    editor.Blocks.add(block.id, {
      label: block.label,
      category: block.category,
      content: block.content,
      ...(block.media ? { media: block.media } : {}),
    })
  })
}

/** 注册自定义 APP 设备（可调宽度） */
function registerCustomDevice() {
  const existing = editor.Devices.get('mobile-app')
  if (existing) editor.Devices.remove('mobile-app')
  editor.Devices.add({
    id: 'mobile-app',
    name: '手机',
    width: `${deviceWidth.value}px`,
  })
  editor.setDevice('mobile-app')
}

function onDeviceWidthChange(val) {
  if (!editor) return
  const device = editor.Devices.get('mobile-app')
  if (device) device.set('width', `${val}px`)
}

/** 为 image / layout 类型组件覆写属性面板（traits） */
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

    if (component.get('type') === 'resizable-div') {
      component.set('traits', [
        { type: 'text', name: 'bg-image', label: '背景图片 URL', changeProp: true },
        { type: 'select', name: 'bg-size', label: '背景尺寸', changeProp: true, options: [
          { value: 'cover', name: '覆盖' },
          { value: 'contain', name: '包含' },
          { value: 'auto', name: '自动' },
          { value: '100% 100%', name: '拉伸铺满' },
        ]},
      ])
      const style = component.getStyle()
      if (style['background-image']) {
        const m = style['background-image'].match(/url\(["']?([^"')]+)["']?\)/)
        component.set('bg-image', m ? m[1] : style['background-image'])
      }
      if (style['background-size']) component.set('bg-size', style['background-size'])
    }

    if (component.get('type') === 'iframe-embed') {
      component.set('traits', [
        { type: 'text', name: 'embed-src', label: '资源 URL', changeProp: true },
      ])
      const iframe = component.find('iframe')[0]
      if (iframe) component.set('embed-src', iframe.get('src'))
    }
  })

  // 监听属性变化，同步为 CSS 样式
  editor.on('component:update', (component) => {
    if (component.get('type') === 'layout' || component.get('type') === 'resizable-div') {
      const bgImg = component.get('bg-image')
      const bgSize = component.get('bg-size')
      const bgSizeCustom = component.get('bg-size-custom')
      const changes = {}
      if (bgImg !== undefined) changes['background-image'] = bgImg && !bgImg.startsWith('url(') ? `url(${bgImg})` : (bgImg || 'none')
      if (bgSizeCustom) {
        changes['background-size'] = bgSizeCustom
      } else if (bgSize !== undefined) {
        changes['background-size'] = bgSize || 'auto'
      }
      component.addStyle(changes)
    }

    if (component.get('type') === 'iframe-embed') {
      const src = component.get('embed-src')
      if (src !== undefined) {
        const iframe = component.find('iframe')[0]
        if (iframe) iframe.set('src', src)
      }
    }
  })
}

/**
 * 初始化编辑器数据
 */
function loadInitialData() {
  editor.setDragMode('select')

  if (props.initData) {
    rteLoadData(editor, props.initData)
  }
}

onMounted(() => {
  initEditor()
  // 先注册基础组件类型
  registerLayoutComponent()
  registerCustomBlocks()
  // 再初始化富文本（注册 editable-text 类型、命令、事件）
  rteInit(editor)
  registerCustomDevice()
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
  if (data) rteLoadData(editor, data)
}

defineExpose({ loadPageData })

/* ========== Save ========== */

function handleSave() {
  if (!editor) return

  const projectData = editor.getProjectData()
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)

  emit('save', {
    pageId: props.pageId,
    mode: 1,
    content_json: JSON.stringify(projectData),
    content_html: inlined,
  })
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
  font-weight: 600;
}
.toolbar-label {
  font-size: 13px;
  color: #666;
  margin-left: 8px;
}
.toolbar-unit {
  font-size: 13px;
  color: #666;
  margin-right: 8px;
}
.editor-container {
  flex: 1;
  overflow: hidden;
}
</style>
