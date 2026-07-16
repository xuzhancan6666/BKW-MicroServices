/**
 * steps.js — 步骤条
 * ElementUI Steps 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#dcdfe6',
  borderLight: '#e4e7ed',
  bg: '#f5f7fa',
  bgWhite: '#fff',
  radius: '4px',
}

export function getStepsBlocks() {
  return [
    {
      id: 'el-steps',
      label: '步骤条',
      category: '数据展示',
      content: `<style>
.el-steps-root{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-steps-root .el-step{flex:1;text-align:center;position:relative}
.el-steps-root .el-step-circle{width:${px(32)};height:${px(32)};line-height:${px(32)};border-radius:50%;display:inline-block;font-size:${px(14)};font-weight:700;transition:transform .2s,box-shadow .2s;cursor:default}
.el-steps-root .el-step-circle:hover{transform:scale(1.12);box-shadow:0 0 0 4px rgba(64,158,255,0.2)}
.el-steps-root .el-step-circle.is-default:hover{box-shadow:0 0 0 4px rgba(144,147,153,0.12)}
.el-steps-root .el-step-connector{flex:0 0 ${px(60)};height:1px;align-self:flex-start;margin-top:${px(16)}}
.el-steps-root .el-step-title{font-size:${px(14)};font-weight:600;margin-top:${px(10)}}
.el-steps-root .el-step-desc{font-size:${px(12)};color:${C.textTertiary};margin-top:${px(4)};line-height:1.4}
</style>
<div data-gjs-type="el-steps" class="el-steps-root" style="display:flex;align-items:flex-start;padding:${px(32)} ${px(24)};background:${C.bgWhite};border-radius:${C.radius};">
  <div class="el-step">
    <div class="el-step-circle" style="background:${C.primary};color:#fff;">1</div>
    <div class="el-step-title" style="color:${C.primary};">申请</div>
    <div class="el-step-desc">填写申请信息</div>
  </div>
  <div class="el-step-connector" style="background:${C.primary};"></div>
  <div class="el-step">
    <div class="el-step-circle" style="background:${C.primary};color:#fff;">2</div>
    <div class="el-step-title" style="color:${C.primary};">审核</div>
    <div class="el-step-desc">资料审核中</div>
  </div>
  <div class="el-step-connector" style="background:${C.border};"></div>
  <div class="el-step">
    <div class="el-step-circle is-default" style="background:${C.bg};color:${C.textTertiary};border:1px solid ${C.borderLight};">3</div>
    <div class="el-step-title" style="color:${C.textSecondary};">签约</div>
    <div class="el-step-desc">面签合同</div>
  </div>
  <div class="el-step-connector" style="background:${C.border};"></div>
  <div class="el-step">
    <div class="el-step-circle is-default" style="background:${C.bg};color:${C.textTertiary};border:1px solid ${C.borderLight};">4</div>
    <div class="el-step-title" style="color:${C.textSecondary};">完成</div>
    <div class="el-step-desc">办理完成</div>
  </div>
</div>`,
    },
  ]
}
