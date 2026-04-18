<template>
   <div class="container">
      <sider-container>
         <template #menu-content>
            <el-menu
               :default-active="activeKey"
               @select="onMenuSelect"
               class="el-menu-vertical-demo"
            >
               <template v-for="menuItem in menu">
                  <sub-menu
                     v-if="Array.isArray(menuItem.subMenu) && menuItem.subMenu.length > 0"
                     :menuItem="menuItem"/>
                  <el-menu-item
                     v-else
                     :index="menuItem.key">
                     {{ menuItem.name }}
                  </el-menu-item>
               </template>
            </el-menu>
         </template>
         <template #main-content>
            <router-view></router-view>
         </template>
      </sider-container>
   </div>
</template>
<script setup>
import { ref, computed, watch, onMounted } from 'vue'
import SiderContainer from '$widgets/sider-container/sider-container.vue';
import SubMenu from './complex-view/sub-menu/sub-menu.vue';
import useMenuStore from '$store/menu'
import { useRoute, useRouter } from 'vue-router';

const activeKey = ref('')
const menu = ref([])

const menuStore = useMenuStore()
const router = useRouter()
const route = useRoute()

// 1.我没需要 siderMenu 来作为我们view 页面的 menu
// 2.url表达：siderMenu --> sub_menu_key 。 headerMenu-->menu_key
// 为了刷新界面。headerview 中的 menu 对应 activeKey 不会混淆导致没有选中
// 设置 activeKey。 设置 Menu

// 1.点击 header。-> 初始化 第一个 menu 展开 展示页面。
// 点击 menu 对应展示 页面。
// 刷新路径 重新请求。 初始化menu。

watch(() => route.query.menu_key, () => {
   console.log('route.query.menu_key')

   setActiveKey()
});

watch(() => route.query.sider_menu_key, () => {
   console.log('route.query.sider_menu_key')

   setActiveKey()
});

// 有一种情况。异步请求慢。需要监听我们menuList数据变化。
// 如果请求成功回来。那么监听数据。
// 数据返回。触发。初始化 siderMenu。
watch(() => menuStore.menuList, () => {
   setSiderMenu()

   setActiveKey()
})

onMounted(() => {
   setActiveKey()
   setSiderMenu()
})

function setSiderMenu() {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: route.query.menu_key
   })

   if(menuItem?.moduleType === 'sider' && menuItem?.siderConfig?.menu) {
      menu.value = menuItem.siderConfig.menu || []
   }

   if(menuItem?.defaultKey) {
      onMenuSelect(menuItem.defaultKey)
   }
}

function setActiveKey() {
   const menuItem = menuStore.findMenuItem({
      key: 'key',
      value: route.query.sider_menu_key
   })

   activeKey.value = menuItem?.key
}

function onMenuSelect(menuKey) {
   let menuItem = menuStore.findMenuItem({
      key: 'key',
      value: menuKey
   })

   if(menuItem?.key === route.query.sider_menu_key) {
      return
   }

   activeKey.value = menuItem?.key

   const { moduleType, key, customConfig, subMenu } = menuItem
   const menuPathMap = {
      iframe: '/iframe',
      schema: '/schema',
      custom: customConfig?.path,
   }

   router.push({
      path: `/sider${menuPathMap[moduleType]}`,
      query: {
         project_key: route.query.project_key,
         menu_key: route.query.menu_key,
         sider_menu_key: key,
      }
   })
}

function siderContent() {

}
</script>
<style lang="less" scoped>
.container {
   width: 100%;
   display: flex;

   .sider {
      width: 300px;
   }

   .content {
      flex: 1;
   }
}
</style>