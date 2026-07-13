// 创建broadCastChannel
// 用于同域 消息通知。

// 注册同域频道 ID。
const CHANNEL_NANE = 'CHANNEL'

// 创建BroadcastChannel
const channel = new BroadcastChannel()

// bcc 发送
function notifyNewLog(logId) {
    channel.postMessage({type: 'NEW_Log', logId})
}

// bcc 监听
function listen(cb) {
    channel.onmessage((event) => {
        if(event.data && event.data.type === 'NEW_Log') {
            cb(event.data)
        }
    })
}