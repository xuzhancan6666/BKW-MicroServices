/**
 * timeline.js — 时间线
 * ElementUI Timeline 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#dcdfe6',
  borderLight: '#e4e7ed',
  bgWhite: '#fff',
  radius: '4px',
}

export function getTimelineBlocks() {
  return [
    {
      id: 'el-timeline',
      label: '时间线',
      category: '数据展示',
      content: `<style>
.el-tl-root{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-tl-root .el-tl-item{position:relative;padding-bottom:${px(28)};padding-left:${px(28)};}
.el-tl-root .el-tl-item:last-child{padding-bottom:0}
.el-tl-root .el-tl-line{position:absolute;left:${px(6)};top:${px(18)};bottom:${px(4)};width:2px;background:${C.borderLight};}
.el-tl-root .el-tl-item:last-child .el-tl-line{display:none}
.el-tl-root .el-tl-dot{position:absolute;left:0;top:${px(4)};width:${px(14)};height:${px(14)};border-radius:50%;border:2px solid;z-index:1;}
.el-tl-root .el-tl-content{padding:${px(2)} ${px(0)} ${px(4)} ${px(4)};border-radius:${C.radius};transition:background .15s;cursor:default}
.el-tl-root .el-tl-content:hover{background:#f5f7fa}
.el-tl-root .el-tl-time{font-size:${px(12)};color:${C.textTertiary};margin-bottom:${px(4)}}
.el-tl-root .el-tl-title{font-size:${px(14)};font-weight:600;color:${C.text}}
.el-tl-root .el-tl-desc{font-size:${px(13)};color:${C.textSecondary};margin-top:${px(4)};line-height:1.5}
</style>
<div data-gjs-type="el-timeline" class="el-tl-root" style="padding:${px(24)};background:${C.bgWhite};border-radius:${C.radius};">
  <div class="el-tl-item">
    <div class="el-tl-dot" style="border-color:${C.primary};background:${C.primary};"></div>
    <div class="el-tl-line"></div>
    <div class="el-tl-content">
      <div class="el-tl-time">2024-06-15 09:30</div>
      <div class="el-tl-title">系统升级通知</div>
      <div class="el-tl-desc">网上银行系统将于6月20日凌晨进行升级维护，届时部分服务将暂停使用。</div>
    </div>
  </div>
  <div class="el-tl-item">
    <div class="el-tl-dot" style="border-color:${C.success};background:${C.success};"></div>
    <div class="el-tl-line"></div>
    <div class="el-tl-content">
      <div class="el-tl-time">2024-05-20 14:00</div>
      <div class="el-tl-title">新产品上线</div>
      <div class="el-tl-desc">两只绿色主题基金正式上线，助力可持续投资。</div>
    </div>
  </div>
  <div class="el-tl-item">
    <div class="el-tl-dot" style="border-color:${C.warning};background:${C.warning};"></div>
    <div class="el-tl-line"></div>
    <div class="el-tl-content">
      <div class="el-tl-time">2024-04-10 10:00</div>
      <div class="el-tl-title">优惠活动</div>
      <div class="el-tl-desc">二季度基金申购费率优惠活动现已启动，最高可享1折费率优惠。</div>
    </div>
  </div>
  <div class="el-tl-item">
    <div class="el-tl-dot" style="border-color:${C.borderLight};background:#fff;"></div>
    <div class="el-tl-content">
      <div class="el-tl-time">2024-03-01 08:00</div>
      <div class="el-tl-title">年度报告发布</div>
      <div class="el-tl-desc">2023年度财务报告已正式发布，各项指标稳步增长。</div>
    </div>
  </div>
</div>`,
    },
  ]
}
