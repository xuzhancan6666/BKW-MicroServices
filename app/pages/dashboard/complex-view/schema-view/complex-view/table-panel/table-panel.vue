<template>
   <el-card class="table-panel">
      <!-- operation -->
       <el-row
         v-if="tableConfig?.headerButtons?.length > 0"
         justify="end"
         class="operation-panel">
         <el-button
            v-for="btn in tableConfig.headerButtons"
            v-bind="btn"
            @click="opertaionHandler({btnConfig: btn})">
            {{ btn.label }}
         </el-button>
       </el-row>
      <!-- table -->
      <el-row>
         <schema-table
            ref="schemaTableRef"
            :schema="tableSchema"
            :api="api"
            :buttons="tableConfig?.rowButtons ?? []"
            @rowOperation="rowOperationHandler"
         ></schema-table>
      </el-row>
   </el-card>
</template>
<script setup>
import schemaTable from '$widgets/schema-table/schema-table.vue';
import { ElMessageBox, ElNotification } from 'element-plus';
import { inject, toRefs, ref, onMounted } from 'vue';
import curl from '$common/curl.js'
import { useRoute, useRouter } from 'vue-router';
const route = useRoute()
const router = useRouter()
const injects = inject('schemaViewData')
const { api, tableConfig, tableSchema } = toRefs(injects)
const schemaTableRef = ref(null);
const emits = defineEmits(['rowOperation'])

onMounted(() => {
   console.log('injects... tableConfig', tableSchema.value)
})

// 分发Key -> 事件
const eventKeyHandlerMap = {
   remove: removeData,
   go: go,
}

// 这是行数据删除 function
function removeData ({ btnConfig, rowData }) {
   console.log('removeData....', btnConfig)
   const { eventOptions } = btnConfig
   if(!eventOptions?.params) return
   const { params } = eventOptions;
   const removeKeys = Object.keys(params);
   const data = {}

   /*
      key1: 表示接口传参的Key。 key2：表示对应dto内的取值Key
      params : {
         key1: 'schema::key2'
      }
   */
   for(let i = 0; i < removeKeys.length; ++i) {
      const rkey = removeKeys[i]
      const rValueKey = params[rkey]
      const rValueKeyList = rValueKey.split('::')
      /*
          key1: 'schema::key2'  0:schema 1:key2
      */
      if(rValueKeyList[0] === 'schema' && rValueKeyList[1]) {
         data[rkey] = rowData[rValueKeyList[1]]
      }
   }
   console.log('确认删除该数据', data)
   ElMessageBox.confirm('确认删除该数据?', 'warning', {
      confirmButtonText: '确认',
      cancelButtonText: '取消',
      type: 'warning'
   }).then(async() => {
      schemaTableRef.value.loadingVisible(true)

      const res = await curl({
         method: 'delete',
         url: `${api.value}/list`,
         query: data,
         errorMessage: '删除失败'
      })

      if(!res || !res.success || !res.data) {
         ElNotification({
            title: '删除失败',
            message: '删除失败',
            type: 'error'
         })
         
         schemaTableRef.value.loadingVisible(false)
         return
      }

      ElNotification({
         title: '删除成功',
         message: '删除成功',
         type: 'suceess'
      })

      await schemaTableRef.value.loadTableData()
   })
}

// 这是一个跳转 function
function go({ btnConfig, rowData }) {
   router.push({
      path: `/sider/editor`,
      query: {
         project_key: route?.query?.project_key,
         menu_key: 'operation',
         sider_menu_key: 'Editor',
         id: rowData?.id,
      }
   })
}

// 行数据 操作
const rowOperationHandler = ({ btnConfig, rowData }) => {
   const { eventKey } = btnConfig;

   if(!eventKeyHandlerMap[eventKey]) {
      // 如果我们当前 panel 无对应处理方式。我们通过上浮方式。把对应处理方法暴露
      emits('rowOperation', ({btnConfig, rowData}))
   } else {
      eventKeyHandlerMap[eventKey]({btnConfig, rowData})
   }
}

// table 上面得操作
const opertaionHandler = ({ btnConfig, rowData }) => {
   const { eventKey } = btnConfig;
   console.log('eventKey.......', eventKey)
   if(!eventKeyHandlerMap[eventKey]) {
      // 如果我们当前 panel 无对应处理方式。我们通过上浮方式。把对应处理方法暴露
      emits('rowOperation', ({btnConfig, rowData}))
   } else {
      eventKeyHandlerMap[eventKey]({btnConfig, rowData})
   }
}

const loadTableData = async() => {
   await schemaTableRef.value.loadTableData()
}

defineExpose({
   loadTableData
})
</script>
<style lang="less" scoped>


.table-panel {
   flex: 1;
   display: flex;
   margin: 8px;

   .operation-panel {
      margin-bottom: 8px;
   }

   // :deep(.el-card__body) {
   //    height: 98%;
   // }
}
</style>