<template>
  <el-dialog
    :model-value="true"
    title="富文本编辑器"
    width="860px"
    top="5vh"
    destroy-on-close
    @close="$emit('cancel')"
  >
    <div v-if="editor" class="rte-toolbar">
      <button
        v-for="(item, i) in toolbarItems"
        :key="i"
        :class="['rte-btn', { 'rte-btn--active': item.isActive?.() }]"
        :title="item.title"
        @click="item.action"
      >
        <span v-html="item.label"></span>
      </button>
      <span class="rte-sep"></span>
      <input
        type="color"
        class="rte-color"
        title="文本颜色"
        :value="editor.getAttributes('textStyle').color || '#000000'"
        @input="onColorChange"
      />
    </div>
    <editor-content :editor="editor" class="rte-editor" />
    <template #footer>
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="handleConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { onBeforeUnmount } from 'vue'
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import TextAlign from '@tiptap/extension-text-align'
import { TextStyle } from '@tiptap/extension-text-style'
import Color from '@tiptap/extension-color'

const props = defineProps({
  initialContent: { type: String, default: '' },
})
const emit = defineEmits(['confirm', 'cancel'])

const editor = useEditor({
  content: props.initialContent,
  extensions: [
    StarterKit.configure({
      heading: { levels: [1, 2, 3] },
    }),
    Underline,
    TextAlign.configure({ types: ['heading', 'paragraph'] }),
    TextStyle,
    Color,
  ],
  editorProps: {
    attributes: {
      style: 'min-height:300px;max-height:60vh;overflow-y:auto;outline:none;padding:16px;line-height:1.6;',
    },
  },
})

/* ========== Toolbar ========== */

const toolbarItems = [
  { label: '<strong>B</strong>', title: '加粗', action: () => editor.value?.chain().focus().toggleBold().run(), isActive: () => editor.value?.isActive('bold') },
  { label: '<em>I</em>', title: '斜体', action: () => editor.value?.chain().focus().toggleItalic().run(), isActive: () => editor.value?.isActive('italic') },
  { label: '<u>U</u>', title: '下划线', action: () => editor.value?.chain().focus().toggleUnderline().run(), isActive: () => editor.value?.isActive('underline') },
  { label: '<s>S</s>', title: '删除线', action: () => editor.value?.chain().focus().toggleStrike().run(), isActive: () => editor.value?.isActive('strike') },
  { label: '&lt;/&gt;', title: '行内代码', action: () => editor.value?.chain().focus().toggleCode().run(), isActive: () => editor.value?.isActive('code') },
  { label: '❝', title: '引用', action: () => editor.value?.chain().focus().toggleBlockquote().run(), isActive: () => editor.value?.isActive('blockquote') },
  { label: 'H1', title: '标题 1', action: () => editor.value?.chain().focus().toggleHeading({ level: 1 }).run(), isActive: () => editor.value?.isActive('heading', { level: 1 }) },
  { label: 'H2', title: '标题 2', action: () => editor.value?.chain().focus().toggleHeading({ level: 2 }).run(), isActive: () => editor.value?.isActive('heading', { level: 2 }) },
  { label: 'H3', title: '标题 3', action: () => editor.value?.chain().focus().toggleHeading({ level: 3 }).run(), isActive: () => editor.value?.isActive('heading', { level: 3 }) },
  { label: 'P', title: '段落', action: () => editor.value?.chain().focus().setParagraph().run(), isActive: () => editor.value?.isActive('paragraph') },
  { label: '☰', title: '无序列表', action: () => editor.value?.chain().focus().toggleBulletList().run(), isActive: () => editor.value?.isActive('bulletList') },
  { label: '#', title: '有序列表', action: () => editor.value?.chain().focus().toggleOrderedList().run(), isActive: () => editor.value?.isActive('orderedList') },
  { label: '≡', title: '左对齐', action: () => editor.value?.chain().focus().setTextAlign('left').run(), isActive: () => editor.value?.isActive({ textAlign: 'left' }) },
  { label: '≡', title: '居中', action: () => editor.value?.chain().focus().setTextAlign('center').run(), isActive: () => editor.value?.isActive({ textAlign: 'center' }) },
  { label: '≡', title: '右对齐', action: () => editor.value?.chain().focus().setTextAlign('right').run(), isActive: () => editor.value?.isActive({ textAlign: 'right' }) },
  { label: '—', title: '水平线', action: () => editor.value?.chain().focus().setHorizontalRule().run(), isActive: () => null },
  { label: '↩', title: '撤销', action: () => editor.value?.chain().focus().undo().run(), isActive: () => null },
  { label: '↪', title: '重做', action: () => editor.value?.chain().focus().redo().run(), isActive: () => null },
]

function onColorChange(e) {
  editor.value?.chain().focus().setColor(e.target.value).run()
}

function handleConfirm() {
  const html = editor.value?.getHTML() || ''
  emit('confirm', html)
}

onBeforeUnmount(() => {
  editor.value?.destroy()
})
</script>

<style scoped>
.rte-toolbar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 2px;
  padding: 8px 12px;
  border-bottom: 1px solid #e0e0e0;
  background: #fafafa;
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
  font-size: 13px;
  color: #555;
}
.rte-btn:hover {
  background: #e8e8e8;
}
.rte-btn--active {
  background: #409eff;
  color: #fff;
}
.rte-sep {
  display: inline-block;
  width: 1px;
  height: 20px;
  background: #ddd;
  margin: 0 6px;
}
.rte-color {
  width: 28px;
  height: 28px;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
}
</style>

<style>
/* 富文本编辑区样式 */
.rte-editor .ProseMirror {
  min-height: 300px;
  max-height: 60vh;
  overflow-y: auto;
  outline: none;
  padding: 16px;
  line-height: 1.6;
  background: #fff;
  color: #333;
}
.rte-editor .ProseMirror p.is-editor-empty:first-child::before {
  content: attr(data-placeholder);
  color: #adb5bd;
  pointer-events: none;
  float: left;
  height: 0;
}
.rte-editor .ProseMirror blockquote {
  border-left: 3px solid #409eff;
  padding-left: 16px;
  margin: 0;
  color: #666;
}
.rte-editor .ProseMirror pre {
  background: #f4f4f4;
  padding: 12px 16px;
  border-radius: 4px;
  font-family: monospace;
}
.rte-editor .ProseMirror code {
  background: #f4f4f4;
  padding: 2px 6px;
  border-radius: 3px;
  font-size: 0.9em;
}
</style>
