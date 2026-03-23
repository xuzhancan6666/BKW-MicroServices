module.exports = {
   // 开发本地
   isLocal() {
      return process.env._ENV === 'local'
   },

   // 测试
   isBeta() {
      return process.env._ENV === 'beta'
   },
   // 生产
   isPro() {
      return process.env._ENV === 'pro'
   },

   // 获取当前环境
   get() {
      return process.env._ENV || 'local'
   }
}