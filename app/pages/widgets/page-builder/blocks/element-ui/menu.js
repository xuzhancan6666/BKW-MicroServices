/**
 * menu.js — 横向导航菜单（支持二级子菜单）
 * 交互参考 ElementUI el-menu 风格
 *
 * 组件层级：
 *   el-menu（根容器）
 *     └── el-menu-item（一级菜单，可包含子 el-menu-item）
 *
 * 交互：
 *   一级菜单点击 → 展开/收起子菜单（is-expanded）
 *   子菜单项点击 → 切换 active 高亮，收起父级下拉
 *   点击其他区域 → 收起所有展开的子菜单
 */

const px = (v) => v + 'px'

const C = {
  primary: '#409eff',
  primaryLight: '#ecf5ff',
  text: '#303133',
  borderLight: '#e4e7ed',
}

const menuStyle = `
.el-menu-root{display:flex;align-items:stretch;flex-wrap:wrap;width:100%;font-family:"Microsoft YaHei","PingFang SC",sans-serif;box-sizing:border-box;user-select:none;border-bottom:${px(2)} solid ${C.borderLight}}
.el-menu-root .el-menu-item{position:relative}
.el-menu-root .el-menu-item__content{display:inline-flex;align-items:center;gap:${px(4)};padding:${px(0)} ${px(20)};height:${px(56)};font-size:${px(14)};color:${C.text};cursor:pointer;transition:color .15s,border-bottom-color .15s;white-space:nowrap;border-bottom:${px(2)} solid transparent;margin-bottom:-${px(2)};box-sizing:border-box;text-decoration:none;pointer-events:none}
.el-menu-root .el-menu-item__content *{pointer-events:none}
.el-menu-root .el-menu-item:hover>.el-menu-item__content{color:${C.primary};border-bottom-color:${C.primaryLight}}
.el-menu-root .el-menu-item.is-active>.el-menu-item__content{color:${C.primary};border-bottom-color:${C.primary}}
.el-menu-root .el-menu-item__arrow{font-size:${px(10)};margin-left:${px(2)};color:#999;transition:transform .2s;display:none}
.el-menu-root .el-menu-item:has(>.el-menu-sub) .el-menu-item__arrow{display:inline-block}
.el-menu-root .el-menu-item.is-expanded>.el-menu-item__content .el-menu-item__arrow{transform:rotate(180deg)}

/* 子菜单 dropdown */
.el-menu-root .el-menu-item>.el-menu-sub{position:absolute;top:100%;left:0;min-width:${px(160)};background:#fff;box-shadow:0 ${px(2)} ${px(12)} rgba(0,0,0,0.1);display:none;z-index:100;flex-direction:column;padding:${px(4)} 0}
.el-menu-root .el-menu-item.is-expanded>.el-menu-sub{display:flex}
.el-menu-root .el-menu-sub .el-menu-item{position:static;width:100%}
.el-menu-root .el-menu-sub .el-menu-item__content{height:${px(36)};width:100%;border-bottom:none;margin-bottom:0;padding:${px(0)} ${px(16)};gap:0}
.el-menu-root .el-menu-sub .el-menu-item:hover>.el-menu-item__content{color:${C.primary};background:${C.primaryLight};border-bottom:none}
.el-menu-root .el-menu-sub .el-menu-item.is-active>.el-menu-item__content{color:${C.primary};background:${C.primaryLight};border-bottom:none}
`

export function getMenuBlocks() {
  return [
    {
      id: 'el-menu-horizontal',
      label: '横向菜单',
      category: '菜单组件',
      content: `<style>${menuStyle}</style>
<div data-gjs-type="el-menu" class="el-menu-root" data-gjs-copyable="false" style="background:#fff;padding:${px(0)} ${px(16)};">
  <div data-gjs-type="el-menu-item" class="el-menu-item is-active" data-url="" data-target="_blank">
    <span class="el-menu-item__content"><span>首页</span><span class="el-menu-item__arrow">▾</span></span>
  </div>
  <div data-gjs-type="el-menu-item" class="el-menu-item" data-url="" data-target="_blank">
    <span class="el-menu-item__content"><span>产品中心</span><span class="el-menu-item__arrow">▾</span></span>
  </div>
  <div data-gjs-type="el-menu-item" class="el-menu-item" data-url="" data-target="_blank">
    <span class="el-menu-item__content"><span>关于我们</span><span class="el-menu-item__arrow">▾</span></span>
  </div>
  <div data-gjs-type="el-menu-item" class="el-menu-item" data-url="" data-target="_blank">
    <span class="el-menu-item__content"><span>客服中心</span><span class="el-menu-item__arrow">▾</span></span>
  </div>
</div>`,
    },
  ]
}

