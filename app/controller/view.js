module.exports = (app) => {
   return class ViewController {
      //**
      // 渲染页面
      //
      async renderPage(ctx) {
         console.log('ctx.params.page.........')
         await ctx.render(`dist/entry.${ctx.params.page}`, {
            name: app.options?.name,
            env: app.env.get(),
            options: JSON.stringify(app.options)
         })
      }
   }
}