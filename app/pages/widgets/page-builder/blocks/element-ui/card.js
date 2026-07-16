/**
 * card.js — 卡片
 * ElementUI Card 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#dcdfe6',
  borderLight: '#e4e7ed',
  bg: '#f5f7fa',
  bgWhite: '#fff',
  radius: '4px',
}

export function getCardBlocks() {
  return [
    {
      id: 'el-card',
      label: '卡片',
      category: '通用组件',
      content: `<style>
.el-card{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-card{background:${C.bgWhite};border:1px solid ${C.borderLight};border-radius:${C.radius};overflow:hidden;transition:box-shadow .25s}
.el-card:hover{box-shadow:0 4px 16px rgba(0,0,0,0.1)}
.el-card .el-card-img{width:100%;height:${px(180)};background:linear-gradient(135deg,#409eff60,#79bbff60);display:flex;align-items:center;justify-content:center;font-size:${px(32)};color:#fff;}
</style>
<div data-gjs-type="el-card" class="el-card" style="background:${C.bgWhite};border:1px solid ${C.borderLight};border-radius:${C.radius};box-shadow:0 2px 8px rgba(0,0,0,0.04);overflow:hidden;transition:box-shadow .25s;">
  <div class="el-card-img">🏞️</div>
  <div style="padding:${px(20)};">
    <div style="font-size:${px(16)};font-weight:600;color:${C.text};margin-bottom:${px(8)};">卡片标题</div>
    <div style="font-size:${px(14)};color:${C.textSecondary};line-height:1.7;">
      卡片内容区域，可用于展示资讯摘要、功能介绍、文章预览等信息。支持图文混排，内容可自由编辑。
    </div>
    <div style="margin-top:${px(16)};display:flex;justify-content:space-between;align-items:center;">
      <span style="font-size:${px(12)};color:${C.textTertiary};">2024-06-15</span>
      <a style="font-size:${px(13)};color:${C.primary};text-decoration:none;cursor:pointer;font-weight:500;">查看详情 →</a>
    </div>
  </div>
</div>`,
    },
  ]
}