export function registerMenuType(editor) {
  editor.addStyle(menuStyle)

  /* ===== el-menu-item 类型 ===== */
  editor.DomComponents.addType('el-menu-item', {
    isComponent(el) {
      if (el.nodeType === 1 && el.classList.contains('el-menu-item')) {
        return { type: 'el-menu-item' }
      }
    },
    model: {
      defaults: {
        draggable: false,
        traits: [
          { type: 'button', label: '子菜单', text: '+ 新增子菜单', command: 'addSubmenuItem' },
          { type: 'text', label: '菜单标题', name: 'menuTitle', changeProp: 1 },
          { type: 'text', label: '链接地址', name: 'data-url', placeholder: 'https:// 或 /path' },
          { type: 'select', label: '跳转方式', name: 'data-target', options: [
            { value: '_self', name: '当前窗口' },
            { value: '_blank', name: '新窗口' },
          ]},
        ],
      },
    },
  })

  /* ===== el-menu 根容器 ===== */
  editor.DomComponents.addType('el-menu', {
    isComponent(el) {
      if (el.nodeType === 1 && el.classList.contains('el-menu-root')) {
        return { type: 'el-menu' }
      }
    },
    model: {
      defaults: {
        copyable: false,
        traits: [
          { type: 'button', label: '菜单项', text: '+ 新增菜单', command: 'addMenuItem' },
        ],
        script: function() {
          // 编辑模式下不运行（canvas iframe 内）
          try { if (window.frameElement !== null) return } catch(e) {}

          var root = this;

          root.addEventListener('click', function(e) {
            var item = e.target.closest('.el-menu-item');
            if (!item) return;

            if (item.querySelector(':scope > .el-menu-sub')) {
              // 一级菜单：切换展开
              var expanded = item.classList.contains('is-expanded');
              root.querySelectorAll('.el-menu-item.is-expanded').forEach(function(el) {
                if (el !== item) el.classList.remove('is-expanded');
              });
              item.classList.toggle('is-expanded', !expanded);
            } else {
              // 子菜单项：设为 active，同时父级一级菜单也高亮
              root.querySelectorAll('.el-menu-item.is-active').forEach(function(el) {
                el.classList.remove('is-active');
              });
              item.classList.add('is-active');
              var parent = item.parentElement && item.parentElement.closest('.el-menu-item');
              if (parent) {
                parent.classList.add('is-active');
                parent.classList.remove('is-expanded');
              }
            }
          });

          // 点击外部收起所有子菜单
          document.addEventListener('click', function(e) {
            if (!e.target.closest('.el-menu-root')) {
              document.querySelectorAll('.el-menu-item.is-expanded').forEach(function(el) {
                el.classList.remove('is-expanded');
              });
            }
          });
        },
      },
    },
  })

  /* ===== 子菜单容器 ===== */
  editor.DomComponents.addType('el-menu-sub', {
    isComponent(el) {
      if (el.nodeType === 1 && el.classList.contains('el-menu-sub')) {
        return { type: 'el-menu-sub' }
      }
    },
    model: {
      defaults: {
        draggable: false,
        copyable: false,
      },
    },
  })

  /* ===== 新增子菜单命令 ===== */
  editor.Commands.add('addSubmenuItem', {
    run(editor) {
      const selected = editor.getSelected()
      if (!selected || selected.get('type') !== 'el-menu-item') return

      // 确定新增目标
      const parent = selected.parent()
      const isLevel1 = parent && parent.get('type') === 'el-menu'
      const target = isLevel1 ? selected : parent
      if (!target) return

      // 获取或创建 el-menu-sub 容器
      let sub = target.components().find(c => c.get('type') === 'el-menu-sub')
      if (!sub) {
        sub = target.components().add('<div data-gjs-type="el-menu-sub" class="el-menu-sub"></div>')
      }

      // 新增子菜单项（只有 链接地址 + 跳转方式，无"新增子菜单"按钮）
      const child = sub.components().add(
        '<div data-gjs-type="el-menu-item" class="el-menu-item" data-url="" data-target="_blank">' +
          '<span class="el-menu-item__content"><span>menu</span></span>' +
        '</div>'
      )
      if (child) {
        child.set('traits', [
          { type: 'text', label: '菜单标题', name: 'menuTitle', changeProp: 1 },
          { type: 'text', label: '链接地址', name: 'data-url', placeholder: 'https:// 或 /path' },
          { type: 'select', label: '跳转方式', name: 'data-target', options: [
            { value: '_self', name: '当前窗口' },
            { value: '_blank', name: '新窗口' },
          ]},
        ])
        child.set('menuTitle', 'menu')
      }

      // 自动展开父级
      const el = target.getEl()
      if (el) el.classList.add('is-expanded')

      // 更新父级 traits（有子菜单时禁用链接相关）
      updateTraitsBasedOnSubmenu(target)
    },
  })

  /* ===== 新增根菜单命令 ===== */
  editor.Commands.add('addMenuItem', {
    run(editor) {
      const selected = editor.getSelected()
      if (!selected || selected.get('type') !== 'el-menu') return

      // 创建一个新的一级菜单项（含完整 traits）
      const newItem = selected.components().add(
        '<div data-gjs-type="el-menu-item" class="el-menu-item" data-url="" data-target="_blank">' +
          '<span class="el-menu-item__content"><span>menu</span><span class="el-menu-item__arrow">▾</span></span>' +
        '</div>'
      )
      if (newItem) {
        newItem.set('traits', [
          { type: 'button', label: '子菜单', text: '+ 新增子菜单', command: 'addSubmenuItem' },
          { type: 'text', label: '菜单标题', name: 'menuTitle', changeProp: 1 },
          { type: 'text', label: '链接地址', name: 'data-url', placeholder: 'https:// 或 /path' },
          { type: 'select', label: '跳转方式', name: 'data-target', options: [
            { value: '_self', name: '当前窗口' },
            { value: '_blank', name: '新窗口' },
          ]},
        ])
        newItem.set('menuTitle', 'menu')
        // 选中新增的菜单项
        editor.select(newItem)
      }
    },
  })

  /* ===== 选中纠正 + 子菜单展开/收起 + active 切换 ===== */
  let _selectGuard = false
  editor.on('component:selected', (component) => {
    if (_selectGuard) return

    // 冒泡纠正：非 el-menu-item → 向上找到最近的 el-menu-item
    if (component.get('type') !== 'el-menu-item') {
      let p = component.parent()
      while (p) {
        if (p.get('type') === 'el-menu-item') {
          _selectGuard = true
          editor.select(p)
          _selectGuard = false
          return
        }
        p = p.parent()
      }
    }

    // 选中的不是 el-menu-item 也不是 el-menu-sub → 收起所有子菜单
    if (component.get('type') !== 'el-menu-item' && component.get('type') !== 'el-menu-sub') {
      closeExpandedMenus()
      return
    }

    if (component.get('type') === 'el-menu-item') {
      const el = component.getEl()
      if (!el) return
      const root = el.closest('.el-menu-root')
      if (!root) return

      // 判断是否有子菜单（el-menu-sub 容器）
      const hasChildren = component.components().some(c => c.get('type') === 'el-menu-sub')

      if (hasChildren) {
        // 一级菜单：切换 is-expanded，关闭同级其他展开项
        const wasExpanded = el.classList.contains('is-expanded')
        root.querySelectorAll('.el-menu-item.is-expanded').forEach((other) => {
          if (other !== el) other.classList.remove('is-expanded')
        })
        closeExpandedMenus(el)

        if (wasExpanded) {
          el.classList.remove('is-expanded')
        } else {
          el.classList.add('is-expanded')
        }
      } else {
        // 子菜单项或无子菜单的一级项：设为 active（编辑状态下不收起，方便编辑）
        root.querySelectorAll('.el-menu-item.is-active').forEach((other) => {
          other.classList.remove('is-active')
        })
        el.classList.add('is-active')
        // 子菜单项选中时，父级一级菜单也高亮
        if (el.closest('.el-menu-sub')) {
          const parentItem = el.parentElement?.closest('.el-menu-item')
          if (parentItem) parentItem.classList.add('is-active')
        }
      }
    }
  })

  /* ===== 菜单标题同步到 DOM ===== */
  editor.on('component:mount', (component) => {
    if (component.get('type') === 'el-menu-item') {
      if (!component.get('menuTitle')) {
        const el = component.getEl()
        const textSpan = el?.querySelector('.el-menu-item__content > span')
        if (textSpan) component.set('menuTitle', textSpan.textContent)
      }
      // 加载已有数据时同步 traits（例如从保存的项目恢复）
      updateTraitsBasedOnSubmenu(component)
    }
  })
  editor.on('component:update:menuTitle', (component) => {
    if (component.get('type') !== 'el-menu-item') return
    const el = component.getEl()
    const textSpan = el?.querySelector('.el-menu-item__content > span')
    if (textSpan) textSpan.textContent = component.get('menuTitle')
  })

  /* ===== 子菜单删除时恢复父级链接 traits ===== */
  editor.on('component:remove', (component) => {
    // 子菜单项被删除 → 检查 el-menu-sub 是否为空
    const parent = component.parent()
    if (parent && parent.get('type') === 'el-menu-sub') {
      const grandparent = parent.parent()
      if (grandparent && grandparent.get('type') === 'el-menu-item') {
        updateTraitsBasedOnSubmenu(grandparent)
      }
    }
    // el-menu-sub 容器本身被删除
    if (component.get('type') === 'el-menu-sub') {
      const p = component.parent()
      if (p && p.get('type') === 'el-menu-item') {
        updateTraitsBasedOnSubmenu(p)
      }
    }
  })

  /* ===== 根据是否有子菜单切换父级 traits ===== */
  function updateTraitsBasedOnSubmenu(item) {
    if (!item || item.get('type') !== 'el-menu-item') return

    const hasSubWithChildren = item.components().some(c => {
      return c.get('type') === 'el-menu-sub' && c.components().length > 0
    })

    const current = item.get('traits')
    if (!current || !Array.isArray(current)) return

    if (hasSubWithChildren) {
      // 有子菜单 → 移除 链接地址 和 跳转方式
      const filtered = current.filter(t => t.name !== 'data-url' && t.name !== 'data-target')
      item.set('traits', filtered)
    } else {
      // 无子菜单 → 补全 链接地址 和 跳转方式（如果缺少的话）
      const hasUrl = current.some(t => t.name === 'data-url')
      if (!hasUrl) {
        item.set('traits', [
          { type: 'button', label: '子菜单', text: '+ 新增子菜单', command: 'addSubmenuItem' },
          { type: 'text', label: '菜单标题', name: 'menuTitle', changeProp: 1 },
          { type: 'text', label: '链接地址', name: 'data-url', placeholder: 'https:// 或 /path' },
          { type: 'select', label: '跳转方式', name: 'data-target', options: [
            { value: '_self', name: '当前窗口' },
            { value: '_blank', name: '新窗口' },
          ]},
        ])
      }
    }
  }

  /* ===== 点击空白处收起所有子菜单 ===== */
  function closeExpandedMenus(exceptEl) {
    const doc = editor.Canvas.getDocument()
    if (!doc) return
    doc.querySelectorAll('.el-menu-item.is-expanded').forEach((el) => {
      if (exceptEl && el === exceptEl) return
      el.classList.remove('is-expanded')
    })
  }

  // canvas 就绪后绑定点击关闭
  const tryAttach = () => {
    const doc = editor.Canvas.getDocument()
    if (!doc) { setTimeout(tryAttach, 200); return }
    doc.addEventListener('click', (e) => {
      if (!e.target.closest?.('.el-menu-item')) {
        doc.querySelectorAll('.el-menu-item.is-expanded').forEach((el) => {
          el.classList.remove('is-expanded')
        })
      }
    })
  }
  tryAttach()
}
