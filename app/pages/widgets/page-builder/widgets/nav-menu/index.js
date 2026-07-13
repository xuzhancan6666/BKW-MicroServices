/**
 * nav-menu 组件类型定义
 * 基于 BOCHK 官方网站导航菜单高度还原
 * 配色与结构来源：www.bochk.com Menu_mainMenu__3228b
 */

const px = (v) => v + 'px'

const NAV_MENU_STYLE = `
  .nav-menu {
    font-family: "Microsoft YaHei", "PingFang SC", Arial, sans-serif;
    position: relative;
    z-index: 1700;
    width: 100%;
  }
  .nav-menu-bar {
    background: #d9e5ed url(https://www.bochk.com/etc/designs/bochk_web/images/main/nav-bg.jpg) repeat-x 0 0;
    border-top: 1px solid #b9c3cd;
  }
  .nav-menu-inner {
    width: 100%;
    max-width: 1440px;
    padding: 0 30px;
    margin: auto;
  }
  .nav-menu-list {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  .nav-menu-item {
    display: inline-block;
    margin: 10px 0 6px;
    padding: 0 15px;
    border-left: 1px solid #99a4ab;
    list-style: none;
  }
  .nav-menu-item:first-child {
    border-left: none;
  }
  .nav-menu-item:hover > a {
    color: #ad182e;
  }
  .nav-menu-link {
    display: inline-block;
    color: #000;
    font-size: 13px;
    font-weight: 700;
    text-decoration: none;
    cursor: pointer;
  }
  /* ===== Submenu (full-width strip below the menu bar) ===== */
  .nav-submenu {
    display: none;
    position: absolute;
    background-color: #fff;
    top: 100%;
    left: 0;
    right: 0;
    margin: auto;
    z-index: 2000;
    width: 100%;
    max-width: 1440px;
    padding: 0 30px;
  }
  .nav-submenu-title {
    display: block;
    color: #ad182e;
    font-size: 13px;
    font-weight: 700;
    margin: 0 20px;
    padding: 20px 5px 10px;
    border-bottom: 2px solid #ad182e;
    text-decoration: none;
  }
  .nav-submenu-columns {
    margin: 10px 25px 20px;
    padding: 0;
    list-style: none;
  }
  .nav-submenu-col {
    display: inline-block;
    width: 25%;
    vertical-align: top;
  }
  .nav-submenu-col ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .nav-submenu-item {
    margin-top: 8px;
    list-style: none;
  }
  .nav-submenu-item > a {
    background: url(https://www.bochk.com/etc/designs/bochk_web/images/main/icon-nav-main-red.png) no-repeat 0;
    padding-left: 12px;
    color: #2fb0ad;
    font-size: 13px;
    text-decoration: none;
    display: inline-block;
  }
  .nav-submenu-item > ul {
    padding-left: 12px;
    margin-top: 8px;
    list-style: none;
  }
  .nav-submenu-item > ul > li {
    margin-top: 8px;
    list-style: none;
  }
  .nav-submenu-item > ul > li > a {
    background: url(https://www.bochk.com/etc/designs/bochk_web/images/main/icon-nav-main-green.png) no-repeat 0;
    padding-left: 12px;
    color: #7f7f7f;
    font-weight: 700;
    font-size: 13px;
    text-decoration: none;
    display: inline-block;
  }
`

