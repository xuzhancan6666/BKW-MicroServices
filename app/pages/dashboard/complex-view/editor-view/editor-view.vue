<template>
  <!-- 页面列表 -->
  <div class="page-list">
    <el-card class="list-card">
      <el-row justify="space-between" align="middle" class="list-header">
        <span class="list-title">页面管理</span>
        <el-button type="primary" @click="showNewDialog">新建页面</el-button>
      </el-row>

      <el-row class="list-filters">
        <el-radio-group v-model="typeFilter" @change="onTypeFilterChange">
          <el-radio-button value="">全部</el-radio-button>
          <el-radio-button value="page">页面</el-radio-button>
          <el-radio-button value="component">组件</el-radio-button>
        </el-radio-group>
      </el-row>

      <el-table :data="pageList" v-loading="loading" stripe style="width: 100%">
        <el-table-column prop="title"       label="页面名称" min-width="160" />
        <el-table-column prop="description" label="描述" min-width="200" show-overflow-tooltip />
        <el-table-column prop="locale"      label="语言" width="80" />
        <el-table-column prop="type"        label="类型" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.type === 'component' ? 'success' : 'primary'" size="small">
              {{ row.type === 'component' ? '组件' : '页面' }}
            </el-tag>
          </template>
        </el-table-column>
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
      <el-form-item label="类型">
        <el-radio-group v-model="newForm.type">
          <el-radio value="page">页面</el-radio>
          <el-radio value="component">组件</el-radio>
        </el-radio-group>
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
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import curl from '$common/curl.js'

const router = useRouter()
const loading = ref(false)
const pageList = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(10)

// 类型筛选
const typeFilter = ref('')

// 新建弹窗
const newDialogVisible = ref(false)
const newForm = reactive({
  title: '',
  description: '',
  mode: false,
  type: 'page',
})

onMounted(() => {
  fetchList()
})

/** 类型筛选变更 */
function onTypeFilterChange() {
  currentPage.value = 1
  fetchList()
}

/** 查询页面列表 */
async function fetchList() {
  loading.value = true
  const query = { page: currentPage.value, size: pageSize.value }
  if (typeFilter.value) query.type = typeFilter.value
  const res = await curl({
    method: 'get',
    url: '/api/page/content/list',
    query,
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
  newForm.type = 'page'
  newDialogVisible.value = true
}

/** 确认新建——先入库，再跳转到编辑器 */
async function confirmNew() {
  if (!newForm.title.trim()) {
    ElMessage.warning('请输入页面名称')
    return
  }
  newDialogVisible.value = false

  const res = await curl({
    method: 'post',
    url: '/api/page/content',
    data: {
      title: newForm.title.trim(),
      description: newForm.description.trim(),
      status: 0,
      mode: newForm.mode ? 1 : 0,
      type: newForm.type,
    },
  })
  if (!res?.success || !res.data?.id) {
    ElMessage.error('创建失败')
    return
  }

  router.push({
    path: '/sider/page-editor',
    query: { id: res.data.id },
  })
}

/** 编辑已有页面——跳转到编辑器 */
async function editPage(row) {
  router.push({
    path: '/sider/page-editor',
    query: { id: row.id },
  })
}

/** 删除页面 */
async function deletePage(row) {
  try {
    await ElMessageBox.confirm(`确定删除「${row.title}」吗？`, '删除确认', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
  } catch {
    return
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
.list-filters {
  margin-bottom: 12px;
}
.list-title {
  font-size: 18px;
  font-weight: 600;
}
.pagination {
  margin-top: 16px;
}
</style>
