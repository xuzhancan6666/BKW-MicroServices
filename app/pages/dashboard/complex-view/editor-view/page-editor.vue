<template>
  <div class="page-editor">
    <div v-if="loading" class="page-editor-loading">
      <span class="loading-spinner"></span>
      <span>加载中...</span>
    </div>
    <page-builder
      v-else-if="pageMode !== 1 || editorType === 'component'"
      :key="pageId"
      ref="pageBuilderRef"
      :page-id="pageId"
      :init-data="pageData"
      :lang="'zh_HK'"
      :editor-type="editorType"
      @save="handleSave"
      @back="backToList"
    />
    <app-builder
      v-else
      :key="'app-'+pageId"
      ref="pageBuilderRef"
      :page-id="pageId"
      :init-data="pageData"
      @save="handleSave"
      @back="backToList"
    />
  </div>
</template>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PageBuilder from '$widgets/page-builder/page-builder.vue'
import AppBuilder from '$widgets/app-builder/app-builder.vue'
import curl from '$common/curl.js'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const pageId = ref(null)
const pageData = ref(null)
const pageTitle = ref('')
const pageDescription = ref('')
const pageStatus = ref(0)
const editorType = ref('page')
const pageMode = ref(0)
const pageBuilderRef = ref(null)

async function loadPageContent(id) {
  if (!id) {
    ElMessage.error('缺少页面 ID')
    backToList()
    return
  }

  pageId.value = id
  loading.value = true
  const res = await curl({
    method: 'get',
    url: `/api/page/content/${id}`,
  })

  if (!res?.success || !res.data) {
    ElMessage.error('页面加载失败')
    backToList()
    return
  }

  console.log('loadPageContent: id =', id, 'content_json length =', res.data.content_json?.length)
  console.log('loadPageContent: content_json preview =', typeof res.data.content_json === 'string' ? res.data.content_json.slice(0, 200) : res.data.content_json)
  try {
    const parsed = res.data.content_json ? JSON.parse(res.data.content_json) : null
    // 注入组件最新内容（自动更新引用组件）
    if (parsed) {
      await injectLatestComponents(parsed)
      console.log('[debug] loadPageContent: after inject, pageData.pages[0].frames[0].component.components[0].components length =',
        parsed?.pages?.[0]?.frames?.[0]?.component?.components?.[0]?.components?.length)
    }
    pageData.value = parsed
  } catch {
    pageData.value = null
  }
  console.log('loadPageContent: pageData parsed =', pageData.value ? 'NOT null' : 'null')
  editorType.value = res.data.type || 'page'
  pageMode.value = res.data.mode !== undefined ? res.data.mode : 0
  pageTitle.value = res.data.title || ''
  pageDescription.value = res.data.description || ''
  pageStatus.value = res.data.status !== undefined ? res.data.status : 0

  loading.value = false
}

/* ========== 组件自动更新 ========== */

/** 遍历 project JSON，找到所有 component-instance 的 ID，批量拉取最新内容并注入 */
async function injectLatestComponents(data) {
  const ids = collectComponentIds(data)
  console.log('[debug] injectLatestComponents: found component-instance ids =', ids)
  if (ids.length === 0) return

  const res = await curl({
    method: 'get',
    url: '/api/page/content/list',
    query: { type: 'component', ids: ids.join(','), size: 1000 },
  })
  console.log('[debug] injectLatestComponents: API response success =', res?.success, 'data count =', res?.data?.length)
  if (!res?.success || !res.data) return

  const contentMap = {}
  res.data.forEach(comp => {
    console.log('[debug] injectLatestComponents: component id=' + comp.id + ' content_html length=' + (comp.content_html?.length || 0) + ' preview=' + (comp.content_html || '').slice(0, 80) + '... FULL=' + (comp.content_html || ''))
    contentMap[comp.id] = comp.content_html || '<div style="padding:16px;color:#999;">组件内容为空</div>'
  })
  injectComponentContent(data, contentMap)
}

function collectComponentIds(data) {
  const ids = []
  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'component-instance' && node.attributes?.['data-component-id']) {
      ids.push(node.attributes['data-component-id'])
      return
    }
    if (Array.isArray(node.components)) {
      node.components.forEach(walk)
    }
  }
  if (data.pages) {
    data.pages.forEach(page => {
      if (page.frames) {
        page.frames.forEach(frame => {
          if (frame.component) walk(frame.component)
        })
      }
    })
  }
  return ids
}

function injectComponentContent(data, contentMap) {
  function walk(node) {
    if (!node || typeof node !== 'object') return
    if (node.type === 'component-instance') {
      const cid = node.attributes?.['data-component-id']
      if (cid && contentMap[cid]) {
        node.components = [contentMap[cid]]
      } else {
        // 组件已删除或不存在
        node.components = ['<div style="padding:16px;color:#999;">组件内容不可用</div>']
      }
      return
    }
    if (Array.isArray(node.components)) {
      node.components.forEach(walk)
    }
  }
  if (data.pages) {
    data.pages.forEach(page => {
      if (page.frames) {
        page.frames.forEach(frame => {
          if (frame.component) walk(frame.component)
        })
      }
    })
  }
}

onMounted(() => {
  loadPageContent(route.query.id)
})

// 路由 query.id 变化时重新加载（同一路由不同 id 组件复用场景）
watch(() => route.query.id, (newId) => {
  if (newId) loadPageContent(newId)
})

const handleSave = async ({ pageId: id, title, description, status, mode, content_json, content_html }) => {
  if (id) {
    const res = await curl({
      method: 'put',
      url: `/api/page/content/${id}`,
      data: { title, description, status, mode, content_json, content_html },
    })
    if (res?.success) {
      pageTitle.value = title
      pageDescription.value = description
      pageStatus.value = status
      ElMessage.success('保存成功')
    } else {
      ElMessage.error('保存失败')
    }
  } else {
    const res = await curl({
      method: 'post',
      url: '/api/page/content',
      data: { title, description, status, mode, content_json, content_html },
    })
    if (res?.success && res.data?.id) {
      pageId.value = res.data.id
      pageTitle.value = title
      pageDescription.value = description
      pageStatus.value = status
      ElMessage.success('创建成功')
    } else {
      ElMessage.error('创建失败')
    }
  }
}

function backToList() {
  router.push({ path: '/sider/editor', 
    query: {
      sider_menu_key: 'redbook'
  } })
}
</script>

<style scoped>
.page-editor {
  height: 100%;
}
.page-editor-loading {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #999;
  font-size: 14px;
}
.loading-spinner {
  width: 28px;
  height: 28px;
  border: 3px solid #e0e0e0;
  border-top-color: #409eff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin {
  to { transform: rotate(360deg); }
}
</style>
