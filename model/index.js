const _ = require('lodash')
const glob = require('glob')
const path = require('path')
const { sep } = path;

// project 继承 model 的基础方法
const projectExtendModel = (model, project) => {
  return _.mergeWith({}, model, project, (modelValue, projValue) => {
    // 只有当两个值都是数组时，才执行自定义数组合并
    if (Array.isArray(modelValue) && Array.isArray(projValue)) {
      const result = [];
      // 处理 model 中的每一项（保留或递归合并）
      for (const modelItem of modelValue) {
        const projItem = projValue.find(item => item.key === modelItem.key);
        result.push(projItem ? projectExtendModel(modelItem, projItem) : modelItem);
      }
      // 处理 proj 中新增的项（model 中没有的）
      for (const projItem of projValue) {
        const modelItem = modelValue.find(item => item.key === projItem.key);
        if (!modelItem) {
          result.push(projItem);
        }
      }
      return result;
    }
    // 非数组情况：返回 undefined，让 mergeWith 使用默认合并（对象递归，值覆盖）
    return undefined;
  });
};

/*
目标： 解析文件路径/model。返回数据结构如下
[{
   model: ${model},
   project:  {
      pdd: {pdd}
      taobao: {taobao}
   }
}]
*/

module.exports = (app) => {
   const modelList = []
   const modelPath = path.resolve(process.cwd(), `.${sep}model`);
   const filePathList = glob.sync(`${modelPath}${sep}**${sep}*.js`);
   // filePathList [
   //    '/Applications/Can/work/temp1/vueTemp001/model/business/model.js',
   //    '/Applications/Can/work/temp1/vueTemp001/model/business/project/pdd.js',
   //    '/Applications/Can/work/temp1/vueTemp001/model/business/project/taobao.js',

   //    '/Applications/Can/work/temp1/vueTemp001/model/course/model.js',
   //    '/Applications/Can/work/temp1/vueTemp001/model/course/project/bilibili.js',
   //    '/Applications/Can/work/temp1/vueTemp001/model/course/project/douyin.js',

   //    '/Applications/Can/work/temp1/vueTemp001/model/index.js' /// 排除
   // ]

   // 分类。business / course
   // 如果没有该类型。 set 存下新对象。modelList 存下新对象。
   // 如果是 类型A。那么取modelList最后一个对象lastOne。
   // 如果当前路径是 model.js 那么我们赋值 lastOne.model = require(当前路径)
   // 如果当前路径是 project 那么我们赋值 lastOne.project.文件名 = require(当前路径)

   const typeSet = new Set()
   filePathList.forEach((filePath, index) => {
      const subFilePath = filePath.slice(filePath.indexOf('/model/') + 7, filePath.length)
      const arr = subFilePath.indexOf(`${sep}`) > -1 ? subFilePath.split(`${sep}`) : subFilePath.split('/');
      // 分类。business / course
      const pathType = arr[0]
      const isModel = arr[arr.length - 1] === 'model.js'
      const fileName = path.basename(filePath, '.js');

      if(pathType.indexOf('.js') > -1) {
         return
      }
      // 如果没有该类型。并且 type！== xxx.js set 存下新对象。modelList 存下新对象。
      if(!typeSet.has(pathType)) {
         typeSet.add(pathType)
         modelList.push({})
      }
      const lastindex = modelList.length - 1;
      if(isModel) {
         modelList[lastindex].model = require(filePath)
         modelList[lastindex].model.key = pathType
      } else {
         modelList[lastindex].project = modelList[lastindex].project || {}
         modelList[lastindex].project[fileName] = require(filePath)
         modelList[lastindex].project[fileName].key = fileName
      }
   })

   modelList.forEach((item) => {
      const { model, project } = item

      for(let key in project) {
         project[key] = projectExtendModel(model, project[key])
      }
   })

   return modelList
}