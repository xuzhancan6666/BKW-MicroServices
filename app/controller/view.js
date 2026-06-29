const fs = require('fs')
const path = require('path')

module.exports = (app) => {
   // 从 webpack 构建产物中获取有效页面列表
   const distDir = path.resolve(process.cwd(), './app/public/dist')
   const validPages = new Set()
   try {
      fs.readdirSync(distDir).forEach((file) => {
         const match = file.match(/^entry\.(.+)\.tpl$/)
         if (match) validPages.add(match[1])
      })
   } catch (_) { /* dist 目录可能还不存在 */ }

   return class ViewController {
      //**
      // 渲染页面
      //
      async renderPage(ctx) {
         const page = ctx.params.page
         if (!validPages.has(page)) {
            ctx.redirect(app.options?.homePage || '/')
            return
         }
         await ctx.render(`dist/entry.${page}`, {
            name: app.options?.name,
            env: app.env.get(),
            options: JSON.stringify(app.options)
         })
      }
   }
}