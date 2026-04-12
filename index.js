const Core = require('./core')
// 启用Koa
const core = Core.start({
   name: 'core001',
   homePage: '/view/project-list'
})