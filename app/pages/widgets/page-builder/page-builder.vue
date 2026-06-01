<template>
  <div class="page-editor">
    <!-- 顶部工具栏 -->
    <div class="editor-toolbar">
      <el-button @click="goBack">← 返回</el-button>
      <span class="page-title">落地页编辑器</span>
      <el-button @click="loadLast">恢复上次</el-button>
      <el-button @click="exportHtml">导出 HTML</el-button>
      <el-button @click="exportAEMJson">导出 AEM JSON</el-button>
      <el-button @click="exportTemplateJson">导出 Template JSON</el-button>
      <el-button :type="isAppMode ? 'primary' : 'default'" @click="toggleAppMode">
        {{ isAppMode ? 'APP 模式 ✓' : 'APP 模式' }}
      </el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
    <!-- GrapesJS 容器 -->
    <div ref="editorContainer" class="editor-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import grapesjs from 'grapesjs'
import 'grapesjs-preset-webpage'
import 'grapesjs/dist/css/grapes.min.css'
import zh from 'grapesjs/locale/zh'
import customBlocks from './blocks'
import { registerBlocks, parseToAEM, inlineStyles } from './parse-AEM-util'

const router = useRouter()
const editorContainer = ref()
let editor = null
const isAppMode = ref(false)

const STORAGE_KEY = 'grapesjs_page_data'

// Template JSON 基础结构（基于 content-Json.txt）
const TEMPLATE_BASE = {
  result: {
    zh_HK: {
      componentList: [
        { component: 'CQHeader', props: { title: '', subTitle: '', imageUrl: '' } },
        { component: 'CQRichText', props: { title: '', content: '', remark: '' } },
      ],
      tnc_action: '',
      tnc_actionText: '',
      applyBtn_actionText: '立即申請',
    },
    en_US: {
      componentList: [
        { component: 'CQHeader', props: { title: '', subTitle: '', imageUrl: '' } },
        { component: 'CQRichText', props: { title: '', content: '', remark: '' } },
      ],
      tnc_action: '',
      tnc_actionText: 'Terms and Conditions',
      applyBtn_actionText: 'Apply Now',
    },
    zh_CN: {
      componentList: [
        { component: 'CQHeader', props: { title: '', subTitle: '', imageUrl: '' } },
        { component: 'CQRichText', props: { title: '', content: '', remark: '' } },
      ],
      tnc_action: '',
      tnc_actionText: '条款及细则',
      applyBtn_actionText: '立即申请',
    },
  },
}

onMounted(() => {
  editor = grapesjs.init({
    container: editorContainer.value,
    fromElement: false,
    height: '100%',
    storageManager: {
      type: 'local',
      autosave: true,
      autoload: true,
      stepsBeforeSave: 1,
    },
    i18n: {
      locale: 'zh',
      messages: { zh },
    },
    plugins: ['gjs-preset-webpage'],
    pluginsOpts: {
      'gjs-preset-webpage': {}
    },
    // 确保右侧面板容器存在
    showDevices: false,
  })

  // 注册自定义块（自动注入 data-cq-component）
  customBlocks.forEach(block => {
    let content = block.content
    if (block.componentName && content) {
      // 在根元素上注入 data-cq-component 属性
      content = content.replace(/^<(\w+)(\s|>)/, (match, tag, after) =>
        `<${tag} data-cq-component="${block.componentName}"${after === '>' ? '' : after}`
      )
    }
    editor.Blocks.add(block.id, {
      label: block.label,
      category: block.category,
      content,
      ...(block.media ? { media: block.media } : {}),
    })
  })
  // 注册 AEM 组件映射
  registerBlocks(customBlocks)

  // 注册设备
  editor.DeviceManager.add('app', '390px', '844px', 'fit')
  editor.on('component:selected', () => {
    const openSm = editor.Panels.getButton('views', 'open-sm')
    if (openSm) openSm.set('active', true)
  })
})

function save() {
  if (!editor) return
  // 保存项目数据（用于下次编辑恢复）
  const data = editor.getProjectData()
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  console.log('data...', data)
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${inlined}
</body>
</html>`

  localStorage.setItem('grapesjs_export_html', fullHtml)
  ElMessage.success('已保存')
}

function exportHtml() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)
  console.log(inlined)
  const fullHtml = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body>
${inlined}
</body>
</html>`

  const blob = new Blob([fullHtml], { type: 'text/html' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.html'
  a.click()
  URL.revokeObjectURL(url)
  ElMessage.success('已导出 page.html')
}

function exportAEMJson() {
  if (!editor) return
  const json = parseToAEM(editor, {
    pageMeta: { title: '落地页' },
  })
  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'page.aem.json'
  a.click()
  URL.revokeObjectURL(url)
  console.log('[AEM JSON]', json)
  ElMessage.success('已导出 AEM JSON')
}

function exportTemplateJson() {
  if (!editor) return
  const html = editor.getHtml()
  const fullCss = editor.getCss()
  const inlined = inlineStyles(html, fullCss)

  // 深拷贝模板，避免引用
  const json = JSON.parse(JSON.stringify(TEMPLATE_BASE))

  // 遍历所有语言，将 CQRichText 的 content 替换为 inlined HTML
  for (const locale of Object.keys(json.result)) {
    const list = json.result[locale].componentList
    for (const item of list) {
      if (item.component === 'CQRichText') {
        item.props.content = inlined
      }
    }
  }

  const blob = new Blob([JSON.stringify(json, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'template.json'
  a.click()
  URL.revokeObjectURL(url)
  console.log('[Template JSON]', json)
  ElMessage.success('已导出 template.json')
}

function toggleAppMode() {
  if (!editor) return
  isAppMode.value = !isAppMode.value
  editor.setDevice(isAppMode.value ? 'app' : 'desktop')
  ElMessage.info(isAppMode.value ? '已切换为 APP 模式' : '已切换为桌面模式')
}

function loadLast() {
  if (!editor) return
  const raw = localStorage.getItem(STORAGE_KEY)
  if (raw) {
    editor.loadProjectData(JSON.parse(raw))
  }
}

function goBack() {
  editor?.destroy()
  editor = null
  router.back()
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
