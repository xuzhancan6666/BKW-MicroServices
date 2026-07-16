/**
 * link.js — 链接
 * ElementUI Link 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  textSecondary: '#606266',
  textTertiary: '#909399',
  borderLight: '#e4e7ed',
  radius: '4px',
}

export function getLinkBlocks() {
  return [
    {
      id: 'el-link',
      label: '链接',
      category: '通用组件',
      content: `<style>
.el-links-root{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-links-root .el-link-item{display:inline-flex;align-items:center;gap:${px(6)};font-size:${px(14)};cursor:pointer;text-decoration:none;transition:color .15s,opacity .15s;user-select:none}
.el-links-root .el-link-item:hover{color:${C.primary};text-decoration:underline}
.el-links-root .el-link-item.is-underline:hover{text-decoration:underline}
.el-links-root .el-link-item.is-disabled{color:${C.textTertiary}!important;cursor:not-allowed;text-decoration:none!important}
.el-links-root .el-link-item.is-disabled:hover{color:${C.textTertiary}!important;text-decoration:none!important}
</style>
<div data-gjs-type="el-link" class="el-links-root" style="display:flex;align-items:center;gap:${px(20)};flex-wrap:wrap;padding:${px(8)} 0;">
  <a class="el-link-item" style="color:${C.primary};">🔗 默认链接</a>
  <a class="el-link-item is-underline" style="color:${C.success};text-decoration:underline;">✅ 带下划线</a>
  <a class="el-link-item" style="color:${C.warning};">⚠️ 警告链接</a>
  <a class="el-link-item" style="color:${C.danger};">❌ 危险链接</a>
  <a class="el-link-item" style="color:${C.info};">ℹ️ 信息链接 <span style="font-size:${px(12)};">›</span></a>
  <span class="el-link-item is-disabled" style="color:${C.textTertiary};cursor:not-allowed;">🚫 禁用链接</span>
</div>`,
    },
  ]
}
