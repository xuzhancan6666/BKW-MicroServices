/**
 * blocks/index.js — APP 端手机页面组件 block 集合
 * 所有尺寸基于 375px 设计稿，使用 px 单位（导出时自动转 rem）
 */

const px = (v) => v + 'px'
const full = 'width:100%;box-sizing:border-box;'

/* ====================================================================
   基础组件（独立、简单、可自由组合）
   ==================================================================== */

const basicContainer = {
  id: 'app-basic-container',
  label: '容器',
  category: '基础',
  content: `<div data-gjs-type="app-block" style="${full}min-height:${px(48)};padding:${px(16)};background:#fff;display:flex;flex-direction:column;gap:${px(8)};">
  <div style="height:${px(24)};border-radius:${px(4)};background:#f5f7fa;"></div>
  <div style="height:${px(24)};border-radius:${px(4)};background:#f5f7fa;width:60%;"></div>
</div>`,
}

const basicHeading = {
  id: 'app-basic-heading',
  label: '标题',
  category: '基础',
  content: {
    type: 'default',
    style: { width: '100%', padding: px(12) + ' ' + px(16), background: '#fff' },
    components: [
      {
        type: 'text',
        style: { padding: '0', margin: '0', fontSize: px(20), fontWeight: 700, color: '#1a1a2e', lineHeight: '1.4' },
        content: '标题文字',
      },
    ],
  },
}

const basicText = {
  id: 'app-basic-text',
  label: '文本',
  category: '基础',
  content: {
    type: 'default',
    style: { width: '100%', padding: px(12) + ' ' + px(16), background: '#fff' },
    components: [
      {
        type: 'text',
        style: { padding: '0', margin: '0', fontSize: px(14), color: '#555', lineHeight: '1.7', wordBreak: 'break-all', overflow: 'hidden', textOverflow: 'ellipsis' },
        content: '这是一段正文内容，用于展示产品说明或信息描述，支持多行文本展示。',
      },
    ],
  },
}

const basicImage = {
  id: 'app-basic-image',
  label: '图片',
  category: '基础',
  content: `<div style="${full}">
  <div data-gjs-type="image" style="width:100%;height:${px(180)};background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:${px(14)};color:rgba(255,255,255,0.7);">点击替换图片</div>
</div>`,
}

const basicButton = {
  id: 'app-basic-button',
  label: '按钮',
  category: '基础',
  content: `<div style="${full}padding:${px(12)} ${px(16)};">
  <div style="height:${px(44)};border-radius:${px(22)};background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:${px(15)};font-weight:600;color:#fff;letter-spacing:${px(1)};">立即体验</div>
</div>`,
}

const basicDivider = {
  id: 'app-basic-divider',
  label: '分割线',
  category: '基础',
  content: `<div style="${full}height:${px(1)};background:#f0f0f0;"></div>`,
}

const basicSpacer = {
  id: 'app-basic-spacer',
  label: '留白',
  category: '基础',
  content: `<div data-gjs-type="app-block" style="${full}height:${px(16)};background:transparent;display:flex;flex-direction:column;"></div>`,
}

const basicCaption = {
  id: 'app-basic-caption',
  label: '副文本',
  category: '基础',
  content: {
    type: 'default',
    style: { width: '100%', padding: px(4) + ' ' + px(16), background: '#fff' },
    components: [
      {
        type: 'text',
        style: { padding: '0', margin: '0', fontSize: px(12), color: '#999', lineHeight: '1.5' },
        content: '辅助说明文字，用于展示次要信息',
      },
    ],
  },
}

