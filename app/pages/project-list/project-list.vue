<template>
   <HeaderContainer :title="项目列表">
      <template #main-content>
         <el-row type="flex" di v-for="dsl in dslList" :key="dsl?.model?.key">
            <div class="dsl-panel">
               <span class="title">{{ dsl?.model?.name }}</span>
            </div>
            <el-row type="flex" class="card-row" shadow="hover">
               <el-card v-for="project in dsl?.project" class="project-card">
                  <template #header>
                     <span class="card-title">{{ project.name }}</span>
                  </template>
                  <div class="card-content">
                     <span>
                        {{ project.desc }}
                     </span>
                  </div>
                  <template #footer>
                     <div class="card-footer">
                        <el-link @click.prevent="projectGo(dsl?.model?.key, project.key)">进入系统</el-link>
                     </div>
                  </template>
               </el-card>
            </el-row>
         </el-row>
      </template>
   </HeaderContainer>
</template>
<script setup>
import {ref, onMounted} from 'vue'
import curl from '$common/curl'
import HeaderContainer from '$widgets/header-container/header-container.vue'

const dslList = ref([]);

const getdslList = async () => {
   try {
      const res = await curl({
         url: '/api/project/list',
         method: 'get',
      })

      dslList.value = res.data || [];
   } catch (error) {
   }
}

const getdslProject = async (modelKey, projectKey) => {
   try {
      const res = await curl({
         url: '/api/project/list/project',
         method: 'post',
         data: {
            modelKey,
            projectKey
         }
      })
   } catch (error) {
      console.log('获取项目列表失败：', error);
   }
}

const projectGo = async (modelKey, projectKey) => {
   getdslProject(modelKey, projectKey)
}

onMounted(() => {
   getdslList();
})

</script>
<style lang="less" scoped>

.dsl-panel {
   width: 200px;
   display:inline-flexbox;
   margin: 10px 20px;
   border-bottom: 1px solid #ccc;

   .title {
      font-size: 14px;
      line-height: 32px;
      margin-top: 8px;
   }
}
.card-row {
   width: 100%;

   .project-card {
      width: 300px;
      margin: 0 20px;

      .card-header {
         font-size: 16px;
      }

      .card-footer {
         width: 100%;
         text-align: right;
         font-size: 12px;
      }
   }
}


</style>