const NAV_MENU_HTML = `
<div data-gjs-type="nav-menu" class="nav-menu">
  <div class="nav-menu-bar">
    <div class="nav-menu-inner">
      <ul class="nav-menu-list">
        <li class="nav-menu-item">
          <a href="/sc/pw.html" class="nav-menu-link" title="私人财富">私人财富</a>
        </li>
        <li class="nav-menu-item">
          <a href="/sc/wm.html" class="nav-menu-link" title="中银理财">中银理财</a>
        </li>
        <li class="nav-menu-item">
          <a href="#" class="nav-menu-link" title="智盈理财">智盈理财</a>
          <div class="nav-submenu">
            <a href="/sc/enrich.html" class="nav-submenu-title" title="智盈理财">智盈理财</a>
            <ul class="nav-submenu-columns">
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/enrich/offer.html" title="专享优惠">专享优惠</a>
                    <ul></ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/enrich/tailoredinfo.html" title="手机理财 一触起步">手机理财 一触起步</a>
                    <ul></ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/enrich/servicetype.html" title="照顾您的全面需要">照顾您的全面需要</a>
                    <ul></ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/enrich/econanalysis.html" title="市场资讯">市场资讯</a>
                    <ul>
                      <li><a href="/sc/enrich/econanalysis/investmktcomment.html" title="投资市场评论">投资市场评论</a></li>
                      <li><a href="/sc/enrich/econanalysis/bocecon.html" title="中银经济月刊">中银经济月刊</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-menu-item">
          <a href="#" class="nav-menu-link" title="自在理财">自在理财</a>
          <div class="nav-submenu">
            <a href="/sc/ifree.html" class="nav-submenu-title" title="自在理财">自在理财</a>
            <ul class="nav-submenu-columns">
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/promotion.html" title="最新推广">最新推广</a>
                    <ul></ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/parentsandchildren.html" title="家长子女">家长子女</a>
                    <ul></ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/smartelderly.html" title="精明长者">精明长者</a>
                    <ul></ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/student.html" title="大专学生">大专学生</a>
                    <ul></ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/elife.html" title="自在e生活">自在e生活</a>
                    <ul></ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/ifree/employee.html" title="上班一族">上班一族</a>
                    <ul></ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
        <li class="nav-menu-item">
          <a href="http://www.bochk.com/sc/privatebanking/" class="nav-menu-link" title="私人银行">私人银行</a>
        </li>
        <li class="nav-menu-item">
          <a href="#" class="nav-menu-link" title="企业银行">企业银行</a>
          <div class="nav-submenu">
            <a href="/sc/corporate.html" class="nav-submenu-title" title="企业银行">企业银行</a>
            <ul class="nav-submenu-columns">
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/ESG.html" title="绿色金融服务">绿色金融服务</a>
                    <ul>
                      <li><a href="/sc/corporate/ESG/greendeposit.html" title="绿色存款">绿色存款</a></li>
                      <li><a href="/sc/corporate/ESG/greenloan.html" title="绿色贷款">绿色贷款</a></li>
                      <li><a href="/sc/corporate/ESG/greenbond.html" title="ESG相关债券">ESG相关债券</a></li>
                    </ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/rmbservice.html" title="企业人民币服务">企业人民币服务</a>
                    <ul>
                      <li><a href="/sc/corporate/rmbservice/crossborderrmb.html" title="跨境人民币业务机遇">跨境人民币业务机遇</a></li>
                      <li><a href="/sc/corporate/rmbservice/diverrmbproducts.html" title="多元化人民币产品">多元化人民币产品</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/fininstitute.html" title="金融机构服务">金融机构服务</a>
                    <ul>
                      <li><a href="/sc/corporate/fininstitute/fibank.html" title="银行">银行</a></li>
                      <li><a href="/sc/corporate/fininstitute/nonbankfi.html" title="非银行及公共机构">非银行及公共机构</a></li>
                    </ul>
                  </li>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/ecomm.html" title="电子商贸服务">电子商贸服务</a>
                    <ul>
                      <li><a href="/sc/corporate/ecomm/cbsonline.html" title="中银企业网上银行">中银企业网上银行</a></li>
                      <li><a href="/sc/corporate/ecomm/bocnethk.html" title="中行网银(香港)">中行网银(香港)</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/tradefinance.html" title="贸易融资及服务">贸易融资及服务</a>
                    <ul>
                      <li><a href="/sc/corporate/tradefinance/overview.html" title="服务概览">服务概览</a></li>
                      <li><a href="/sc/corporate/tradefinance/import.html" title="进口服务">进口服务</a></li>
                      <li><a href="/sc/corporate/tradefinance/export.html" title="出口服务">出口服务</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
              <li class="nav-submenu-col">
                <ul>
                  <li class="nav-submenu-item">
                    <a href="/sc/corporate/account.html" title="账户服务">账户服务</a>
                    <ul>
                      <li><a href="/sc/corporate/account/openinfo.html" title="开户须知">开户须知</a></li>
                      <li><a href="/sc/corporate/account/bia.html" title="商业理财账户">商业理财账户</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</div>
`

export function getNavMenuBlocks() {
  return [
    {
      id: 'comp-nav-menu',
      label: '导航菜单',
      category: '组件',
      content: `<style>${NAV_MENU_STYLE}</style>${NAV_MENU_HTML}`,
      media: '<div style="padding:8px;text-align:center;font-size:12px;color:#666;">≡ 导航菜单</div>',
    },
  ]
}

export function registerNavMenuType(editor) {
  editor.DomComponents.addType('nav-menu', {
    model: {
      defaults: {
        name: '导航菜单',
        draggable: true,
        copyable: true,
        removable: true,
        droppable: false,
        style: { width: '100%' },
        // 导出 HTML 时携带交互脚本
        script: function() {
          var root = this;
          // 点击菜单项展开/收起子菜单
          root.addEventListener('click', function(e) {
            var li = e.target.closest('.nav-menu-item');
            if (!li) return;
            // 点击子菜单内部不触发
            if (e.target.closest('.nav-submenu')) return;
            var sub = li.querySelector('.nav-submenu');
            if (!sub) return;
            var isOpen = sub.style.display === 'block';
            // 收起同级所有子菜单
            root.querySelectorAll('.nav-submenu').forEach(function(s) {
              s.style.display = '';
            });
            sub.style.display = isOpen ? '' : 'block';
          });
          // 点击页面其他区域关闭所有子菜单
          document.addEventListener('click', function(e) {
            if (!root.contains(e.target)) {
              root.querySelectorAll('.nav-submenu').forEach(function(s) {
                s.style.display = '';
              });
            }
          });
        },
      },
    },
    view: {
      events: {
        'click .nav-menu-item': 'onItemClick',
      },
      onItemClick(e) {
        const li = e.currentTarget
        // 点击子菜单内部不触发 toggle
        if (e.target.closest('.nav-submenu')) return

        const sub = li.querySelector('.nav-submenu')
        if (!sub) return

        if (sub.style.display === 'block') {
          sub.style.display = ''
        } else {
          this.el.querySelectorAll('.nav-submenu').forEach(s => s.style.display = '')
          sub.style.display = 'block'
        }
      },
      init() {
        this._docHandler = (e) => {
          if (!this.el.contains(e.target)) {
            this.el.querySelectorAll('.nav-submenu').forEach(s => s.style.display = '')
          }
        }
        document.addEventListener('click', this._docHandler)
      },
      onRemove() {
        document.removeEventListener('click', this._docHandler)
      },
    },
  })
}
