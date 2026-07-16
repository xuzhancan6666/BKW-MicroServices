/**
 * tag.js — 标签
 * ElementUI Tag 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  info: '#909399',
  text: '#303133',
  bgPrimary: '#ecf5ff',
  bgSuccess: '#f0f9eb',
  bgWarning: '#fdf6ec',
  bgDanger: '#fef0f0',
  bgInfo: '#f4f4f5',
  borderPrimary: '#d9ecff',
  borderSuccess: '#e1f3d8',
  borderWarning: '#faecd8',
  borderDanger: '#fde2e2',
  borderInfo: '#e9e9eb',
  bgWhite: '#fff',
}

export function getTagBlocks() {
  return [
    {
      id: 'el-tag',
      label: '标签',
      category: '通用组件',
      content: `<style>
.el-tags-root{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-tags-root .el-tag-item{display:inline-flex;align-items:center;gap:${px(4)};height:${px(26)};padding:0 ${px(10)};font-size:${px(12)};border-radius:${px(4)};white-space:nowrap;cursor:default;transition:transform .15s,box-shadow .15s;user-select:none}
.el-tags-root .el-tag-item:hover{transform:scale(1.06);box-shadow:0 2px 8px rgba(0,0,0,0.1)}
.el-tags-root .el-tag-item.is-hit{border-color:${C.borderPrimary}}
.el-tags-root .el-tag-close{margin-left:${px(4)};font-size:${px(14)};cursor:pointer;opacity:0.6;line-height:1}
.el-tags-root .el-tag-close:hover{opacity:1}
</style>
<div data-gjs-type="el-tag" class="el-tags-root" style="display:flex;gap:${px(8)};flex-wrap:wrap;padding:${px(8)} 0;">
  <span class="el-tag-item" style="background:${C.bgPrimary};color:${C.primary};border:1px solid ${C.borderPrimary};">基金</span>
  <span class="el-tag-item" style="background:${C.bgSuccess};color:${C.success};border:1px solid ${C.borderSuccess};">债券</span>
  <span class="el-tag-item" style="background:${C.bgWarning};color:${C.warning};border:1px solid ${C.borderWarning};">外汇</span>
  <span class="el-tag-item" style="background:${C.bgDanger};color:${C.danger};border:1px solid ${C.borderDanger};">贵金属</span>
  <span class="el-tag-item" style="background:${C.bgInfo};color:${C.info};border:1px solid ${C.borderInfo};">存款</span>
  <span class="el-tag-item" style="background:${C.bgWhite};color:${C.text};border:1px solid ${C.borderInfo};">默认</span>
</div>`,
    },
  ]
}
