<template>
   <h1>Page1</h1>
   <input v-model="value">
   <span>{{ value }}</span>
</template>
<script setup>
   import {ref} from 'vue'
   const value = ref('page1')
   console.log('page1....',  value)
</script>
<style lane="less" scoped>
h1 {
   color: red;
}
</style>
