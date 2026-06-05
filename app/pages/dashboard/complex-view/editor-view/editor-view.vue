<template>
  <!-- 页面列表 -->
  <div v-if="currentView === 'list'" class="page-list">
    <el-card class="list-card">
      <el-row justify="space-between" align="middle" class="list-header">
        <span class="list-title">页面管理</span>
        <el-button type="primary" @click="showNewDialog">新建页面</el-button>
      </el-row>

      <el-table :data="pageList" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="title"       label="页面名称" min-width="160" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="locale"      label="语言" width="80" />
        <el-table-column prop="status"      label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === 1 ? 'success' : 'info'" size="small">
              {{ row.status === 1 ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="mode"       label="模式" width="70" align="center">
          <template #default="{ row }">
            <el-tag :type="row.mode === 1 ? 'warning' : 'default'" size="small">
              {{ row.mode === 1 ? 'APP' : 'PC' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="version"     label="版本" width="60" align="center" />
        <el-table-column prop="updated_at"  label="更新时间" width="170">
          <template #default="{ row }">
            {{ formatTime(row.updated_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" @click="editPage(row)">编辑</el-button>
            <el-button link type="danger" @click="deletePage(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-row justify="center" class="pagination">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="total"
          layout="total, prev, pager, next"
          @current-change="fetchList"
        />
      </el-row>
    </el-card>
  </div>

  <!-- 新建页面弹窗 -->
  <el-dialog v-model="newDialogVisible" title="新建页面" width="420px" :close-on-click-modal="false">
    <el-form label-width="80px">
      <el-form-item label="页面名称" required>
        <el-input v-model="newForm.title" placeholder="请输入页面名称" />
      </el-form-item>
      <el-form-item label="页面描述">
        <el-input v-model="newForm.description" type="textarea" :rows="2" placeholder="请输入页面描述" />
      </el-form-item>
      <el-form-item label="初始模式">
        <el-radio-group v-model="newForm.mode">
          <el-radio :value="false">PC 模式</el-radio>
          <el-radio :value="true">APP 模式</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="newDialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirmNew">创建</el-button>
    </template>
  </el-dialog>

  <!-- 页面编辑器（v-if 销毁重建，避免 GrapesJS 在隐藏容器中初始化） -->
  <div v-if="currentView === 'editor'" v-loading="editorLoading" class="editor-wrapper" element-loading-text="加载中...">
    <page-builder
      ref="pageBuilderRef"
      :page-id="pageId"
      :init-data="pageData"
      :page-title="pageTitle"
      :page-description="pageDescription"
      :page-status="pageStatus"
      :init-app-mode="initAppMode"
      @save="handleSave"
      @back="backToList"
    />
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import PageBuilder from '$widgets/page-builder/page-builder.vue'
import curl from '$common/curl.js'

const currentView = ref('list') // 'list' | 'editor'
const loading = ref(false)
const pageList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 新建弹窗
const newDialogVisible = ref(false)
const newForm = reactive({
  title: '',
  description: '',
  mode: false,   // false=PC, true=APP
})

// 编辑器相关
const pageId = ref(null)
const pageData = ref(null)
const pageTitle = ref('')
const pageDescription = ref('')
const pageStatus = ref(0)
const initAppMode = ref(false)
const pageBuilderRef = ref(null)
const editorLoading = ref(false)

onMounted(() => {
  fetchList()
})

/** 查询页面列表 */
async function fetchList() {
  loading.value = true
  const res = await curl({
    method: 'get',
    url: '/api/page/content/list',
    query: { page: currentPage.value, size: pageSize.value },
  })
  if (res?.success) {
    pageList.value = res.data || []
    total.value = res.metadata?.total || 0
  }
  loading.value = false
}

/** 打开新建页面弹窗 */
function showNewDialog() {
  newForm.title = ''
  newForm.description = ''
  newForm.mode = false
  newDialogVisible.value = true
}

/** 确认新建——先入库，再以编辑模式打开 */
async function confirmNew() {
  if (!newForm.title.trim()) {
    ElMessage.warning('请输入页面名称')
    return
  }
  newDialogVisible.value = false
  editorLoading.value = true

  // 先插入数据库
  const res = await curl({
    method: 'post',
    url: '/api/page/content',
    data: {
      title: newForm.title.trim(),
      description: newForm.description.trim(),
      status: 0,
      mode: newForm.mode ? 1 : 0,
    },
  })
  if (!res?.success || !res.data?.id) {
    ElMessage.error('创建失败')
    editorLoading.value = false
    return
  }

  const newId = res.data.id

  // 加载完整数据（含 content_json）
  const detail = await curl({
    method: 'get',
    url: `/api/page/content/${newId}`,
  })

  // 数据就绪后统一设置状态
  pageId.value = newId
  pageData.value = detail?.success && detail.data?.content_json
    ? JSON.parse(detail.data.content_json)
    : null
  pageTitle.value = newForm.title.trim()
  pageDescription.value = newForm.description.trim()
  pageStatus.value = 0
  initAppMode.value = newForm.mode

  // 切换到编辑器视图（v-if 触发 page-builder 挂载）
  currentView.value = 'editor'
  nextTick(() => {
    pageBuilderRef.value?.loadPageData(pageData.value)
    editorLoading.value = false
  })
}

/** 编辑已有页面——加载数据后进入编辑器 */
async function editPage(row) {
  editorLoading.value = true
  pageId.value = row.id

  // 先加载完整数据（含 content_json）
  const res = await curl({
    method: 'get',
    url: `/api/page/content/${row.id}`,
  })
  if (!res?.success || !res.data) {
    ElMessage.error('页面加载失败')
    editorLoading.value = false
    return
  }

  // 数据就绪后统一设置状态
  pageData.value = res.data.content_json ? JSON.parse(res.data.content_json) : null
  pageTitle.value = res.data.title || ''
  pageDescription.value = res.data.description || ''
  pageStatus.value = res.data.status !== undefined ? res.data.status : 0
  initAppMode.value = res.data.mode === 1

  // 切换到编辑器视图（v-if 触发 page-builder 挂载，此时容器可见）
  currentView.value = 'editor'
  nextTick(() => {
    pageBuilderRef.value?.loadPageData(pageData.value)
    editorLoading.value = false
  })
}

/** 删除页面——二次确认后调用 API */
async function deletePage(row) {
  try {
    await ElMessageBox.confirm(`确定删除「${row.title}」吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch {
    return // 用户取消
  }

  const res = await curl({
    method: 'delete',
    url: '/api/page/content/list',
    query: { id: row.id },
  })
  if (res?.success) {
    ElMessage.success('已删除')
    fetchList()
  } else {
    ElMessage.error('删除失败')
  }
}

/** 编辑器保存回调 */
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
      initAppMode.value = mode === 1
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
      initAppMode.value = mode === 1
      ElMessage.success('创建成功')
    } else {
      ElMessage.error('创建失败')
    }
  }
}

/** 编辑器返回按钮——回到列表 */
function backToList() {
  currentView.value = 'list'
  fetchList()
}

/** 格式化时间 */
function formatTime(dt) {
  if (!dt) return ''
  const d = new Date(dt)
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`
}

</script>

<style scoped>
.page-list {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
}
.list-card {
  height: 100%;
}
.list-header {
  margin-bottom: 16px;
}
.list-title {
  font-size: 18px;
  font-weight: 600;
}
.pagination {
  margin-top: 16px;
}
.editor-wrapper {
  height: 100%;
}
</style>
