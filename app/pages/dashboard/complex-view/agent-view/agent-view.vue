<template>
    <div class="content">
        <el-button @click="go" :disabled="!!heartBeat && connected">Editor。。</el-button>
        <el-button @click="send" :disabled="!connected">send。。。</el-button>
        <el-button @click="stop" :disabled="!connected">stop..</el-button>
    </div>
</template>
<script setup>
import { ref } from 'vue'
import HeartBeat from '../../../common/heart-beat';
let heartBeat = null
const connected = ref(false)

function go() {
    if (heartBeat) heartBeat.stop()
    heartBeat = new HeartBeat({
        windowName: 'editor-agent',
        onOnline: () => connected.value = true,
        onOffline: () => connected.value = false,
    })
    heartBeat.open('http://localhost:4000/?type=app&id=1&tenant=1&pageid=1')
}

function send() {
    heartBeat?.sendMessage({type: '666666', message: '777'})
}

function stop() {
    heartBeat?.stop()
    heartBeat = null
    connected.value = false
}
</script>
<style lang="less" scoped>

</style>