/**
 * carousel.js — 走马灯
 * ElementUI Carousel 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  text: '#303133',
  textSecondary: '#606266',
  radius: '4px',
}

export function getCarouselBlocks() {
  return [
    {
      id: 'el-carousel',
      label: '走马灯',
      category: '通用组件',
      content: `<style>
[data-gjs-type="el-carousel"]{position:relative;width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;background:linear-gradient(135deg,#1a2a3a,#2c3e50);border-radius:${C.radius};overflow:hidden;min-height:${px(300)};user-select:none}
[data-gjs-type="el-carousel"] .el-carousel-container{display:flex;transition:transform .4s cubic-bezier(.25,.46,.45,.94)}
[data-gjs-type="el-carousel"] .el-carousel-slide{flex:0 0 100%;display:flex;align-items:center;justify-content:center;flex-direction:column;color:#fff;height:${px(300)};box-sizing:border-box;padding:${px(40)}}
[data-gjs-type="el-carousel"] .el-carousel-dot{height:${px(8)};border-radius:${px(4)};cursor:pointer;transition:all .3s;border:none;padding:0;outline:none;background:rgba(255,255,255,0.3)}
[data-gjs-type="el-carousel"] .el-carousel-dot:hover{background:${C.primary}!important}
[data-gjs-type="el-carousel"] .el-carousel-dot.is-active{background:${C.primary}!important}
[data-gjs-type="el-carousel"] .el-carousel-btn{position:absolute;top:50%;transform:translateY(-50%);width:${px(36)};height:${px(36)};border-radius:50%;background:rgba(255,255,255,0.15);color:#fff;border:none;cursor:pointer;display:flex;align-items:center;justify-content:center;font-size:${px(18)};transition:background .2s;backdrop-filter:blur(4px)}
[data-gjs-type="el-carousel"] .el-carousel-btn:hover{background:rgba(255,255,255,0.3)}
</style>
<div data-gjs-type="el-carousel">
  <div class="el-carousel-container">
    <div class="el-carousel-slide" style="background:linear-gradient(135deg,#409eff,#337ecc);">
      <div style="font-size:${px(32)};font-weight:700;margin-bottom:${px(16)};letter-spacing:2px;text-shadow:0 2px 8px rgba(0,0,0,0.2);">智慧理财</div>
      <div style="font-size:${px(16)};color:rgba(255,255,255,0.85);max-width:${px(400)};text-align:center;line-height:1.6;">专业财富管理方案，为您的资产保驾护航</div>
    </div>
    <div class="el-carousel-slide" style="background:linear-gradient(135deg,#67c23a,#529b2e);display:none;">
      <div style="font-size:${px(32)};font-weight:700;margin-bottom:${px(16)};letter-spacing:2px;text-shadow:0 2px 8px rgba(0,0,0,0.2);">投资未来</div>
      <div style="font-size:${px(16)};color:rgba(255,255,255,0.85);max-width:${px(400)};text-align:center;line-height:1.6;">多元化投资组合，分散风险，稳健增值</div>
    </div>
    <div class="el-carousel-slide" style="background:linear-gradient(135deg,#e6a23c,#cf9236);display:none;">
      <div style="font-size:${px(32)};font-weight:700;margin-bottom:${px(16)};letter-spacing:2px;text-shadow:0 2px 8px rgba(0,0,0,0.2);">专业服务</div>
      <div style="font-size:${px(16)};color:rgba(255,255,255,0.85);max-width:${px(400)};text-align:center;line-height:1.6;">资深理财顾问，为您提供一对一专属服务</div>
    </div>
  </div>
  <div style="position:absolute;bottom:${px(20)};left:50%;transform:translateX(-50%);display:flex;gap:${px(8)};z-index:2;">
    <button class="el-carousel-dot is-active" style="width:${px(28)};background:${C.primary};"></button>
    <button class="el-carousel-dot" style="width:${px(8)};background:rgba(255,255,255,0.3);"></button>
    <button class="el-carousel-dot" style="width:${px(8)};background:rgba(255,255,255,0.3);"></button>
  </div>
  <button class="el-carousel-btn" style="left:${px(12)};">‹</button>
  <button class="el-carousel-btn" style="right:${px(12)};">›</button>
</div>`,
    },
  ]
}
