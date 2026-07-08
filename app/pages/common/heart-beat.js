/**
 * 基于 postMessage 的双窗口心跳机制
 * 利用的是window.open A窗口 - B窗口有引用关系。targetWindow。
 * 可规避复制粘贴新窗口导致的 多个B窗口多个心跳问题。
 */
class HeartBeat {
    constructor(options = {}) {
        // 目标地址
        this.targetOrigin = options.targetOrigin
        // 打开window
        this.targetWindow = options.targetWindow
        this.STATUS = 'OFF'
        // 心跳间隔
        this.HEARTBEAT_INTERVAL = options.HEARTBEAT_INTERVAL || 3 * 1000
        // 超时时长
        this.DISCONNECT_TIME_OUT = options.DISCONNECT_TIME_OUT || 8 * 1000
        this.onOnline = options.onOnline || (() => {})
        this.onOffline = options.onOffline || (() => {})

        this.st_sign = null
        this.pingTimer = null
        this.checkTimer = null
    }

	// 打开子窗口并建立心跳。
    // 提供一个静态类方法。用于直接open。
	static open(url, options = {}) {
	  const targetWindow = window.open(url)
	  const hb = new HeartBeat({
	    ...options,
	    targetOrigin: options.targetOrigin || new URL(url, location.origin).origin,
	    targetWindow,
	  })
	  hb.start()
	  return hb
	}

    // 启动方法。
    start() {
        this.sendMessage({type: 'HEARTBEAT', message: 'PING'})   // 立即发一次
        // 启动定时任务 发送 PING
        this.pingTimer = setInterval(() => {
            this._PING()
        }, this.HEARTBEAT_INTERVAL)

        // 开启监听
        this._LISTEN()

        //兜底。
        this.checkTimer = setTimeout(() => {
            this.stop()
        }, this.DISCONNECT_TIME_OUT)
    }

    // sendMessage 方法。postMessage。 { type: '', message: '' }
    sendMessage(message) {
        if (!this.targetWindow) return
        this.targetWindow.postMessage(message, this.targetOrigin);
    }
    
    stop() {
        clearInterval(this.pingTimer)
        clearTimeout(this.checkTimer)
        this.pingTimer = null
        this.checkTimer = null
        if (this.STATUS !== 'OFF') {
            this.STATUS = 'OFF'
            this.onOffline()
        }
        console.log(`TIMEOUT DISCONNECT:${this.DISCONNECT_TIME_OUT}s...子页面已断开`)
    }

    getStatus() {
        return this.getStatus
    }

    setTargetWindow(win) {
        this.targetWindow = win
    }

    // 监听 message 事件。接受 PONG。
    // 数据为 type HEARTBEAT && message：PONG
    _LISTEN() {
        window.addEventListener('message', (event) => {
            const { origin, data = {} } = event
            const { type = '', message } = data

            // 如果数据和我们子页面的地址不同。不做操作
            if(origin !== this.targetOrigin) return

            this._handle(data)
        })
    }

    _handle(data) {
        const { type, message } = data
        console.log(`type:${type}, message:${message}`)

        if(type === 'HEARTBEAT' && message === 'PONG') {
            this._PONG()
        }
    }

    _PING() {
        this.sendMessage({type: 'HEARTBEAT', message: 'PING'})
    }

    // 内部 PONG 方法。
    // 如果接收到 PONG。设置status。
    // PONG响应时候。需要设置超时timer。每次pong重置
    _PONG(message) {
        clearTimeout(this.checkTimer)
        this.LAST_PONG_TIME = Date.now()
        if (this.STATUS !== 'ON') {
            this.STATUS = 'ON'
            this.onOnline()
        }
        this.checkTimer = setTimeout(() => {
            this.stop()
        }, this.DISCONNECT_TIME_OUT)
    }

}

export default HeartBeat
