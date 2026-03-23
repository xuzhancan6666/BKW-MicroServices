const path = require('path')
const glob = require('glob')

// router-schema
// app : koa 实例
// 通过json-schema + ajv 进行请求规则 校验 约束 配合 api-params-verify
// app/router-schema/xxx.js 存放文件 规定单层存放 js 文件
// 输出：
// app.routerSchema = {
//    '${api1}': 'jsonSchema'
//    '${api2}': 'jsonSchema'
//    '${api3}': 'jsonSchema'
// }
module.exports = (app) => {
   // 读取 app/middleware/xxx/xxx.js
   const filePath = path.resolve(app.businessPath, 'router-schema')
   console.log('🔍 正在扫描路由目录:', filePath)
   // 检查目录是否存在
   if (!require('fs').existsSync(filePath)) {
     console.log('📁 路由目录不存在:', filePath)
     app.routerSchema = {}
     return
   }

   //
   // 解析出来的为 ['/app/routerSchema/A.js', '/app/routerSchema/B.js']
   const fileList = glob.sync(path.join(filePath, '**', '*.js'))
   console.log('📋 找到的路由文件:', fileList)

   // 遍历文件夹所有js。内容加载到 app.routerSchema 上
   const routerSchema = {}
   fileList.forEach(file => {
      routerSchema = {
         ...routerSchema,
         ...require(path.resolve(file))
      }
   });

   app.routerSchema = routerSchema
   console.log('✅ 路由加载完成:', Object.keys(app.routerSchema))
}