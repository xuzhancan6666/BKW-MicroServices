<template>
    <div class="content">
        <el-button @click="go">Editor。。</el-button>
        <el-button @click="send">send。。。</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
const bWindow = ref(null)
function go() {
    // 打开 B
    bWindow.value = window.open('http://localhost:8090/?type=app&id=1&tenant=1&pageid=1');

    // 等待 B 加载完成后再发送（监听 B 发来的“ready”信号更稳妥）
    bWindow.value.addEventListener('load', () => {
    bWindow.value.postMessage({ type: 'GREET', text: 'Hello from A' }, 'http://localhost:8090');
    });
}

// 接收 B 发来的消息
window.addEventListener('message', (event) => {
// 必须校验消息来源
if (event.origin !== 'http://localhost:8090') return;
    console.log('A 收到消息：', event, event.data);
});  

function send() {
    bWindow.value.postMessage({ type: 'Fuck..', text: 'Fuck from A' }, 'http://localhost:8090');
}

</script>
<style lang="less" scoped>

</style>