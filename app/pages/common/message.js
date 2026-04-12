import { ElMessage } from 'element-plus'

const TYPE_ENUM = {
   INFO: 'info',
   SUCCESS: 'success',
   ERROR: 'error'
}

function showMessage(options = {}, type = 'info') {
   const config = {
      duration: 3000,
      ...options,
      type,
   }

   return ElMessage(config)
}

export default {
   // 通用
   message: (options, type) => showMessage(options, type),
   success: (options) => showMessage(options, 'success'),
   info: (options) => showMessage(options, 'info'),
   error: (options) => showMessage(options, 'error'),
   warning: (options) => showMessage(options,  'warning')
}