export default [
  // ==================== 布局 ====================
  {
    id: 'layout-1col',
    label: '1列布局',
    category: '布局',
    componentName: 'CQLayout1Col',
    content: `<div style="max-width:1200px;margin:0 auto;padding:40px 20px;">
      <div style="min-height:100px;border:1px dashed #ddd;padding:20px;text-align:center;color:#999;">拖入组件</div>
    </div>`,
  },
  {
    id: 'layout-2col',
    label: '2列布局',
    category: '布局',
    componentName: 'CQLayout2Col',
    content: `<div style="display:flex;max-width:1200px;margin:0 auto;padding:40px 20px;gap:24px;">
      <div style="flex:1;min-height:100px;border:1px dashed #ddd;padding:20px;text-align:center;color:#999;">左列</div>
      <div style="flex:1;min-height:100px;border:1px dashed #ddd;padding:20px;text-align:center;color:#999;">右列</div>
    </div>`,
  },
  {
    id: 'layout-3col',
    label: '3列布局',
    category: '布局',
    componentName: 'CQLayout3Col',
    content: `<div style="display:flex;max-width:1200px;margin:0 auto;padding:40px 20px;gap:20px;">
      ${[1,2,3].map(i => `<div style="flex:1;min-height:100px;border:1px dashed #ddd;padding:20px;text-align:center;color:#999;">第${i}列</div>`).join('')}
    </div>`,
  },
  {
    id: 'layout-4col',
    label: '4列布局',
    category: '布局',
    componentName: 'CQLayout4Col',
    content: `<div style="display:flex;max-width:1200px;margin:0 auto;padding:40px 20px;gap:16px;">
      ${[1,2,3,4].map(i => `<div style="flex:1;min-height:80px;border:1px dashed #ddd;padding:12px;text-align:center;color:#999;">${i}</div>`).join('')}
    </div>`,
  },

  // ==================== Hero ====================
  {
    id: 'hero-banner',
    label: 'Hero 大横幅',
    category: 'Hero',
    componentName: 'CQHeroBanner',
    media: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
    content: `<div style="background:linear-gradient(135deg, #667eea 0%, #764ba2 100%);padding:100px 20px;text-align:center;color:#fff;">
      <h1 style="font-size:48px;margin:0 0 16px;font-weight:700;">大标题文案</h1>
      <p style="font-size:20px;margin:0 0 32px;opacity:0.9;">副标题描述，吸引用户继续阅读</p>
      <a style="display:inline-block;padding:14px 40px;background:#fff;color:#667eea;border-radius:30px;text-decoration:none;font-size:16px;font-weight:600;">了解详情</a>
    </div>`,
  },
  {
    id: 'hero-dark',
    label: 'Hero 暗黑',
    category: 'Hero',
    componentName: 'CQHeroDark',
    content: `<div style="background:linear-gradient(135deg, #0f0c29, #302b63, #24243e);padding:120px 20px;text-align:center;color:#fff;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;background:radial-gradient(circle,rgba(102,126,234,0.15) 0%,transparent 70%);"></div>
      <div style="position:relative;z-index:1;">
        <span style="display:inline-block;padding:4px 16px;border:1px solid rgba(255,255,255,0.2);border-radius:20px;font-size:12px;margin-bottom:20px;">🚀 全新上线</span>
        <h1 style="font-size:52px;margin:0 0 16px;font-weight:800;letter-spacing:-1px;">构建未来科技</h1>
        <p style="font-size:18px;margin:0 0 36px;opacity:0.7;max-width:600px;margin-left:auto;margin-right:auto;">用 AI 驱动的基础设施，让你的产品快速迭代</p>
        <div style="display:flex;gap:12px;justify-content:center;">
          <a style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">免费开始</a>
          <a style="display:inline-block;padding:14px 36px;border:1px solid rgba(255,255,255,0.3);color:#fff;border-radius:8px;text-decoration:none;">了解更多</a>
        </div>
      </div>
    </div>`,
  },
  {
    id: 'hero-split',
    label: 'Hero 左右分屏',
    category: 'Hero',
    componentName: 'CQHeroSplit',
    content: `<div style="display:flex;min-height:600px;">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:60px 40px;background:#fff;">
        <div style="max-width:480px;">
          <span style="display:inline-block;background:#e8f4fd;color:#409eff;padding:4px 12px;border-radius:4px;font-size:12px;margin-bottom:16px;">🔥 限时特惠</span>
          <h1 style="font-size:42px;margin:0 0 16px;color:#1a1a2e;line-height:1.2;">让创意<br>变为现实</h1>
          <p style="font-size:16px;color:#666;line-height:1.8;margin:0 0 32px;">无需设计经验，拖拽即可创建精美的落地页面。</p>
          <div style="display:flex;gap:12px;">
            <a style="display:inline-block;padding:12px 32px;background:#1a1a2e;color:#fff;border-radius:8px;text-decoration:none;">立即创建</a>
            <a style="display:inline-block;padding:12px 32px;border:1px solid #ddd;color:#333;border-radius:8px;text-decoration:none;">观看演示</a>
          </div>
          <p style="font-size:12px;color:#999;margin-top:20px;">已有 10,000+ 用户在使用</p>
        </div>
      </div>
      <div style="flex:1;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;padding:60px 40px;">
        <div style="text-align:center;color:#fff;">
          <div style="font-size:80px;margin-bottom:20px;">✦</div>
          <h2 style="font-size:28px;font-weight:600;">视觉冲击</h2>
          <p style="opacity:0.8;">以设计驱动增长</p>
        </div>
      </div>
    </div>`,
  },
  {
    id: 'hero-image',
    label: 'Hero 图片背景',
    category: 'Hero',
    componentName: 'CQHeroImage',
    content: `<div style="background:url('https://via.placeholder.com/1920x600/1a1a2e/ffffff?text=Banner') center/cover;padding:120px 20px;text-align:center;color:#fff;">
      <h1 style="font-size:42px;margin:0 0 12px;text-shadow:0 2px 4px rgba(0,0,0,0.3);">品牌主张</h1>
      <p style="font-size:18px;margin:0 0 28px;opacity:0.9;">用一句话打动你的客户</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <a style="display:inline-block;padding:12px 32px;background:#fff;color:#333;border-radius:6px;text-decoration:none;">立即体验</a>
        <a style="display:inline-block;padding:12px 32px;border:2px solid #fff;color:#fff;border-radius:6px;text-decoration:none;">了解更多</a>
      </div>
    </div>`,
  },

  // ==================== 导航栏 ====================
  {
    id: 'navbar',
    label: '导航栏',
    category: '导航',
    componentName: 'CQNavLight',
    content: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#fff;border-bottom:1px solid #eee;font-size:14px;">
      <div style="font-size:20px;font-weight:700;color:#333;">Logo</div>
      <div style="display:flex;gap:24px;">
        <a style="color:#333;text-decoration:none;" href="#">首页</a>
        <a style="color:#666;text-decoration:none;" href="#">产品</a>
        <a style="color:#666;text-decoration:none;" href="#">关于</a>
        <a style="color:#666;text-decoration:none;" href="#">联系</a>
      </div>
      <a style="padding:8px 24px;background:#409eff;color:#fff;border-radius:6px;text-decoration:none;">注册</a>
    </nav>`,
  },
  {
    id: 'navbar-dark',
    label: '导航栏 深色',
    category: '导航',
    componentName: 'CQNavDark',
    content: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:64px;background:#1a1a2e;border-bottom:1px solid rgba(255,255,255,0.1);font-size:14px;">
      <div style="font-size:20px;font-weight:700;color:#fff;">Logo</div>
      <div style="display:flex;gap:24px;">
        <a style="color:#fff;text-decoration:none;" href="#">首页</a>
        <a style="color:rgba(255,255,255,0.7);text-decoration:none;" href="#">产品</a>
        <a style="color:rgba(255,255,255,0.7);text-decoration:none;" href="#">关于</a>
        <a style="color:rgba(255,255,255,0.7);text-decoration:none;" href="#">联系</a>
      </div>
      <a style="padding:8px 24px;background:#667eea;color:#fff;border-radius:6px;text-decoration:none;">注册</a>
    </nav>`,
  },
  {
    id: 'navbar-glass',
    label: '导航栏 毛玻璃',
    category: '导航',
    componentName: 'CQNavGlass',
    content: `<nav style="display:flex;align-items:center;justify-content:space-between;padding:0 40px;height:72px;background:rgba(255,255,255,0.8);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.3);font-size:14px;">
      <div style="display:flex;align-items:center;gap:40px;">
        <span style="font-size:22px;font-weight:800;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">LOGO</span>
        <div style="display:flex;gap:24px;">
          <a style="color:#333;text-decoration:none;font-weight:500;">首页</a>
          <a style="color:#666;text-decoration:none;" href="#">产品</a>
          <a style="color:#666;text-decoration:none;" href="#">关于</a>
          <a style="color:#666;text-decoration:none;" href="#">联系</a>
        </div>
      </div>
      <a style="padding:10px 28px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:500;">开始使用</a>
    </nav>`,
  },

  {
    id: 'navbar-bank',
    label: '导航栏 银行风格',
    category: '导航',
    componentName: 'CQNavBank',
    content: `<header style="font-family:'Microsoft YaHei','PingFang SC',sans-serif;">
      <style>
        .nav-dropdown { position:relative; height:100%; display:flex; align-items:center; }
        .nav-dropdown:hover .nav-sub { display:block; }
        .nav-sub { display:none; position:absolute; top:100%; left:0; background:#fff; min-width:160px; box-shadow:0 4px 16px rgba(0,0,0,0.12); border-radius:0 0 6px 6px; padding:6px 0; z-index:100; white-space:nowrap; }
        .nav-sub a { display:block; padding:10px 20px; color:#333; text-decoration:none; font-size:13px; transition:background 0.2s; }
        .nav-sub a:hover { background:#f8f8f8; color:#b5152b; }
        .nav-sub a:first-child { border-top:2px solid #b5152b; }
      </style>
      <!-- 顶部工具条 -->
      <div style="background:#b5152b;color:#fff;font-size:12px;padding:0 40px;height:32px;display:flex;align-items:center;justify-content:space-between;">
        <div style="display:flex;gap:20px;">
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">个人客户</a>
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">私人客户</a>
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">商务客户</a>
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">企业客户</a>
        </div>
        <div style="display:flex;gap:16px;">
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">网上银行</a>
          <span style="color:rgba(255,255,255,0.4);">|</span>
          <a style="color:rgba(255,255,255,0.85);text-decoration:none;" href="#">EN</a>
        </div>
      </div>
      <!-- Logo + 搜索 -->
      <div style="background:#fff;padding:0 40px;height:64px;display:flex;align-items:center;justify-content:space-between;border-bottom:1px solid #eee;">
        <div style="display:flex;align-items:center;gap:16px;">
          <span style="font-size:24px;font-weight:800;color:#b5152b;letter-spacing:2px;">银行名称</span>
          <span style="font-size:13px;color:#999;border-left:1px solid #ddd;padding-left:16px;">理财服务</span>
        </div>
        <div style="display:flex;align-items:center;gap:12px;">
          <div style="display:flex;align-items:center;border:1px solid #ddd;border-radius:4px;overflow:hidden;">
            <select style="border:none;outline:none;padding:0 8px;height:32px;font-size:13px;background:#f8f8f8;color:#333;">
              <option>产品/服务</option>
              <option>存款</option>
              <option>投资</option>
              <option>保险</option>
            </select>
            <input type="text" placeholder="搜寻" style="border:none;outline:none;padding:0 12px;height:32px;font-size:13px;width:140px;" />
            <button style="border:none;background:#b5152b;color:#fff;padding:0 16px;height:32px;cursor:pointer;font-size:13px;">搜寻</button>
          </div>
          <a style="padding:6px 20px;border:1px solid #b5152b;color:#b5152b;border-radius:4px;text-decoration:none;font-size:13px;" href="#">登入</a>
        </div>
      </div>
      <!-- 主导航 -->
      <nav style="background:#fff;padding:0 40px;height:48px;display:flex;align-items:center;gap:0;box-shadow:0 2px 4px rgba(0,0,0,0.04);font-size:14px;">
        <a style="color:#b5152b;text-decoration:none;font-weight:600;height:100%;display:flex;align-items:center;padding:0 16px;" href="#">主页</a>
        <div class="nav-dropdown" style="padding:0 16px;">
          <a style="color:#333;text-decoration:none;display:flex;align-items:center;gap:4px;height:100%;" href="#">存款服务 <span style="font-size:10px;">▾</span></a>
          <div class="nav-sub">
            <a href="#">活期存款</a>
            <a href="#">定期存款</a>
            <a href="#">外币储蓄</a>
            <a href="#">人民币服务</a>
          </div>
        </div>
        <div class="nav-dropdown" style="padding:0 16px;">
          <a style="color:#333;text-decoration:none;display:flex;align-items:center;gap:4px;height:100%;" href="#">投资理财 <span style="font-size:10px;">▾</span></a>
          <div class="nav-sub">
            <a href="#">基金投资</a>
            <a href="#">债券投资</a>
            <a href="#">股票投资</a>
            <a href="#">结构性产品</a>
          </div>
        </div>
        <a style="color:#333;text-decoration:none;height:100%;display:flex;align-items:center;padding:0 16px;" href="#">信用卡</a>
        <div class="nav-dropdown" style="padding:0 16px;">
          <a style="color:#333;text-decoration:none;display:flex;align-items:center;gap:4px;height:100%;" href="#">按揭贷款 <span style="font-size:10px;">▾</span></a>
          <div class="nav-sub">
            <a href="#">安老按揭</a>
            <a href="#">居屋按揭</a>
            <a href="#">转按计划</a>
          </div>
        </div>
        <div class="nav-dropdown" style="padding:0 16px;">
          <a style="color:#333;text-decoration:none;display:flex;align-items:center;gap:4px;height:100%;" href="#">保险服务 <span style="font-size:10px;">▾</span></a>
          <div class="nav-sub">
            <a href="#">人寿保险</a>
            <a href="#">医疗保险</a>
            <a href="#">退休计划</a>
          </div>
        </div>
        <a style="color:#333;text-decoration:none;height:100%;display:flex;align-items:center;padding:0 16px;" href="#">关于我们</a>
      </nav>
    </header>`,
  },

  // ==================== 卡片 ====================
  {
    id: 'card-product',
    label: '商品卡片',
    category: '卡片',
    componentName: 'CQCardProduct',
    content: `<div style="border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);background:#fff;max-width:320px;margin:0 auto;">
      <div style="height:200px;background:url('https://via.placeholder.com/400x300/e8f4fd/333?text=商品图') center/cover;"></div>
      <div style="padding:20px;">
        <h3 style="font-size:18px;margin:0 0 8px;color:#333;">商品名称</h3>
        <p style="font-size:14px;color:#999;margin:0 0 12px;line-height:1.5;">商品描述，简要介绍产品特点和卖点</p>
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <span style="font-size:22px;font-weight:700;color:#f56c6c;">¥199</span>
          <span style="font-size:12px;color:#999;text-decoration:line-through;">¥299</span>
        </div>
      </div>
    </div>`,
  },
  {
    id: 'card-feature',
    label: '功能卡片',
    category: '卡片',
    componentName: 'CQCardFeature',
    content: `<div style="text-align:center;padding:32px 20px;border-radius:12px;background:#f8f9fa;max-width:280px;margin:0 auto;">
      <div style="width:56px;height:56px;background:#409eff;border-radius:12px;display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:28px;color:#fff;">★</div>
      <h3 style="font-size:18px;margin:0 0 8px;color:#333;">功能名称</h3>
      <p style="font-size:14px;color:#666;margin:0;line-height:1.6;">功能描述说明，用简短的文字概括核心价值</p>
    </div>`,
  },
  {
    id: 'card-gradient',
    label: '渐变卡片',
    category: '卡片',
    componentName: 'CQCardGradient',
    content: `<div style="border-radius:16px;padding:40px 28px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;max-width:340px;margin:0 auto;">
      <div style="width:48px;height:48px;background:rgba(255,255,255,0.2);border-radius:12px;display:flex;align-items:center;justify-content:center;font-size:24px;margin-bottom:20px;">⚡</div>
      <h3 style="font-size:20px;margin:0 0 8px;">人工智能驱动</h3>
      <p style="font-size:14px;opacity:0.85;line-height:1.6;margin:0 0 24px;">利用先进的 AI 算法，自动化处理复杂任务，提升效率。</p>
      <a style="display:inline-flex;align-items:center;gap:6px;color:#fff;text-decoration:none;font-weight:500;">了解更多 →</a>
    </div>`,
  },
  {
    id: 'card-hover',
    label: '悬浮动效卡片',
    category: '卡片',
    componentName: 'CQCardHover',
    content: `<div style="border-radius:16px;padding:32px 24px;background:#fff;border:1px solid #eee;max-width:320px;margin:0 auto;transition:all 0.3s;cursor:default;">
      <div style="width:52px;height:52px;background:linear-gradient(135deg,#f093fb,#f5576c);border-radius:14px;display:flex;align-items:center;justify-content:center;font-size:24px;color:#fff;margin-bottom:16px;">🎨</div>
      <h3 style="font-size:18px;margin:0 0 8px;color:#1a1a2e;">精美设计</h3>
      <p style="font-size:14px;color:#666;line-height:1.7;margin:0;">海量精美模板，无需设计经验即可快速创建专业级页面。</p>
    </div>`,
  },
  {
    id: 'card-user',
    label: '用户评价',
    category: '卡片',
    componentName: 'CQCardUser',
    content: `<div style="text-align:center;padding:32px 20px;max-width:360px;margin:0 auto;">
      <div style="width:64px;height:64px;border-radius:50%;background:url('https://via.placeholder.com/100/409eff/fff?text=U') center/cover;margin:0 auto 12px;"></div>
      <h4 style="font-size:16px;margin:0 0 4px;color:#333;">用户名称</h4>
      <p style="font-size:13px;color:#999;margin:0 0 12px;">职位 / 公司</p>
      <p style="font-size:14px;color:#666;line-height:1.6;font-style:italic;">"这是一段用户评价文字，真实反馈使用体验。"</p>
    </div>`,
  },

  // ==================== 图文混排 ====================
  {
    id: 'media-image-right',
    label: '左文右图',
    category: '图文',
    componentName: 'CQMediaRight',
    content: `<div style="display:flex;align-items:center;max-width:1200px;margin:0 auto;padding:60px 20px;gap:48px;">
      <div style="flex:1;">
        <h2 style="font-size:28px;margin:0 0 16px;color:#333;">标题文字</h2>
        <p style="font-size:15px;color:#666;line-height:1.8;margin:0 0 20px;">详细描述内容，介绍产品功能或服务优势，用文字打动用户。</p>
        <a style="display:inline-block;padding:10px 32px;background:#409eff;color:#fff;border-radius:6px;text-decoration:none;">了解更多</a>
      </div>
      <div style="flex:1;border-radius:8px;overflow:hidden;">
        <img src="https://via.placeholder.com/600x400/e8f4fd/333?text=图片" style="width:100%;display:block;">
      </div>
    </div>`,
  },
  {
    id: 'media-image-left',
    label: '左图右文',
    category: '图文',
    componentName: 'CQMediaLeft',
    content: `<div style="display:flex;align-items:center;max-width:1200px;margin:0 auto;padding:60px 20px;gap:48px;flex-direction:row-reverse;">
      <div style="flex:1;">
        <h2 style="font-size:28px;margin:0 0 16px;color:#333;">标题文字</h2>
        <p style="font-size:15px;color:#666;line-height:1.8;margin:0 0 20px;">详细描述内容，介绍产品功能或服务优势，用文字打动用户。</p>
        <a style="display:inline-block;padding:10px 32px;background:#409eff;color:#fff;border-radius:6px;text-decoration:none;">了解更多</a>
      </div>
      <div style="flex:1;border-radius:8px;overflow:hidden;">
        <img src="https://via.placeholder.com/600x400/e8f4fd/333?text=图片" style="width:100%;display:block;">
      </div>
    </div>`,
  },

  // ==================== 定价 ====================
  {
    id: 'pricing-simple',
    label: '定价表 简洁',
    category: '定价',
    componentName: 'CQPricingSimple',
    content: `<div style="max-width:340px;margin:0 auto;border-radius:16px;background:#fff;border:1px solid #eee;overflow:hidden;">
      <div style="padding:32px 24px;text-align:center;">
        <h3 style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;">专业版</h3>
        <div style="font-size:48px;font-weight:800;color:#1a1a2e;">¥199<span style="font-size:16px;color:#999;font-weight:400;">/月</span></div>
        <p style="font-size:14px;color:#666;margin:16px 0 24px;">适合成长型团队</p>
      </div>
      <div style="padding:0 24px 32px;">
        ${['无限项目', '10GB 存储', '团队协作', '优先支持'].map(f => `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;font-size:14px;color:#555;"><span style="color:#67c23a;">✓</span> ${f}</div>`).join('')}
        <a style="display:block;text-align:center;margin-top:24px;padding:12px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:8px;text-decoration:none;font-weight:500;">立即订阅</a>
      </div>
    </div>`,
  },
  {
    id: 'pricing-popular',
    label: '定价表 推荐',
    category: '定价',
    componentName: 'CQPricingPopular',
    content: `<div style="max-width:340px;margin:0 auto;border-radius:16px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;overflow:hidden;position:relative;">
      <div style="text-align:center;padding:8px 0;background:rgba(255,255,255,0.15);font-size:12px;letter-spacing:2px;">🎯 最受欢迎</div>
      <div style="padding:32px 24px;text-align:center;">
        <h3 style="font-size:14px;text-transform:uppercase;letter-spacing:2px;margin:0 0 16px;opacity:0.9;">企业版</h3>
        <div style="font-size:52px;font-weight:800;">¥499<span style="font-size:16px;font-weight:400;opacity:0.8;">/月</span></div>
        <p style="font-size:14px;margin:16px 0 24px;opacity:0.85;">适合大型企业</p>
      </div>
      <div style="padding:0 24px 32px;">
        ${['无限项目', '100GB 存储', '高级团队协作', '24/7 专属支持', '自定义域名'].map(f => `<div style="display:flex;align-items:center;gap:8px;padding:8px 0;font-size:14px;"><span style="color:rgba(255,255,255,0.8);">✓</span> ${f}</div>`).join('')}
        <a style="display:block;text-align:center;margin-top:24px;padding:12px;background:#fff;color:#667eea;border-radius:8px;text-decoration:none;font-weight:600;">立即订阅</a>
      </div>
    </div>`,
  },

  // ==================== 数据 ====================
  {
    id: 'stats-row',
    label: '数据统计行',
    category: '数据',
    componentName: 'CQStatsRow',
    content: `<div style="display:flex;justify-content:center;gap:48px;padding:60px 20px;background:#f8f9fa;">
      ${[
        {num:'10,000+', label:'活跃用户'},
        {num:'99.9%', label:'运行时间'},
        {num:'500+', label:'企业客户'},
        {num:'50M+', label:'处理请求'},
      ].map(s => `
        <div style="text-align:center;">
          <div style="font-size:40px;font-weight:800;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">${s.num}</div>
          <div style="font-size:14px;color:#666;margin-top:4px;">${s.label}</div>
        </div>
      `).join('')}
    </div>`,
  },

  // ==================== 特性区 ====================
  {
    id: 'features-grid',
    label: '特性网格',
    category: '特性',
    componentName: 'CQFeaturesGrid',
    content: `<div style="max-width:1200px;margin:0 auto;padding:60px 20px;">
      <div style="text-align:center;margin-bottom:48px;">
        <h2 style="font-size:32px;color:#1a1a2e;margin:0 0 12px;">核心功能</h2>
        <p style="font-size:16px;color:#666;margin:0;">强大而简洁的功能组合</p>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;">
        ${[
          {icon:'🚀', title:'快速启动', desc:'几分钟内完成部署'},
          {icon:'🔒', title:'安全可靠', desc:'企业级数据加密'},
          {icon:'⚡', title:'高性能', desc:'毫秒级响应速度'},
          {icon:'🎨', title:'灵活定制', desc:'丰富的主题配置'},
          {icon:'📊', title:'数据分析', desc:'实时数据可视化'},
          {icon:'🌐', title:'全球部署', desc:'多地域节点支持'},
        ].map(f => `
          <div style="padding:28px;border-radius:12px;background:#f8f9fa;">
            <div style="font-size:32px;margin-bottom:12px;">${f.icon}</div>
            <h4 style="font-size:16px;color:#1a1a2e;margin:0 0 6px;">${f.title}</h4>
            <p style="font-size:14px;color:#666;margin:0;">${f.desc}</p>
          </div>
        `).join('')}
      </div>
    </div>`,
  },

  // ==================== 团队 ====================
  {
    id: 'team-grid',
    label: '团队介绍',
    category: '团队',
    componentName: 'CQTeamGrid',
    content: `<div style="max-width:1200px;margin:0 auto;padding:60px 20px;">
      <div style="text-align:center;margin-bottom:48px;">
        <h2 style="font-size:32px;color:#1a1a2e;margin:0 0 12px;">我们的团队</h2>
        <p style="font-size:16px;color:#666;margin:0;">一群热爱技术的创造者</p>
      </div>
      <div style="display:flex;gap:24px;justify-content:center;">
        ${[
          {name:'张三', role:'CEO & 创始人', color:'#667eea'},
          {name:'李四', role:'技术总监', color:'#764ba2'},
          {name:'王五', role:'产品经理', color:'#f093fb'},
        ].map(m => `
          <div style="flex:1;max-width:280px;text-align:center;padding:32px 20px;border-radius:16px;background:#fff;border:1px solid #eee;">
            <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${m.color},${m.color}88);display:flex;align-items:center;justify-content:center;margin:0 auto 16px;font-size:32px;color:#fff;">${m.name[0]}</div>
            <h4 style="font-size:18px;margin:0 0 4px;color:#1a1a2e;">${m.name}</h4>
            <p style="font-size:14px;color:#999;margin:0;">${m.role}</p>
          </div>
        `).join('')}
      </div>
    </div>`,
  },

  // ==================== FAQ ====================
  {
    id: 'faq-section',
    label: 'FAQ 问答',
    category: 'FAQ',
    componentName: 'CQFaqSection',
    content: `<div style="max-width:800px;margin:0 auto;padding:60px 20px;">
      <div style="text-align:center;margin-bottom:40px;">
        <h2 style="font-size:32px;color:#1a1a2e;margin:0;">常见问题</h2>
      </div>
      ${[
        {q:'如何开始使用？', a:'注册账号后即可开始使用，无需任何配置。'},
        {q:'支持哪些支付方式？', a:'支持微信、支付宝、银行转账等多种支付方式。'},
        {q:'可以免费试用吗？', a:'提供 14 天免费试用，无需绑定信用卡。'},
        {q:'数据安全如何保障？', a:'采用银行级加密技术，确保数据安全。'},
      ].map((faq, i) => `
        <div style="padding:20px 0;${i < 3 ? 'border-bottom:1px solid #eee;' : ''}">
          <h4 style="font-size:16px;color:#1a1a2e;margin:0 0 8px;display:flex;align-items:center;gap:8px;"><span style="color:#667eea;">Q.</span> ${faq.q}</h4>
          <p style="font-size:14px;color:#666;margin:0 0 0 24px;line-height:1.6;"><span style="color:#999;">A.</span> ${faq.a}</p>
        </div>
      `).join('')}
    </div>`,
  },

  // ==================== logo 墙 ====================
  {
    id: 'logo-cloud',
    label: 'Logo 墙',
    category: 'Logo',
    componentName: 'CQLogoCloud',
    content: `<div style="max-width:1000px;margin:0 auto;padding:60px 20px;text-align:center;">
      <p style="font-size:14px;color:#999;text-transform:uppercase;letter-spacing:3px;margin:0 0 32px;">合作伙伴</p>
      <div style="display:flex;justify-content:center;gap:40px;flex-wrap:wrap;filter:grayscale(100%);opacity:0.4;">
        ${['Google','Microsoft','Amazon','Meta','Apple','Netflix'].map(name => `
          <div style="font-size:20px;font-weight:700;color:#333;padding:16px 24px;">${name}</div>
        `).join('')}
      </div>
    </div>`,
  },

  // ==================== 时间线 ====================
  {
    id: 'timeline',
    label: '时间线',
    category: '时间线',
    componentName: 'CQTimeline',
    content: `<div style="max-width:700px;margin:0 auto;padding:60px 20px;">
      <div style="text-align:center;margin-bottom:40px;">
        <h2 style="font-size:32px;color:#1a1a2e;margin:0;">发展历程</h2>
      </div>
      ${[
        {year:'2023', title:'公司成立', desc:'团队正式组建，获得天使轮融资'},
        {year:'2024', title:'产品上线', desc:'首个版本正式面世，获得首批客户'},
        {year:'2025', title:'快速增长', desc:'用户突破 10 万，完成 A 轮融资'},
        {year:'2026', title:'全球拓展', desc:'业务覆盖 20+ 国家和地区'},
      ].map(m => `
        <div style="display:flex;gap:24px;padding:20px 0;position:relative;">
          <div style="text-align:right;width:80px;flex-shrink:0;">
            <span style="font-size:14px;font-weight:700;color:#667eea;">${m.year}</span>
          </div>
          <div style="width:2px;background:linear-gradient(180deg,#667eea,transparent);flex-shrink:0;position:relative;">
            <div style="width:12px;height:12px;background:#667eea;border-radius:50%;position:absolute;top:4px;left:50%;transform:translateX(-50%);"></div>
          </div>
          <div style="flex:1;padding-bottom:20px;">
            <h4 style="font-size:16px;color:#1a1a2e;margin:0 0 4px;">${m.title}</h4>
            <p style="font-size:14px;color:#666;margin:0;line-height:1.5;">${m.desc}</p>
          </div>
        </div>
      `).join('')}
    </div>`,
  },

  // ==================== 页脚 ====================
  {
    id: 'footer-simple',
    label: '页脚 简洁',
    category: '页脚',
    componentName: 'CQFooterSimple',
    content: `<footer style="background:#f5f5f5;padding:40px 20px;text-align:center;font-size:14px;color:#999;">
      <div style="margin-bottom:12px;">
        <a style="color:#666;text-decoration:none;margin:0 12px;" href="#">关于我们</a>
        <a style="color:#666;text-decoration:none;margin:0 12px;" href="#">联系方式</a>
        <a style="color:#666;text-decoration:none;margin:0 12px;" href="#">隐私政策</a>
      </div>
      <p style="margin:0;">© 2025 公司名称. All rights reserved.</p>
    </footer>`,
  },
  {
    id: 'footer-columns',
    label: '页脚 多列',
    category: '页脚',
    componentName: 'CQFooterColumns',
    content: `<footer style="background:#1a1a2e;color:rgba(255,255,255,0.7);padding:60px 40px 30px;">
      <div style="display:flex;max-width:1200px;margin:0 auto;gap:40px;">
        <div style="flex:2;">
          <h4 style="color:#fff;margin:0 0 12px;">Logo</h4>
          <p style="font-size:14px;line-height:1.6;margin:0;">公司简介文字，介绍品牌理念和核心价值。</p>
        </div>
        ${[
          {title:'产品', items:['功能','价格','案例']},
          {title:'支持', items:['帮助中心','文档','联系我们']},
          {title:'法律', items:['隐私','条款']},
        ].map(col => `
          <div style="flex:1;">
            <h5 style="color:#fff;margin:0 0 12px;font-size:14px;">${col.title}</h5>
            ${col.items.map(item => `<p style="font-size:13px;margin:0 0 8px;">${item}</p>`).join('')}
          </div>
        `).join('')}
      </div>
      <div style="max-width:1200px;margin:40px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.1);text-align:center;font-size:13px;">
        © 2025 公司名称
      </div>
    </footer>`,
  },
  {
    id: 'footer-dark-glass',
    label: '页脚 深色毛玻璃',
    category: '页脚',
    componentName: 'CQFooterDarkGlass',
    content: `<footer style="background:#0f0c29;padding:60px 40px 30px;color:rgba(255,255,255,0.7);">
      <div style="max-width:1200px;margin:0 auto;display:flex;justify-content:space-between;gap:60px;flex-wrap:wrap;">
        <div style="flex:2;min-width:240px;">
          <span style="font-size:24px;font-weight:800;background:linear-gradient(135deg,#667eea,#764ba2);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">LOGO</span>
          <p style="font-size:14px;line-height:1.8;margin:12px 0 0;">用科技驱动创新，让产品更有价值。</p>
        </div>
        ${[
          {title:'产品', items:['功能','价格','更新日志']},
          {title:'资源', items:['文档','教程','API 参考']},
          {title:'公司', items:['关于','招聘','联系我们']},
        ].map(col => `
          <div style="flex:1;min-width:120px;">
            <h5 style="color:#fff;margin:0 0 16px;font-size:14px;">${col.title}</h5>
            ${col.items.map(item => `<p style="font-size:13px;margin:0 0 10px;cursor:default;">${item}</p>`).join('')}
          </div>
        `).join('')}
      </div>
      <div style="max-width:1200px;margin:40px auto 0;padding-top:20px;border-top:1px solid rgba(255,255,255,0.08);text-align:center;font-size:13px;">© 2025 All rights reserved.</div>
    </footer>`,
  },

  // ==================== 内容组件 ====================
  {
    id: 'text-block',
    label: '文本块',
    category: '内容',
    componentName: 'CQTextBlock',
    content: `<div style="max-width:800px;margin:0 auto;padding:40px 20px;">
      <h2 style="font-size:24px;color:#333;margin:0 0 12px;">标题</h2>
      <p style="font-size:15px;color:#666;line-height:1.8;margin:0;">段落文字内容。可自由编辑文字内容和样式。</p>
    </div>`,
  },
  {
    id: 'divider',
    label: '分割线',
    category: '内容',
    componentName: 'CQDivider',
    content: `<div style="max-width:1200px;margin:0 auto;padding:20px;">
      <hr style="border:none;border-top:1px solid #eee;margin:0;">
    </div>`,
  },
  {
    id: 'cta-banner',
    label: '行动号召',
    category: '内容',
    componentName: 'CQCTABanner',
    content: `<div style="background:#409eff;padding:60px 20px;text-align:center;color:#fff;">
      <h2 style="font-size:28px;margin:0 0 12px;font-weight:600;">立即开启体验</h2>
      <p style="font-size:16px;margin:0 0 28px;opacity:0.9;">注册即可免费使用所有功能</p>
      <a style="display:inline-block;padding:14px 48px;background:#fff;color:#409eff;border-radius:30px;text-decoration:none;font-size:16px;font-weight:600;">免费注册</a>
    </div>`,
  },
  {
    id: 'cta-gradient',
    label: '渐变号召',
    category: '内容',
    componentName: 'CQCTAGradient',
    content: `<div style="background:linear-gradient(135deg,#667eea,#764ba2,#f093fb);padding:80px 20px;text-align:center;color:#fff;">
      <h2 style="font-size:36px;margin:0 0 16px;font-weight:700;">准备好开始了吗？</h2>
      <p style="font-size:16px;margin:0 0 32px;opacity:0.9;">加入 10,000+ 用户，开启高效创作之旅</p>
      <div style="display:flex;gap:12px;justify-content:center;">
        <a style="display:inline-block;padding:14px 40px;background:#fff;color:#667eea;border-radius:8px;text-decoration:none;font-size:16px;font-weight:600;">免费试用</a>
        <a style="display:inline-block;padding:14px 40px;border:2px solid rgba(255,255,255,0.5);color:#fff;border-radius:8px;text-decoration:none;">联系销售</a>
      </div>
    </div>`,
  },
  {
    id: 'announcement',
    label: '公告栏',
    category: '内容',
    componentName: 'CQAnnouncement',
    content: `<div style="background:linear-gradient(90deg,#667eea,#764ba2);padding:12px 20px;text-align:center;font-size:14px;color:#fff;">
      🎉 新产品上线，限时 7 折优惠！
      <a style="color:#fff;font-weight:600;text-decoration:underline;margin-left:8px;">立即查看 →</a>
    </div>`,
  },
  {
    id: 'badge-group',
    label: '标签组',
    category: '内容',
    componentName: 'CQBadgeGroup',
    content: `<div style="display:flex;gap:8px;flex-wrap:wrap;padding:20px;justify-content:center;">
      ${['新品','热卖','推荐','限时优惠','包邮','独家'].map(t => `<span style="display:inline-block;padding:4px 12px;border-radius:4px;font-size:12px;background:#f0f9ff;color:#409eff;">${t}</span>`).join('')}
    </div>`,
  },

  // ==================== 炫酷 Hero ====================
  {
    id: 'hero-particles',
    label: 'Hero 粒子动效',
    category: 'Hero',
    componentName: 'CQHeroParticles',
    content: `<div style="background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);padding:120px 20px;text-align:center;color:#fff;position:relative;overflow:hidden;min-height:600px;display:flex;align-items:center;justify-content:center;">
      <style>
        @keyframes float1{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(30px,-30px) scale(1.1)}66%{transform:translate(-20px,20px) scale(0.9)}}
        @keyframes float2{0%,100%{transform:translate(0,0) scale(1)}33%{transform:translate(-30px,-20px) scale(1.2)}66%{transform:translate(20px,30px) scale(0.8)}}
        @keyframes float3{0%,100%{transform:translate(0,0) rotate(0deg)}50%{transform:translate(20px,-40px) rotate(180deg)}}
      </style>
      <div style="position:absolute;top:-50%;left:-50%;width:200%;height:200%;pointer-events:none;">
        <div style="position:absolute;top:20%;left:30%;width:300px;height:300px;background:radial-gradient(circle,rgba(102,126,234,0.25),transparent);border-radius:50%;animation:float1 8s ease-in-out infinite;"></div>
        <div style="position:absolute;top:50%;left:60%;width:250px;height:250px;background:radial-gradient(circle,rgba(118,75,162,0.25),transparent);border-radius:50%;animation:float2 10s ease-in-out infinite;"></div>
        <div style="position:absolute;top:10%;left:55%;width:180px;height:180px;background:radial-gradient(circle,rgba(240,147,251,0.15),transparent);border-radius:50%;animation:float3 12s linear infinite;"></div>
      </div>
      <div style="position:relative;z-index:1;max-width:800px;">
        <span style="display:inline-block;padding:6px 20px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.15);border-radius:20px;font-size:12px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);margin-bottom:24px;">✨ AI 驱动 · 全新发布</span>
        <h1 style="font-size:52px;margin:0 0 20px;font-weight:800;letter-spacing:-1px;line-height:1.15;">用智能重塑<br>数字体验</h1>
        <p style="font-size:18px;margin:0 auto 40px;opacity:0.65;max-width:560px;line-height:1.7;">新一代 AI 平台，帮助企业快速构建智能化产品与服务</p>
        <div style="display:flex;gap:16px;justify-content:center;flex-wrap:wrap;">
          <a style="display:inline-flex;align-items:center;gap:8px;padding:16px 40px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:12px;text-decoration:none;font-weight:600;font-size:16px;">免费开始 →</a>
          <a style="display:inline-flex;align-items:center;gap:8px;padding:16px 40px;border:1px solid rgba(255,255,255,0.25);color:#fff;border-radius:12px;text-decoration:none;font-size:16px;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);">演示 ▸</a>
        </div>
      </div>
    </div>`,
  },
  {
    id: 'hero-split-video',
    label: 'Hero 视频分屏',
    category: 'Hero',
    componentName: 'CQHeroSplitVideo',
    content: `<div style="display:flex;min-height:600px;background:#0f0c29;">
      <div style="flex:1;display:flex;align-items:center;justify-content:center;padding:60px 48px;">
        <div style="max-width:480px;">
          <span style="display:inline-block;padding:4px 14px;background:rgba(102,126,234,0.2);border-radius:4px;font-size:12px;color:#667eea;margin-bottom:16px;">📺 产品介绍</span>
          <h1 style="font-size:44px;color:#fff;margin:0 0 16px;line-height:1.15;font-weight:800;">视觉化讲述<br>品牌故事</h1>
          <p style="font-size:16px;color:rgba(255,255,255,0.55);line-height:1.8;margin:0 0 32px;">通过视频与画面结合的方式，让用户更直观地了解你的产品价值</p>
          <div style="display:flex;gap:12px;">
            <a style="display:inline-block;padding:14px 36px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border-radius:10px;text-decoration:none;font-weight:600;">开始创作</a>
            <a style="display:inline-flex;align-items:center;gap:8px;padding:14px 36px;border:1px solid rgba(255,255,255,0.2);color:rgba(255,255,255,0.8);border-radius:10px;text-decoration:none;">▶ 播放视频</a>
          </div>
        </div>
      </div>
      <div style="flex:1;background:linear-gradient(135deg,#302b63,#24243e);display:flex;align-items:center;justify-content:center;padding:60px 40px;position:relative;overflow:hidden;">
        <div style="position:absolute;inset:0;background:radial-gradient(circle at center,rgba(102,126,234,0.1),transparent 70%);"></div>
        <div style="position:relative;width:100%;max-width:420px;aspect-ratio:16/10;border-radius:16px;background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);display:flex;align-items:center;justify-content:center;backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);">
          <div style="text-align:center;color:rgba(255,255,255,0.3);">
            <div style="width:72px;height:72px;border-radius:50%;border:2px solid rgba(102,126,234,0.5);display:flex;align-items:center;justify-content:center;margin:0 auto 12px;font-size:28px;color:#667eea;">▶</div>
            <span style="font-size:12px;">产品演示视频</span>
          </div>
        </div>
      </div>
    </div>`,
  },

  // ==================== 炫酷内容 ====================
  {
    id: 'countdown-promo',
    label: '倒计时促销',
    category: '内容',
    componentName: 'CQCountdownPromo',
    content: `<div style="background:linear-gradient(135deg,#f093fb,#f5576c);padding:80px 20px;text-align:center;color:#fff;position:relative;overflow:hidden;">
      <div style="position:absolute;top:-30%;right:-20%;width:300px;height:300px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:absolute;bottom:-20%;left:-10%;width:200px;height:200px;background:rgba(255,255,255,0.05);border-radius:50%;"></div>
      <div style="position:relative;z-index:1;">
        <p style="font-size:12px;letter-spacing:4px;margin:0 0 16px;opacity:0.7;">⚡ 限时特惠</p>
        <h2 style="font-size:42px;margin:0 0 8px;font-weight:800;letter-spacing:-1px;">倒计时狂欢</h2>
        <p style="font-size:15px;margin:0 0 40px;opacity:0.85;">错过就要再等一年</p>
        <div style="display:flex;gap:16px;justify-content:center;">
          ${[['72','小时'],['48','分钟'],['36','秒']].map(t => `
            <div style="background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:16px;padding:20px 28px;min-width:96px;border:1px solid rgba(255,255,255,0.1);">
              <div style="font-size:48px;font-weight:800;line-height:1;">${t[0]}</div>
              <div style="font-size:11px;opacity:0.6;margin-top:6px;letter-spacing:2px;">${t[1]}</div>
            </div>
          `).join('')}
        </div>
        <a style="display:inline-block;margin-top:40px;padding:16px 52px;background:#fff;color:#f5576c;border-radius:50px;text-decoration:none;font-size:17px;font-weight:700;box-shadow:0 8px 32px rgba(245,87,108,0.3);">立即抢购</a>
      </div>
    </div>`,
  },
  {
    id: 'testimonial-wall',
    label: '评价墙',
    category: '内容',
    componentName: 'CQTestimonialWall',
    content: `<div style="padding:80px 20px;background:#fff;">
      <div style="max-width:1100px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
          <span style="display:inline-block;font-size:32px;margin-bottom:8px;">💬</span>
          <h2 style="font-size:34px;color:#1a1a2e;margin:0 0 8px;">客户心声</h2>
          <p style="font-size:15px;color:#666;margin:0;">来自全球用户的真实反馈</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:20px;">
          ${[
            {name:'陈小明', role:'CEO · 极光科技', text:'这个产品彻底改变了我们的工作方式，团队效率提升了 3 倍以上。', rating:5},
            {name:'李华', role:'产品总监 · 云帆互联', text:'界面简洁直观，上手非常快，强烈推荐给所有团队。', rating:5},
            {name:'王芳', role:'设计主管 · 自由职业', text:'一直在找这样的工具，终于找到了。功能强大且设计精美。', rating:4},
          ].map(t => `
            <div style="padding:32px 28px;border-radius:16px;border:1px solid #f0f0f0;transition:all 0.3s;">
              <div style="font-size:14px;color:#f59e0b;margin-bottom:12px;">${'★'.repeat(t.rating)}${'☆'.repeat(5-t.rating)}</div>
              <p style="font-size:15px;color:#555;line-height:1.8;margin:0 0 20px;font-style:italic;">"${t.text}"</p>
              <div style="display:flex;align-items:center;gap:12px;">
                <div style="width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,#667eea,#764ba2);display:flex;align-items:center;justify-content:center;color:#fff;font-size:15px;font-weight:600;">${t.name[0]}</div>
                <div>
                  <div style="font-size:14px;font-weight:600;color:#333;">${t.name}</div>
                  <div style="font-size:12px;color:#999;">${t.role}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },
  {
    id: 'steps-process',
    label: '流程步骤',
    category: '内容',
    componentName: 'CQStepsProcess',
    content: `<div style="padding:80px 20px;background:#f8f9fa;">
      <div style="max-width:1000px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:56px;">
          <h2 style="font-size:34px;color:#1a1a2e;margin:0 0 12px;">三步开始</h2>
          <p style="font-size:15px;color:#666;margin:0;">简单三步，快速上手</p>
        </div>
        <div style="display:flex;gap:48px;justify-content:center;position:relative;">
          <div style="position:absolute;top:40px;left:12%;right:12%;height:2px;background:linear-gradient(90deg,#667eea,#764ba2,#f093fb);"></div>
          ${[
            {num:'01', title:'注册账号', desc:'创建免费账号，无需信用卡', icon:'📝'},
            {num:'02', title:'创建项目', desc:'选择模板或从空白开始', icon:'🚀'},
            {num:'03', title:'发布上线', desc:'一键发布，快速上线', icon:'🌐'},
          ].map((s,i) => `
            <div style="flex:1;text-align:center;position:relative;">
              <div style="width:80px;height:80px;border-radius:50%;background:linear-gradient(135deg,${['#667eea','#764ba2','#f093fb'][i]},${['#764ba2','#f093fb','#f5576c'][i]});display:flex;align-items:center;justify-content:center;margin:0 auto 24px;font-size:32px;color:#fff;position:relative;z-index:1;box-shadow:0 4px 20px rgba(102,126,234,0.25);">
                ${s.icon}
              </div>
              <div style="font-size:11px;color:#667eea;font-weight:700;letter-spacing:2px;margin-bottom:6px;">${s.num}</div>
              <h4 style="font-size:18px;color:#1a1a2e;margin:0 0 6px;">${s.title}</h4>
              <p style="font-size:14px;color:#666;margin:0;line-height:1.6;padding:0 8px;">${s.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },
  {
    id: 'newsletter-section',
    label: '邮件订阅',
    category: '内容',
    componentName: 'CQNewsletter',
    content: `<div style="background:linear-gradient(135deg,#0f0c29,#302b63,#24243e);padding:80px 20px;text-align:center;color:#fff;">
      <div style="max-width:560px;margin:0 auto;">
        <div style="font-size:44px;margin-bottom:16px;">✉️</div>
        <h2 style="font-size:30px;margin:0 0 12px;font-weight:700;">订阅通讯</h2>
        <p style="font-size:15px;opacity:0.6;margin:0 0 32px;line-height:1.7;">获取最新产品动态和行业资讯，每周推送，随时退订</p>
        <div style="display:flex;gap:8px;max-width:460px;margin:0 auto;">
          <input type="email" placeholder="输入你的邮箱" style="flex:1;padding:14px 20px;border:none;outline:none;border-radius:10px;font-size:14px;background:rgba(255,255,255,0.08);color:#fff;backdrop-filter:blur(10px);-webkit-backdrop-filter:blur(10px);border:1px solid rgba(255,255,255,0.1);" value="">
          <button style="padding:14px 28px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:10px;font-size:14px;font-weight:600;cursor:pointer;white-space:nowrap;">订阅</button>
        </div>
        <p style="font-size:11px;opacity:0.35;margin-top:14px;">尊重隐私，绝不发送垃圾邮件</p>
      </div>
    </div>`,
  },
  {
    id: 'bento-features',
    label: 'Bento 特性',
    category: '特性',
    componentName: 'CQBentoFeatures',
    content: `<div style="padding:80px 20px;background:#fff;">
      <div style="max-width:1100px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 style="font-size:34px;color:#1a1a2e;margin:0 0 8px;">强大功能</h2>
          <p style="font-size:15px;color:#666;margin:0;">一切所需，尽在掌握</p>
        </div>
        <div style="display:grid;grid-template-columns:2fr 1fr 1fr;gap:16px;">
          <div style="grid-row:span 2;border-radius:20px;padding:40px 36px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;display:flex;flex-direction:column;justify-content:center;">
            <div style="font-size:42px;margin-bottom:16px;">🤖</div>
            <h3 style="font-size:22px;margin:0 0 10px;">AI 智能驱动</h3>
            <p style="font-size:14px;opacity:0.8;line-height:1.7;margin:0;">利用人工智能技术，自动优化工作流程，提升团队协作效率。</p>
          </div>
          ${[
            {icon:'⚡', title:'毫秒响应', desc:'极速体验', color:'#fffbe6'},
            {icon:'🔒', title:'安全加密', desc:'银行级安全', color:'#f0fff0'},
            {icon:'📊', title:'数据分析', desc:'实时洞察', color:'#e6f7ff'},
            {icon:'☁️', title:'云同步', desc:'随时随地', color:'#f9f0ff'},
          ].map(b => `
            <div style="border-radius:20px;padding:28px 24px;background:${b.color};text-align:center;transition:all 0.3s;">
              <div style="font-size:34px;margin-bottom:10px;">${b.icon}</div>
              <h4 style="font-size:15px;color:#1a1a2e;margin:0 0 4px;">${b.title}</h4>
              <p style="font-size:13px;color:#888;margin:0;">${b.desc}</p>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },
  {
    id: 'comparison-table',
    label: '功能对比表',
    category: '内容',
    componentName: 'CQComparisonTable',
    content: `<div style="padding:80px 20px;background:#f8f9fa;">
      <div style="max-width:900px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:40px;">
          <h2 style="font-size:32px;color:#1a1a2e;margin:0 0 8px;">功能对比</h2>
          <p style="font-size:14px;color:#666;margin:0;">一目了然的选择</p>
        </div>
        <table style="width:100%;border-collapse:separate;border-spacing:0;overflow:hidden;border-radius:16px;background:#fff;box-shadow:0 4px 24px rgba(0,0,0,0.06);font-size:14px;">
          <tr style="background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;">
            <th style="padding:16px 20px;text-align:left;font-weight:500;">功能</th>
            <th style="padding:16px 20px;text-align:center;font-weight:500;">基础版</th>
            <th style="padding:16px 20px;text-align:center;font-weight:500;">专业版</th>
            <th style="padding:16px 20px;text-align:center;font-weight:500;">企业版</th>
          </tr>
          ${[
            ['项目数量', '5 个', '50 个', '无限'],
            ['存储空间', '5GB', '50GB', '500GB'],
            ['API 访问', '✗', '✓', '✓'],
            ['自定义域名', '✗', '✓', '✓'],
            ['高级分析', '✗', '✗', '✓'],
            ['专属客服', '✗', '✗', '✓'],
          ].map((row,i) => `
            <tr style="${i<5?'border-bottom:1px solid #f0f0f0;':''}${i%2===0?'background:#fafafa;':''}">
              <td style="padding:14px 20px;color:#333;font-weight:500;">${row[0]}</td>
              <td style="padding:14px 20px;text-align:center;color:#666;">${row[1]}</td>
              <td style="padding:14px 20px;text-align:center;color:#666;">${row[2]}</td>
              <td style="padding:14px 20px;text-align:center;color:#667eea;${i===0?'font-weight:600;':''}">${row[3]}</td>
            </tr>
          `).join('')}
        </table>
      </div>
    </div>`,
  },
  {
    id: 'contact-gradient',
    label: '联系表单',
    category: '内容',
    componentName: 'CQContactForm',
    content: `<div style="padding:80px 20px;background:#f8f9fa;">
      <div style="display:flex;max-width:960px;margin:0 auto;border-radius:24px;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.06);">
        <div style="flex:1;background:linear-gradient(135deg,#667eea,#764ba2);padding:48px 36px;color:#fff;display:flex;flex-direction:column;justify-content:center;">
          <h2 style="font-size:26px;margin:0 0 12px;font-weight:700;">联系我们</h2>
          <p style="font-size:14px;opacity:0.8;line-height:1.7;margin:0 0 28px;">有任何问题或建议？我们很乐意倾听你的声音。</p>
          <div style="display:flex;flex-direction:column;gap:14px;font-size:14px;">
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">📧</span> hello@example.com</div>
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">📞</span> 400-888-8888</div>
            <div style="display:flex;align-items:center;gap:10px;"><span style="font-size:18px;">📍</span> 北京市朝阳区科技园</div>
          </div>
        </div>
        <div style="flex:1;padding:48px 36px;background:#fff;">
          <div style="display:flex;flex-direction:column;gap:14px;">
            <input placeholder="你的姓名" style="width:100%;padding:12px 16px;border:1px solid #eee;border-radius:10px;font-size:14px;outline:none;box-sizing:border-box;" value="">
            <input placeholder="邮箱地址" style="width:100%;padding:12px 16px;border:1px solid #eee;border-radius:10px;font-size:14px;outline:none;box-sizing:border-box;" value="">
            <textarea placeholder="留言内容" rows="4" style="width:100%;padding:12px 16px;border:1px solid #eee;border-radius:10px;font-size:14px;outline:none;resize:none;font-family:inherit;box-sizing:border-box;"></textarea>
            <button style="padding:13px;background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;border:none;border-radius:10px;font-size:15px;font-weight:600;cursor:pointer;">发送消息</button>
          </div>
        </div>
      </div>
    </div>`,
  },
  {
    id: 'gallery-dark',
    label: '暗色画廊',
    category: '内容',
    componentName: 'CQGalleryDark',
    content: `<div style="padding:80px 20px;background:#0f0c29;">
      <div style="max-width:1100px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:40px;">
          <h2 style="font-size:30px;color:#fff;margin:0 0 8px;">精选案例</h2>
          <p style="font-size:14px;color:rgba(255,255,255,0.35);margin:0;">用作品说话</p>
        </div>
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:12px;">
          ${[
            {c1:'#667eea',c2:'#764ba2',label:'品牌设计'},
            {c1:'#f093fb',c2:'#f5576c',label:'UI/UX'},
            {c1:'#4facfe',c2:'#00f2fe',label:'开发'},
            {c1:'#43e97b',c2:'#38f9d7',label:'移动端'},
            {c1:'#fa709a',c2:'#fee140',label:'插画'},
            {c1:'#a18cd1',c2:'#fbc2eb',label:'视觉'},
          ].map(g => `
            <div style="position:relative;border-radius:12px;overflow:hidden;aspect-ratio:4/3;background:linear-gradient(135deg,${g.c1},${g.c2});display:flex;align-items:center;justify-content:center;cursor:pointer;transition:transform 0.3s;">
              <div style="font-size:36px;color:rgba(255,255,255,0.15);">✦</div>
              <div style="position:absolute;bottom:0;left:0;right:0;padding:16px 20px;background:linear-gradient(transparent,rgba(0,0,0,0.5));">
                <p style="color:#fff;font-size:12px;margin:0;opacity:0.8;">${g.label}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },

  // ==================== 炫酷定价 ====================
  {
    id: 'pricing-compare',
    label: '定价表 三栏',
    category: '定价',
    componentName: 'CQPricingCompare',
    content: `<div style="padding:80px 20px;background:linear-gradient(135deg,#f8f9fa,#fff);">
      <div style="max-width:1100px;margin:0 auto;">
        <div style="text-align:center;margin-bottom:48px;">
          <h2 style="font-size:34px;color:#1a1a2e;margin:0 0 8px;">灵活定价</h2>
          <p style="font-size:15px;color:#666;margin:0;">按需选择，随时升级</p>
        </div>
        <div style="display:flex;gap:20px;justify-content:center;">
          ${[
            {name:'入门版', price:'99', color:'#666', features:['1 个项目','5GB 存储','基础支持','单用户'], popular:false},
            {name:'专业版', price:'299', color:'#667eea', features:['10 个项目','50GB 存储','优先支持','5 用户','高级分析'], popular:true},
            {name:'企业版', price:'999', color:'#764ba2', features:['无限项目','500GB 存储','24/7 专属支持','无限用户','定制开发','SLA 保障'], popular:false},
          ].map((p,i) => `
            <div style="flex:1;max-width:320px;border-radius:20px;background:#fff;${p.popular?'border:2px solid #667eea;box-shadow:0 12px 40px rgba(102,126,234,0.2);':'border:1px solid #eee;'}overflow:hidden;position:relative;transform:${p.popular?'scale(1.03)':'scale(1)'};">
              ${p.popular ? '<div style="background:linear-gradient(135deg,#667eea,#764ba2);text-align:center;padding:5px 0;font-size:11px;color:#fff;letter-spacing:2px;font-weight:500;">🔥 最受欢迎</div>' : ''}
              <div style="padding:32px 24px 20px;text-align:center;">
                <h3 style="font-size:13px;color:#999;letter-spacing:2px;margin:0 0 16px;">${p.name}</h3>
                <div style="font-size:42px;font-weight:800;color:#1a1a2e;">¥${p.price}<span style="font-size:13px;color:#999;font-weight:400;">/月</span></div>
              </div>
              <div style="padding:0 24px 32px;">
                ${p.features.map(f => `<div style="display:flex;align-items:center;gap:8px;padding:7px 0;font-size:13px;color:#555;"><span style="color:#67c23a;font-weight:bold;">✓</span> ${f}</div>`).join('')}
                <a style="display:block;text-align:center;margin-top:24px;padding:12px;border-radius:10px;text-decoration:none;font-weight:600;font-size:14px;${p.popular?'background:linear-gradient(135deg,#667eea,#764ba2);color:#fff;':'background:#f5f5f5;color:#333;'}">选择${p.name}</a>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },

  // ==================== 炫酷卡片 ====================
  {
    id: 'card-flip-3d',
    label: '3D 翻转卡片',
    category: '卡片',
    componentName: 'CQCardFlip3D',
    content: `<div style="padding:60px 20px;background:#f8f9fa;display:flex;justify-content:center;gap:32px;flex-wrap:wrap;">
      <style>
        .flip-card { perspective:1000px; }
        .flip-card .inner { transition:transform 0.7s cubic-bezier(0.4,0,0.2,1); transform-style:preserve-3d; }
        .flip-card:hover .inner { transform:rotateY(180deg); }
        .flip-card .front, .flip-card .back { backface-visibility:hidden; -webkit-backface-visibility:hidden; position:absolute;inset:0;border-radius:20px; }
        .flip-card .back { transform:rotateY(180deg); }
      </style>
      ${[
        {front:{bg:'#667eea,#764ba2',icon:'🚀',title:'鼠标悬停'}, back:{bg:'#764ba2,#f093fb',icon:'✨',title:'惊喜！',text:'3D 翻转效果'}},
      ].map(c => `
        <div class="flip-card" style="width:280px;height:360px;cursor:pointer;">
          <div class="inner" style="position:relative;width:100%;height:100%;">
            <div class="front" style="background:linear-gradient(135deg,${c.front.bg});display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;padding:32px;text-align:center;">
              <div style="font-size:56px;margin-bottom:16px;">${c.front.icon}</div>
              <h3 style="font-size:20px;margin:0;font-weight:600;">${c.front.title}</h3>
              <p style="font-size:13px;opacity:0.7;margin-top:8px;">看看背面是什么</p>
            </div>
            <div class="back" style="background:linear-gradient(135deg,${c.back.bg});display:flex;flex-direction:column;align-items:center;justify-content:center;color:#fff;padding:32px;text-align:center;">
              <div style="font-size:48px;margin-bottom:16px;">${c.back.icon}</div>
              <h3 style="font-size:20px;margin:0 0 8px;font-weight:600;">${c.back.title}</h3>
              <p style="font-size:14px;opacity:0.8;margin:0;">${c.back.text}</p>
            </div>
          </div>
        </div>
      `).join('')}
    </div>`,
  },

  // ==================== 炫酷 Logo ====================
  // ==================== 媒体 ====================
  {
    id: 'media-image',
    label: '图片',
    category: '媒体',
    componentName: 'CQImage',
    media: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>`,
    content: {
      type: 'image',
      src: 'https://via.placeholder.com/800x400',
      alt: '图片描述',
      style: { width: '100%', display: 'block' },
      traits: [
        { type: 'text', name: 'src', label: '图片 URL' },
        { type: 'text', name: 'alt', label: '描述' },
      ],
    },
  },
  {
    id: 'media-pdf',
    label: 'PDF 预览',
    category: '媒体',
    componentName: 'CQPDF',
    media: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M20 2H8c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-8.5 7.5c0 .83-.67 1.5-1.5 1.5H9v2H7.5V7H10c.83 0 1.5.67 1.5 1.5v1zm5 2c0 .83-.67 1.5-1.5 1.5h-2.5V7H15c.83 0 1.5.67 1.5 1.5v3zm4-3H19v1h1.5V11H19v2h-1.5V7h3v1.5zM9 9.5h1v-1H9v1zM4 6H2v14c0 1.1.9 2 2 2h14v-2H4V6zm10 5.5h1v-3h-1v3z"/></svg>`,
    content: `<iframe src="https://example.com/sample.pdf" style="width:100%;height:600px;border:1px solid #ddd;border-radius:8px;"></iframe>`,
  },
  {
    id: 'media-video',
    label: '视频',
    category: '媒体',
    componentName: 'CQVideo',
    media: `<svg viewBox="0 0 24 24" width="24" height="24"><path fill="currentColor" d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"/></svg>`,
    content: `<video controls style="width:100%;border-radius:8px;display:block;">
      <source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4">
      您的浏览器不支持视频播放
    </video>`,
  },

  {
    id: 'marquee-clients',
    label: '跑马灯客户',
    category: 'Logo',
    componentName: 'CQMarqueeClients',
    content: `<div style="padding:60px 0;background:#fff;overflow:hidden;">
      <style>
        @keyframes marquee{0%{transform:translateX(0)}100%{transform:translateX(-50%)}}
        .marq-track:hover{animation-play-state:paused}
      </style>
      <p style="text-align:center;font-size:12px;color:#bbb;letter-spacing:3px;margin:0 0 32px;">TRUSTED BY INDUSTRY LEADERS</p>
      <div style="overflow:hidden;">
        <div class="marq-track" sty le="display:flex;gap:64px;animation:marquee 24s linear infinite;width:fit-content;padding:0 20px;">
          ${['Google','Microsoft','Amazon','Meta','Apple','Netflix','Spotify','Twitter'].concat(['Google','Microsoft','Amazon','Meta','Apple','Netflix','Spotify','Twitter']).map(n => `
            <div style="font-size:20px;font-weight:700;color:#d0d0d0;white-space:nowrap;padding:12px 0;transition:color 0.3s;">${n}</div>
          `).join('')}
        </div>
      </div>
    </div>`,
  },
]
