/**
 * menu.js — 横向菜单 / 纵向菜单
 * ElementUI NavMenu 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  primaryLight: '#ecf5ff',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#e4e7ed',
  borderDark: '#dcdfe6',
  bg: '#f5f7fa',
  bgWhite: '#fff',
  radius: '4px',
}

export function getMenuBlocks() {
  return [
    /* ===== 横向菜单 ===== */
    {
      id: 'el-horizontal-menu',
      label: '横向菜单',
      category: '导航',
      content: `<style>
[data-gjs-type="el-horizontal-menu"]{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;background:${C.bgWhite};border-bottom:1px solid ${C.borderDark};user-select:none}
[data-gjs-type="el-horizontal-menu"] .el-menu-bar{display:flex;align-items:stretch;max-width:1200px;margin:0 auto;}
[data-gjs-type="el-horizontal-menu"] .el-menu-item{display:flex;align-items:center;gap:${px(4)};padding:0 ${px(20)};font-size:${px(14)};color:${C.textSecondary};text-decoration:none;border-bottom:2px solid transparent;cursor:pointer;transition:color .2s,border-color .2s,background .15s;white-space:nowrap;height:${px(56)}}
[data-gjs-type="el-horizontal-menu"] .el-menu-item:hover{color:${C.primary};background:${C.primaryLight}}
[data-gjs-type="el-horizontal-menu"] .el-menu-item.is-active{color:${C.primary};border-bottom-color:${C.primary};background:transparent;font-weight:600}
[data-gjs-type="el-horizontal-menu"] .el-menu-item.is-active:hover{background:${C.primaryLight}}
[data-gjs-type="el-horizontal-menu"] .el-submenu-indicator{margin-left:${px(4)};font-size:${px(10)};color:${C.textTertiary};transition:transform .2s}
</style>
<div data-gjs-type="el-horizontal-menu">
  <div class="el-menu-bar">
    <a class="el-menu-item is-active" style="color:${C.primary};border-bottom-color:${C.primary};font-weight:600;">首页</a>
    <a class="el-menu-item">产品中心 <span class="el-submenu-indicator">▾</span></a>
    <a class="el-menu-item">服务支持</a>
    <a class="el-menu-item">关于我们</a>
    <a class="el-menu-item">新闻资讯 <span class="el-submenu-indicator">▾</span></a>
    <a class="el-menu-item">联系方式</a>
  </div>
</div>`,
    },

    /* ===== 纵向菜单 ===== */
    {
      id: 'el-vertical-menu',
      label: '纵向菜单',
      category: '导航',
      content: `<style>
[data-gjs-type="el-vertical-menu"]{width:${px(240)};font-family:"Microsoft YaHei","PingFang SC",sans-serif;background:${C.bgWhite};border:1px solid ${C.borderDark};border-radius:${C.radius};overflow:hidden;user-select:none}
[data-gjs-type="el-vertical-menu"] .el-menu-group-title{padding:${px(14)} ${px(20)} ${px(6)};font-size:${px(12)};color:${C.textTertiary};font-weight:600;text-transform:uppercase;letter-spacing:1px;}
[data-gjs-type="el-vertical-menu"] .el-menu-item{display:flex;align-items:center;gap:${px(8)};padding:${px(12)} ${px(20)};font-size:${px(14)};color:${C.textSecondary};text-decoration:none;cursor:pointer;border-left:3px solid transparent;transition:background .15s,color .15s,border-color .15s;user-select:none}
[data-gjs-type="el-vertical-menu"] .el-menu-item:hover{background:${C.primaryLight};color:${C.primary}}
[data-gjs-type="el-vertical-menu"] .el-menu-item.is-active{background:${C.primaryLight};color:${C.primary};border-left-color:${C.primary};font-weight:600}
[data-gjs-type="el-vertical-menu"] .el-menu-item .el-icon{display:inline-flex;width:${px(16)};justify-content:center;font-size:${px(16)};}
</style>
<div data-gjs-type="el-vertical-menu">
  <div style="padding:${px(18)} ${px(20)};font-size:${px(15)};font-weight:700;color:${C.text};border-bottom:1px solid ${C.border};background:${C.bg};letter-spacing:1px;">系统导航</div>
  <div class="el-menu-group-title">概览</div>
  <a class="el-menu-item is-active" style="background:${C.primaryLight};color:${C.primary};border-left-color:${C.primary};font-weight:600;">📊 数据看板</a>
  <a class="el-menu-item">📈 数据分析</a>
  <div class="el-menu-group-title">业务</div>
  <a class="el-menu-item">📦 产品管理</a>
  <a class="el-menu-item">👥 客户管理</a>
  <a class="el-menu-item">📄 订单管理</a>
  <div class="el-menu-group-title">系统</div>
  <a class="el-menu-item" style="border-bottom:none;">⚙️ 系统设置</a>
</div>`,
    },
  ]
}
