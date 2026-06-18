<template>
  <el-dialog
    :model-value="true"
    title="富文本编辑器"
    width="800px"
    top="5vh"
    destroy-on-close
    @close="$emit('cancel')"
  >
    <div class="rte-toolbar">
      <button class="rte-btn" title="加粗" @click="exec('bold')"><strong>B</strong></button>
      <button class="rte-btn" title="斜体" @click="exec('italic')"><em>I</em></button>
      <button class="rte-btn" title="下划线" @click="exec('underline')"><u>U</u></button>
      <button class="rte-btn" title="删除线" @click="exec('strikeThrough')"><s>S</s></button>
      <span class="rte-sep"></span>
      <button class="rte-btn" title="代码" @click="insertCode">&lt;/&gt;</button>
      <button class="rte-btn" title="引用" @click="exec('formatBlock', '<blockquote>')">❝</button>
      <span class="rte-sep"></span>
      <button class="rte-btn" title="标题 1" @click="exec('formatBlock', '<h1>')">H1</button>
      <button class="rte-btn" title="标题 2" @click="exec('formatBlock', '<h2>')">H2</button>
      <button class="rte-btn" title="标题 3" @click="exec('formatBlock', '<h3>')">H3</button>
      <button class="rte-btn" title="段落" @click="exec('formatBlock', '<p>')">P</button>
      <span class="rte-sep"></span>
      <button class="rte-btn" title="无序列表" @click="exec('insertUnorderedList')">☰</button>
      <button class="rte-btn" title="有序列表" @click="exec('insertOrderedList')">#</button>
      <span class="rte-sep"></span>
      <button class="rte-btn" title="左对齐" @click="exec('justifyLeft')">≡</button>
      <button class="rte-btn" title="居中" @click="exec('justifyCenter')">≡</button>
      <button class="rte-btn" title="右对齐" @click="exec('justifyRight')">≡</button>
      <span class="rte-sep"></span>
      <button class="rte-btn" title="水平线" @click="exec('insertHorizontalRule')">—</button>
      <span class="rte-sep"></span>
      <input type="color" class="rte-color" title="文本颜色" @input="onColorChange" />
    </div>
    <div ref="editorEl" class="rte-editor" contenteditable="true"></div>
    <template #footer>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'

const props = defineProps({
  initialContent: { type: String, default: '' },
})
const emit = defineEmits(['confirm', 'cancel'])

const editorEl = ref()

onMounted(async () => {
  document.execCommand('styleWithCSS', false, true)
  await nextTick()
  if (editorEl.value) {
    editorEl.value.innerHTML = props.initialContent
  }
})

function exec(command, value) {
  document.execCommand(command, false, value || null)
  editorEl.value?.focus()
}

function insertCode() {
  exec('insertHTML', '<code style="background:#f4f4f4;padding:2px 6px;border-radius:3px;font-size:0.9em;">代码</code>')
}

function onColorChange(e) {
  document.execCommand('foreColor', false, e.target.value)
}

function cleanHtml(html) {
  let s = html
  s = s.replace(/<p>\s*<\/p>/gi, '')
  s = s.replace(/<span[^>]*>\s*<\/span>/gi, '')
  s = s.replace(/(<br\s*\/?>\s*){3,}/gi, '<br><br>')
  s = s.trim()
  return s
}

function handleConfirm() {
  if (!editorEl.value) return
  const html = cleanHtml(editorEl.value.innerHTML)
  emit('confirm', html)
}
</script>

<style scoped>
.rte-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding: 8px;
  border-bottom: 1px solid #e0e0e0;
  background: #fff;
}
.rte-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 32px;
  height: 32px;
  padding: 0 6px;
  border: none;
  background: transparent;
  cursor: pointer;
  border-radius: 4px;
  font-size: 14px;
  color: #333;
}
.rte-btn:hover {
  background: #f0f0f0;
}
.rte-sep {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #e0e0e0;
  margin: 0 4px;
}
.rte-color {
  width: 28px;
  height: 28px;
  padding: 0;
  border: none;
  cursor: pointer;
  border-radius: 4px;
}
.rte-editor {
  min-height: 300px;
  max-height: 60vh;
  padding: 16px;
  outline: none;
  overflow-y: auto;
  background: #fff;
  line-height: 1.6;
}
</style>
