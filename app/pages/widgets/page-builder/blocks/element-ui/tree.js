/**
 * tree.js — 树控件
 * ElementUI Tree 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  borderLight: '#e4e7ed',
  bg: '#f5f7fa',
  bgWhite: '#fff',
  radius: '4px',
}

export function getTreeBlocks() {
  return [
    {
      id: 'el-tree',
      label: '树控件',
      category: '数据展示',
      content: `<style>
.el-tree{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
.el-tree .el-tree-node{display:flex;align-items:center;gap:${px(4)};padding:${px(6)} ${px(4)};border-radius:${C.radius};cursor:pointer;user-select:none;transition:background .12s}
.el-tree .el-tree-node:hover{background:${C.bg}}
.el-tree .el-tree-node.is-selected{background:#ecf5ff;color:${C.primary}}
.el-tree .el-tree-indicator{display:inline-flex;width:${px(16)};font-size:${px(12)};color:${C.textTertiary};flex-shrink:0;justify-content:center;transition:transform .15s}
.el-tree .el-tree-indicator.is-expanded{transform:rotate(0deg)}
.el-tree .el-tree-children{padding-left:${px(24)}}
.el-tree .el-tree-leaf{display:flex;align-items:center;gap:${px(6)};padding:${px(6)} ${px(4)} ${px(6)} ${px(24)};color:${C.textSecondary};border-radius:${C.radius};cursor:pointer;transition:background .12s}
.el-tree .el-tree-leaf:hover{background:${C.bg}}
.el-tree .el-tree-icon{font-size:${px(14)};width:${px(16)};text-align:center;flex-shrink:0}
</style>
<div data-gjs-type="el-tree" class="el-tree" style="padding:${px(16)};background:${C.bgWhite};border:1px solid ${C.borderLight};border-radius:${C.radius};">
  <div>
    <div>
      <div class="el-tree-node">
        <span class="el-tree-indicator" style="display:inline-flex;width:${px(16)};font-size:${px(12)};color:${C.textTertiary};justify-content:center;">▾</span>
        <span class="el-tree-icon">📁</span>
        <span style="font-weight:600;">投资产品</span>
      </div>
      <div class="el-tree-children">
        <div>
          <div class="el-tree-node">
            <span class="el-tree-indicator" style="display:inline-flex;width:${px(16)};font-size:${px(12)};color:${C.textTertiary};justify-content:center;">▾</span>
            <span class="el-tree-icon">📂</span>
            <span>基金产品</span>
          </div>
          <div class="el-tree-children">
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>股票型基金</div>
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>债券型基金</div>
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>混合型基金</div>
          </div>
        </div>
        <div>
          <div class="el-tree-node">
            <span class="el-tree-indicator" style="display:inline-flex;width:${px(16)};font-size:${px(12)};color:${C.textTertiary};justify-content:center;">▸</span>
            <span class="el-tree-icon">📂</span>
            <span>保险产品</span>
          </div>
          <div class="el-tree-children" style="display:none;">
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>人寿保险</div>
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>医疗保险</div>
          </div>
        </div>
        <div>
          <div class="el-tree-node">
            <span class="el-tree-indicator" style="display:inline-flex;width:${px(16)};font-size:${px(12)};color:${C.textTertiary};justify-content:center;">▸</span>
            <span class="el-tree-icon">📂</span>
            <span>存款产品</span>
          </div>
          <div class="el-tree-children" style="display:none;">
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>活期存款</div>
            <div class="el-tree-leaf"><span class="el-tree-icon">📄</span>定期存款</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>`,
    },
  ]
}
