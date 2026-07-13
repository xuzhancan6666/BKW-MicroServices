/**
 * table.js — 表格
 * ElementUI Table 风格
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  success: '#67c23a',
  warning: '#e6a23c',
  danger: '#f56c6c',
  text: '#303133',
  textSecondary: '#606266',
  textTertiary: '#909399',
  border: '#dcdfe6',
  borderLight: '#e4e7ed',
  bg: '#f5f7fa',
  bgWhite: '#fff',
  bgSuccess: '#f0f9eb',
  bgWarning: '#fdf6ec',
  bgDanger: '#fef0f0',
  radius: '4px',
}

export function getTableBlocks() {
  return [
    {
      id: 'el-table',
      label: '表格',
      category: '数据展示',
      content: `<style>
[data-gjs-type="el-table"]{width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box}
[data-gjs-type="el-table"] table{width:100%;border-collapse:collapse;font-size:${px(14)}}
[data-gjs-type="el-table"] thead th{padding:${px(14)} ${px(16)};text-align:left;font-weight:600;color:${C.text};background:${C.bg};border-bottom:1px solid ${C.border};white-space:nowrap}
[data-gjs-type="el-table"] tbody td{padding:${px(12)} ${px(16)};color:${C.textSecondary};border-bottom:1px solid ${C.borderLight};transition:background .12s}
[data-gjs-type="el-table"] tbody tr{transition:background .12s}
[data-gjs-type="el-table"] tbody tr:hover td{background:#f5f7fa}
[data-gjs-type="el-table"] tbody tr:last-child td{border-bottom:none}
[data-gjs-type="el-table"] .el-tag{display:inline-block;padding:${px(1)} ${px(8)};font-size:${px(12)};border-radius:${px(3)};line-height:1.8}
</style>
<div data-gjs-type="el-table" style="background:${C.bgWhite};border:1px solid ${C.border};border-radius:${C.radius};overflow:hidden;">
  <table>
    <thead>
      <tr>
        <th>产品名称</th>
        <th>年化收益</th>
        <th>风险等级</th>
        <th>投资期限</th>
        <th>起投金额</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td style="font-weight:500;color:${C.text};">稳健增长基金</td>
        <td style="color:${C.success};font-weight:600;">4.50%</td>
        <td><span class="el-tag" style="background:${C.bgSuccess};color:${C.success};">低风险</span></td>
        <td>365天</td>
        <td>¥1,000</td>
      </tr>
      <tr>
        <td style="font-weight:500;color:${C.text};">进取成长混合</td>
        <td style="color:${C.warning};font-weight:600;">7.20%</td>
        <td><span class="el-tag" style="background:${C.bgWarning};color:${C.warning};">中风险</span></td>
        <td>730天</td>
        <td>¥5,000</td>
      </tr>
      <tr>
        <td style="font-weight:500;color:${C.text};">新兴科技主题</td>
        <td style="color:${C.danger};font-weight:600;">9.80%</td>
        <td><span class="el-tag" style="background:${C.bgDanger};color:${C.danger};">高风险</span></td>
        <td>1,095天</td>
        <td>¥10,000</td>
      </tr>
      <tr>
        <td style="font-weight:500;color:${C.text};">货币增利宝</td>
        <td style="color:${C.success};font-weight:600;">2.10%</td>
        <td><span class="el-tag" style="background:${C.bgSuccess};color:${C.success};">低风险</span></td>
        <td>灵活存取</td>
        <td>¥1</td>
      </tr>
    </tbody>
  </table>
</div>`,
    },
  ]
}
