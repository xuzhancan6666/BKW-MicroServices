module.exports = (app) => {
   const BaseService = require('./base-service')(app)
   let fdata = [{
      name: 'Credit Card Page',
   }, {
      name: 'News Page',
   }, {
      name: 'Holiday discount Page',
   }]
   
   return class SocialAppService extends BaseService{
      constructor() {
         super()
         this.data = fdata
      }

      getList() {
         return this.data
      }

      deleteList(id) {
         this.data = this.data.filter(d => d.id !== id)
      }
   }
}