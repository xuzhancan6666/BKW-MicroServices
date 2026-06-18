<template>
  <div class="page-editor">
    <div v-if="loading" class="page-editor-loading">
      <span class="loading-spinner"></span>
      <span>加载中...</span>
    </div>
    <page-builder
      v-else-if="initAppMode === 'PC'"
      ref="pageBuilderRef"
      :page-id="pageId"
      :init-data="pageData"
      :lang="'zh_HK'"
      :canvas-mode="initAppMode"
      @save="handleSave"
      @back="backToList"
    />
    <mobile-builder
      v-else
      ref="mobileBuilderRef"
      :page-id="pageId"
      :init-data="pageData"
      :lang="'zh_HK'"
      @save="handleSave"
      @back="backToList"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import PageBuilder from '$widgets/page-builder/page-builder.vue'
import MobileBuilder from '$widgets/page-builder/mobile-builder.vue'
import curl from '$common/curl.js'

const route = useRoute()
const router = useRouter()

const loading = ref(true)
const pageId = ref(null)
const pageData = ref(null)
const pageTitle = ref('')
const pageDescription = ref('')
const pageStatus = ref(0)
const initAppMode = ref('PC')
const pageBuilderRef = ref(null)
const mobileBuilderRef = ref(null)

onMounted(async () => {
  const id = route.query.id
  if (!id) {
    ElMessage.error('缺少页面 ID')
    backToList()
    return
  }

  pageId.value = id
  const res = await curl({
    method: 'get',
    url: `/api/page/content/${id}`,
  })

  if (!res?.success || !res.data) {
    ElMessage.error('页面加载失败')
    backToList()
    return
  }

  try {
    pageData.value = res.data.content_json ? JSON.parse(res.data.content_json) : null
  } catch {
    pageData.value = null
  }
  pageTitle.value = res.data.title || ''
  pageDescription.value = res.data.description || ''
  pageStatus.value = res.data.status !== undefined ? res.data.status : 0
  initAppMode.value = res.data.mode === 1 ? 'APP' : 'PC'

  loading.value = false
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
      initAppMode.value = mode === 1 ? 'APP' : 'PC'
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
      initAppMode.value = mode === 1 ? 'APP' : 'PC'
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