const layoutHorizontal = {
  id: 'app-layout-horizontal',
  label: '横向布局',
  category: '基础',
  content: {
    type: 'app-block',
    layoutDirection: 'horizontal',
    style: {
      width: '100%',
      boxSizing: 'border-box',
      minHeight: px(60),
      padding: px(8),
      background: '#fff',
      display: 'flex',
      flexDirection: 'row',
      flexWrap: 'nowrap',
      gap: px(8),
      alignItems: 'stretch',
    },
    components: [
      {
        tagName: 'div',
        type: 'app-block',
        layoutDirection: 'vertical',
        style: { flex: '1', minHeight: px(44), borderRadius: px(6), background: 'linear-gradient(135deg,#667eea20,#764ba220)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: px(12), color: '#667eea' },
        content: '左侧',
      },
      {
        tagName: 'div',
        type: 'app-block',
        layoutDirection: 'vertical',
        style: { flex: '1', minHeight: px(44), borderRadius: px(6), background: 'linear-gradient(135deg,#4facfe20,#00f2fe20)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: px(12), color: '#4facfe' },
        content: '右侧',
      },
    ],
  },
}

/* ====================================================================
   炫酷组件（视觉冲击力强、现代感）
   ==================================================================== */

/* ——— 渐变英雄区 ——— */
const heroBanner = {
  id: 'app-cool-hero',
  label: '英雄区',
  category: '炫酷',
  content: `<div style="${full}background:linear-gradient(135deg,#667eea 0%,#764ba2 100%);padding:${px(40)} ${px(24)};text-align:center;position:relative;overflow:hidden;">
  <div style="position:absolute;top:-${px(30)};right:-${px(30)};width:${px(120)};height:${px(120)};border-radius:50%;background:rgba(255,255,255,0.06);"></div>
  <div style="position:absolute;bottom:-${px(40)};left:-${px(20)};width:${px(80)};height:${px(80)};border-radius:50%;background:rgba(255,255,255,0.04);"></div>
  <div style="font-size:${px(28)};font-weight:800;color:#fff;line-height:1.3;text-shadow:0 2px 10px rgba(0,0,0,0.15);">全新体验</div>
  <div style="font-size:${px(14)};color:rgba(255,255,255,0.85);margin-top:${px(12)};line-height:1.6;max-width:${px(280)};margin-left:auto;margin-right:auto;">用科技改变生活，让每一天都充满可能</div>
  <div style="margin-top:${px(24)};display:inline-block;padding:${px(10)} ${px(32)};border-radius:${px(25)};background:#fff;color:#667eea;font-size:${px(14)};font-weight:600;box-shadow:0 4px 15px rgba(0,0,0,0.15);">开始探索</div>
</div>`,
}

/* ——— 玻璃态卡片 ——— */
const glassCard = {
  id: 'app-cool-glass',
  label: '玻璃卡片',
  category: '炫酷',
  content: `<div style="${full}padding:${px(20)} ${px(16)};background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);">
  <div style="backdrop-filter:blur(10px);background:rgba(255,255,255,0.08);border-radius:${px(16)};border:1px solid rgba(255,255,255,0.12);padding:${px(24)};box-shadow:0 8px 32px rgba(0,0,0,0.3);">
    <div style="display:flex;align-items:center;gap:${px(12)};">
      <div style="width:${px(48)};height:${px(48)};border-radius:${px(12)};background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;font-size:${px(22)};">✦</div>
      <div style="flex:1;">
        <div style="font-size:${px(16)};font-weight:700;color:#fff;">会员权益</div>
        <div style="font-size:${px(12)};color:rgba(255,255,255,0.6);margin-top:${px(2)};">尊享专属服务</div>
      </div>
      <div style="padding:${px(6)} ${px(14)};border-radius:${px(15)};background:rgba(102,126,234,0.4);font-size:${px(12)};color:#fff;border:1px solid rgba(255,255,255,0.15);">升级</div>
    </div>
  </div>
</div>`,
}

/* ——— 瀑布流卡片 ——— */
const waterfallCard = {
  id: 'app-cool-waterfall',
  label: '瀑布卡片',
  category: '炫酷',
  content: `<div style="${full}padding:${px(16)};">
  <div style="border-radius:${px(12)};overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.06);background:#fff;">
    <div style="height:${px(160)};background:linear-gradient(135deg,#f093fb,#f5576c);position:relative;">
      <div style="position:absolute;top:${px(12)};left:${px(12)};background:rgba(245,87,108,0.9);color:#fff;font-size:${px(11)};font-weight:600;padding:${px(2)} ${px(8)};border-radius:${px(4)};">HOT</div>
    </div>
    <div style="padding:${px(16)};">
      <div style="font-size:${px(16)};font-weight:700;color:#1a1a2e;">潮流单品</div>
      <div style="font-size:${px(13)};color:#888;margin-top:${px(6)};line-height:1.5;">限定款来袭，时尚与舒适的完美结合</div>
      <div style="display:flex;align-items:center;justify-content:space-between;margin-top:${px(12)};">
        <span style="font-size:${px(20)};font-weight:800;color:#f5576c;">¥299</span>
        <span style="font-size:${px(12)};color:#bbb;text-decoration:line-through;">¥599</span>
      </div>
    </div>
  </div>
</div>`,
}

/* ——— 数据统计 ——— */
const dataStats = {
  id: 'app-cool-stats',
  label: '数据统计',
  category: '炫酷',
  content: `<div style="${full}padding:${px(20)} ${px(16)};background:linear-gradient(135deg,#4facfe,#00f2fe);">
  <div style="display:flex;text-align:center;">
    <div style="flex:1;border-right:1px solid rgba(255,255,255,0.2);">
      <div style="font-size:${px(28)};font-weight:800;color:#fff;">12,345</div>
      <div style="font-size:${px(12)};color:rgba(255,255,255,0.8);margin-top:${px(4)};">用户总数</div>
    </div>
    <div style="flex:1;border-right:1px solid rgba(255,255,255,0.2);">
      <div style="font-size:${px(28)};font-weight:800;color:#fff;">98%</div>
      <div style="font-size:${px(12)};color:rgba(255,255,255,0.8);margin-top:${px(4)};">满意度</div>
    </div>
    <div style="flex:1;">
      <div style="font-size:${px(28)};font-weight:800;color:#fff;">5,678</div>
      <div style="font-size:${px(12)};color:rgba(255,255,255,0.8);margin-top:${px(4)};">订单量</div>
    </div>
  </div>
</div>`,
}

/* ——— 步骤条 ——— */
const stepsBar = {
  id: 'app-cool-steps',
  label: '步骤条',
  category: '炫酷',
  content: `<div style="${full}padding:${px(20)} ${px(16)};background:#fff;">
  <div style="display:flex;align-items:flex-start;">
    <div style="flex:1;text-align:center;position:relative;">
      <div style="width:${px(32)};height:${px(32)};border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;margin:0 auto;color:#fff;font-size:${px(14)};font-weight:700;">1</div>
      <div style="font-size:${px(12)};color:#667eea;font-weight:600;margin-top:${px(6)};">选择</div>
    </div>
    <div style="flex:1;align-self:center;height:${px(2)};background:linear-gradient(90deg,#667eea 50%,#e8e8e8 50%);margin:0 ${px(-8)};margin-top:-${px(16)};"></div>
    <div style="flex:1;text-align:center;position:relative;">
      <div style="width:${px(32)};height:${px(32)};border-radius:50%;background:#e8e8e8;display:flex;align-items:center;justify-content:center;margin:0 auto;color:#999;font-size:${px(14)};font-weight:700;">2</div>
      <div style="font-size:${px(12)};color:#999;margin-top:${px(6)};">下单</div>
    </div>
    <div style="flex:1;align-self:center;height:${px(2)};background:#e8e8e8;margin:0 ${px(-8)};margin-top:-${px(16)};"></div>
    <div style="flex:1;text-align:center;position:relative;">
      <div style="width:${px(32)};height:${px(32)};border-radius:50%;background:#e8e8e8;display:flex;align-items:center;justify-content:center;margin:0 auto;color:#999;font-size:${px(14)};font-weight:700;">3</div>
      <div style="font-size:${px(12)};color:#999;margin-top:${px(6)};">完成</div>
    </div>
  </div>
</div>`,
}

/* ——— 特色标签组 ——— */
const tagGroup = {
  id: 'app-cool-tags',
  label: '标签组',
  category: '炫酷',
  content: `<div style="${full}padding:${px(16)};background:#fff;">
  <div style="display:flex;flex-wrap:wrap;gap:${px(8)};">
    <span style="padding:${px(6)} ${px(14)};border-radius:${px(6)};background:linear-gradient(135deg,#667eea20,#764ba220);color:#667eea;font-size:${px(13)};font-weight:500;">新品</span>
    <span style="padding:${px(6)} ${px(14)};border-radius:${px(6)};background:#fef0f0;color:#f56c6c;font-size:${px(13)};font-weight:500;">限时折扣</span>
    <span style="padding:${px(6)} ${px(14)};border-radius:${px(6)};background:#f0f9eb;color:#67c23a;font-size:${px(13)};font-weight:500;">包邮</span>
    <span style="padding:${px(6)} ${px(14)};border-radius:${px(6)};background:#fdf6ec;color:#e6a23c;font-size:${px(13)};font-weight:500;">赠品</span>
    <span style="padding:${px(6)} ${px(14)};border-radius:${px(6)};background:#f5f7fa;color:#606266;font-size:${px(13)};font-weight:500;">满减</span>
  </div>
</div>`,
}

/* ——— 通知角标 ——— */
const notificationBadge = {
  id: 'app-cool-badge',
  label: '消息提醒',
  category: '炫酷',
  content: `<div style="${full}padding:${px(12)} ${px(16)};background:#fff;">
  <div style="display:flex;align-items:center;gap:${px(12)};padding:${px(14)} ${px(16)};background:linear-gradient(135deg,#fef0f0,#fff);border-radius:${px(12)};border-left:${px(4)} solid #f56c6c;">
    <div style="position:relative;">
      <span style="font-size:${px(22)};">🔔</span>
      <span style="position:absolute;top:-${px(4)};right:-${px(6)};min-width:${px(18)};height:${px(18)};border-radius:${px(9)};background:#f56c6c;color:#fff;font-size:${px(10)};font-weight:700;display:flex;align-items:center;justify-content:center;padding:0 ${px(4)};">3</span>
    </div>
    <div style="flex:1;">
      <div style="font-size:${px(14)};font-weight:600;color:#303133;">您有新的消息</div>
      <div style="font-size:${px(12)};color:#909399;margin-top:${px(2)};">查看详情 ›</div>
    </div>
  </div>
</div>`,
}

/* ——— 倒计时 ——— */
const countdown = {
  id: 'app-cool-countdown',
  label: '倒计时',
  category: '炫酷',
  content: `<div style="${full}padding:${px(16)};background:linear-gradient(135deg,#0f0c29,#302b63);text-align:center;">
  <div style="font-size:${px(13)};color:rgba(255,255,255,0.7);">距离活动结束</div>
  <div style="display:flex;justify-content:center;gap:${px(8)};margin-top:${px(12)};">
    <span style="display:inline-block;padding:${px(6)} ${px(12)};border-radius:${px(6)};background:rgba(255,255,255,0.1);font-size:${px(22)};font-weight:800;color:#fff;letter-spacing:${px(2)};font-variant-numeric:tabular-nums;">12</span>
    <span style="font-size:${px(22)};color:rgba(255,255,255,0.5);align-self:center;">:</span>
    <span style="display:inline-block;padding:${px(6)} ${px(12)};border-radius:${px(6)};background:rgba(255,255,255,0.1);font-size:${px(22)};font-weight:800;color:#fff;letter-spacing:${px(2)};font-variant-numeric:tabular-nums;">24</span>
    <span style="font-size:${px(22)};color:rgba(255,255,255,0.5);align-self:center;">:</span>
    <span style="display:inline-block;padding:${px(6)} ${px(12)};border-radius:${px(6)};background:rgba(255,255,255,0.1);font-size:${px(22)};font-weight:800;color:#fff;letter-spacing:${px(2)};font-variant-numeric:tabular-nums;">58</span>
  </div>
</div>`,
}

/* ——— 进度条 ——— */
const progressBar = {
  id: 'app-cool-progress',
  label: '进度条',
  category: '炫酷',
  content: `<div style="${full}padding:${px(20)} ${px(16)};background:#fff;">
  <div style="display:flex;justify-content:space-between;font-size:${px(13)};color:#303133;margin-bottom:${px(8)};">
    <span>任务进度</span>
    <span style="font-weight:700;color:#667eea;">68%</span>
  </div>
  <div style="height:${px(8)};border-radius:${px(4)};background:#f0f0f0;overflow:hidden;">
    <div style="height:100%;width:68%;border-radius:${px(4)};background:linear-gradient(90deg,#667eea,#764ba2);"></div>
  </div>
  <div style="font-size:${px(12)};color:#999;margin-top:${px(6)};">已完成 34/50 项</div>
</div>`,
}

/* ——— 星级评分 ——— */
const starRating = {
  id: 'app-cool-star',
  label: '评分',
  category: '炫酷',
  content: `<div style="${full}padding:${px(16)};background:#fff;">
  <div style="display:flex;align-items:center;gap:${px(8)};">
    <div style="font-size:${px(22)};letter-spacing:${px(4)};">
      <span style="color:#f5a623;">★</span><span style="color:#f5a623;">★</span><span style="color:#f5a623;">★</span><span style="color:#f5a623;">★</span><span style="color:#e0e0e0;">★</span>
    </div>
    <span style="font-size:${px(18)};font-weight:700;color:#f5a623;">4.2</span>
    <span style="font-size:${px(12)};color:#999;">(1,234 评价)</span>
  </div>
</div>`,
}

/* ——— 悬浮按钮 ——— */
const floatBtn = {
  id: 'app-cool-float',
  label: '悬浮按钮',
  category: '炫酷',
  content: `<div style="${full}position:relative;height:${px(1)};">
  <div style="position:fixed;bottom:${px(90)};right:${px(16)};width:${px(52)};height:${px(52)};border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(102,126,234,0.4);z-index:100;font-size:${px(22)};color:#fff;cursor:pointer;">↑</div>
</div>`,
}

/* ——— 波浪分割 ——— */
const waveDivider = {
  id: 'app-cool-wave',
  label: '波浪分割',
  category: '炫酷',
  content: `<div style="${full}height:${px(40)};background:linear-gradient(135deg,#667eea,#764ba2);position:relative;overflow:hidden;">
  <div style="position:absolute;bottom:0;left:0;width:200%;height:${px(20)};background:#fff;border-radius:50% 50% 0 0;transform:translateX(-25%);"></div>
</div>`,
}

/* ——— 双色价格 ——— */
const priceDisplay = {
  id: 'app-cool-price',
  label: '价格展示',
  category: '炫酷',
  content: `<div style="${full}padding:${px(16)};background:linear-gradient(135deg,#1a1a2e,#16213e);border-radius:${px(0)};">
  <div style="display:flex;align-items:baseline;gap:${px(4)};">
    <span style="font-size:${px(14)};color:rgba(255,255,255,0.7);">¥</span>
    <span style="font-size:${px(36)};font-weight:800;color:#fff;letter-spacing:-${px(1)};">99</span>
    <span style="font-size:${px(14)};color:rgba(255,255,255,0.7);">.00</span>
    <span style="font-size:${px(12)};color:rgba(255,255,255,0.4);text-decoration:line-through;margin-left:${px(8)};">¥199</span>
  </div>
  <div style="display:flex;gap:${px(8)};margin-top:${px(8)};">
    <span style="padding:${px(2)} ${px(8)};border-radius:${px(4)};background:rgba(245,87,108,0.3);color:#f5576c;font-size:${px(11)};font-weight:600;">限时5折</span>
    <span style="padding:${px(2)} ${px(8)};border-radius:${px(4)};background:rgba(102,126,234,0.3);color:#667eea;font-size:${px(11)};font-weight:600;">新人专享</span>
  </div>
</div>`,
}

/* ====================================================================
   导出
   ==================================================================== */

export default function getAppBlocks() {
  return [
    // 基础
    basicContainer,
    basicHeading,
    basicText,
    basicCaption,
    basicImage,
    basicButton,
    basicDivider,
    basicSpacer,
    layoutHorizontal,
    // 炫酷
    heroBanner,
    glassCard,
    waterfallCard,
    dataStats,
    stepsBar,
    tagGroup,
    notificationBadge,
    countdown,
    progressBar,
    starRating,
    floatBtn,
    waveDivider,
    priceDisplay,
  ]
}
