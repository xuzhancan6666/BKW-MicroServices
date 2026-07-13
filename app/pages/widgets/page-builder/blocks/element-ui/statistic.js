/**
 * statistic.js — 统计组件
 * ElementUI 数据仪表盘风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#dcdfe6',
  bgWhite: '#fff',
  radius: '4px',
}

export function getStatisticBlocks() {
  return [
    {
      id: 'el-statistic',
      label: '统计组件',
      category: '数据展示',
      content: `<style>
[data-gjs-type="el-statistic"]{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
[data-gjs-type="el-statistic"] .el-stat-card{flex:1;background:#fff;border:1px solid ${C.border};border-radius:${C.radius};padding:${px(24)} ${px(20)};text-align:center;cursor:default;transition:transform .25s,box-shadow .25s}
[data-gjs-type="el-statistic"] .el-stat-card:hover{transform:translateY(-3px);box-shadow:0 6px 16px rgba(0,0,0,0.08)}
[data-gjs-type="el-statistic"] .el-stat-label{font-size:${px(13)};color:${C.textTertiary};margin-bottom:${px(10)};letter-spacing:0.5px}
[data-gjs-type="el-statistic"] .el-stat-value{font-size:${px(30)};font-weight:700;color:${C.text};line-height:1.2}
[data-gjs-type="el-statistic"] .el-stat-trend{font-size:${px(12)};margin-top:${px(8)}}
[data-gjs-type="el-statistic"] .el-stat-icon{font-size:${px(24)};margin-bottom:${px(8)};display:block}
</style>
<div data-gjs-type="el-statistic" style="display:flex;flex-wrap:wrap;gap:${px(20)};">
  <div class="el-stat-card">
    <span class="el-stat-icon">👥</span>
    <div class="el-stat-label">总用户数</div>
    <div class="el-stat-value">128,564</div>
    <div class="el-stat-trend" style="color:${C.success};">↑ 较上月 +12.5%</div>
  </div>
  <div class="el-stat-card">
    <span class="el-stat-icon">💰</span>
    <div class="el-stat-label">交易总额</div>
    <div class="el-stat-value">¥3.2亿</div>
    <div class="el-stat-trend" style="color:${C.success};">↑ 较上月 +8.3%</div>
  </div>
  <div class="el-stat-card">
    <span class="el-stat-icon">📦</span>
    <div class="el-stat-label">在售产品</div>
    <div class="el-stat-value">368</div>
    <div class="el-stat-trend" style="color:${C.primary};">→ 较上月 +6</div>
  </div>
</div>`,
    },
  ]
}
