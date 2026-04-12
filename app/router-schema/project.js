const { z } = require('zod');
// 这里配置的是 基于 zod 的 schema 定义
// 值为zod 的类型定义字符串
/*
   const schema = z.object({
      page: z.number(),
      pagenum: z.string()
      .....
   })
*/
module.exports = {
   // '/api/post/project/list': {
      // post: [
      //    {
      //       type: 'data',
      //       schema: {
      //          page: z.number(),
      //          pagenum: z.number()
      //       }
      //    },
      // ]
   // }
   '/api/project/list/project': {
      post: [
         {
            type: 'data',
            schema: {
               modelKey: z.string(),
               projectKey: z.string()
            }
         }
      ]
   }
}