// const monitor = new HeartbeatMonitor({
//   onDisconnect: () => {
//     console.log('[连接超时] 父页面已断开')
//     // 其他断开逻辑...
//   }
// })
// monitor.start()

class HeartbeatMonitor {
  constructor(options = {}) {
    this.allowedOrigin = options.allowedOrigin || 'http://localhost:3000'
    this.timeout = options.timeout || 10000
    this.onDisconnect = options.onDisconnect
    this.timer = null
    this._handler = null
    this.c_st_sign = Date.now()
  }

  start() {
    this._handler = (event) => {
      if (event.origin !== this.allowedOrigin) return
      const { type, message } = event.data
      if (type === 'HEARTBEAT' && message === 'PING') {
        this._replyPong(event)
        this._resetTimer()
      }
    }
    window.addEventListener('message', this._handler)
  }

  stop() {
    if (this._handler) {
      window.removeEventListener('message', this._handler)
      this._handler = null
    }
    clearTimeout(this.timer)
  }

  _replyPong(event) {
    if (event.source && event.source.postMessage) {
      console.log('PONG.....')  
      event.source.postMessage({ type: 'HEARTBEAT', message: 'PONG', st_sign: this.c_st_sign }, event.origin)
    }
  }

  _resetTimer() {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => {
      this.onDisconnect?.()
      clearTimeout(this.timer)
    }, this.timeout)
  }
}

export default HeartbeatMonitor
