<template>
   <h1>page2</h1>
   <input v-model="value">
   <span>{{ value }}</span>
</template>
<script setup>
   import {ref} from 'vue'
   const value = ref('page2')
   console.log('page2....',  value)
</script>
<style lane="less" scoped>
h1 {
   color: red;
}
</style>
