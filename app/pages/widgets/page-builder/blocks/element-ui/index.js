/**
 * element-ui/index.js — ElementUI 高还原组件 block 集合
 *
 * 包含：
 *   getElementBlocks()  — 返回所有 block 定义
 *   registerElementBlockTypes(editor) — 注册交互行为（点击切换、树展开等）
 */

import { getStepsBlocks } from './steps.js'
import { getTimelineBlocks } from './timeline.js'
import { getTreeBlocks } from './tree.js'
import { getTableBlocks } from './table.js'
import { getStatisticBlocks } from './statistic.js'
import { getCardBlocks } from './card.js'
import { getTagBlocks } from './tag.js'
import { getLinkBlocks } from './link.js'
import { getCarouselBlocks } from './carousel.js'
import { getMenuBlocks, registerMenuType } from './menu.js'
import { getTestBlocks, registerTestType } from './test-traits.js'

export function getElementBlocks() {
  return [
    ...getStepsBlocks(),
    ...getTimelineBlocks(),
    ...getTreeBlocks(),
    ...getTableBlocks(),
    ...getStatisticBlocks(),
    ...getCardBlocks(),
    ...getTagBlocks(),
    ...getLinkBlocks(),
    ...getCarouselBlocks(),
    ...getMenuBlocks(),
    ...getTestBlocks(),
  ]
}

/**
 * 注册 ElementUI 组件的交互类型
 * 使 GrapesJS 编辑器内支持点击交互，并导出 script 到 HTML
 */
export function registerElementBlockTypes(editor) {

  // ===== 树控件 =====
  editor.DomComponents.addType('el-tree', {
    model: {
      defaults: {
        script: function() {
          var root = this;
          root.addEventListener('click', function(e) {
            var node = e.target.closest('.el-tree-node');
            if (!node) return;
            var container = node.parentElement;
            var children = container && container.querySelector(':scope > .el-tree-children');
            if (!children) return;
            var hidden = children.style.display === 'none';
            children.style.display = hidden ? '' : 'none';
            var indicator = node.querySelector('.el-tree-indicator');
            if (indicator) indicator.textContent = hidden ? '▾' : '▸';
          });
        },
      },
    },
    view: {
      events: {
        'click .el-tree-node': 'onTreeNodeClick',
      },
      onTreeNodeClick(e) {
        e.stopPropagation()
        const node = e.currentTarget
        const container = node.parentElement
        const children = container?.querySelector(':scope > .el-tree-children')
        if (!children) return
        const isHidden = children.style.display === 'none'
        children.style.display = isHidden ? '' : 'none'
        const indicator = node.querySelector('.el-tree-indicator')
        if (indicator) indicator.textContent = isHidden ? '▾' : '▸'
      },
    },
  })

  // ===== 走马灯 =====
  editor.DomComponents.addType('el-carousel', {
    model: {
      defaults: {
        script: function() {
          var root = this;
          var timer;
          function goTo(idx) {
            var container = root.querySelector('.el-carousel-container');
            var dots = root.querySelectorAll('.el-carousel-dot');
            if (container) container.style.transform = 'translateX(-' + (idx * 100) + '%)';
            dots.forEach(function(d, i) {
              d.style.width = (i === idx ? 40 : 14) + 'px';
              d.className = 'el-carousel-dot' + (i === idx ? ' is-active' : '');
            });
          }
          function tick() {
            var dots = root.querySelectorAll('.el-carousel-dot');
            var activeIdx = Array.from(dots).findIndex(function(d) {
              return d.classList.contains('is-active');
            });
            var total = dots.length;
            if (total === 0) return;
            var nextIdx = activeIdx === -1 ? 0 : (activeIdx + 1) % total;
            goTo(nextIdx);
          }
          function startAutoPlay() {
            clearInterval(timer);
            timer = setInterval(tick, 3000);
          }
          var isEditing = (function() {
            try { return window.frameElement !== null; } catch(e) { return false; }
          })();
          root.addEventListener('click', function(e) {
            var dot = e.target.closest('.el-carousel-dot');
            if (dot) {
              var dots = Array.from(root.querySelectorAll('.el-carousel-dot'));
              var idx = dots.indexOf(dot);
              if (idx !== -1) goTo(idx);
              if (!isEditing) startAutoPlay();
            }
          });
          if (!isEditing) {
            var firstDot = root.querySelector('.el-carousel-dot');
            if (firstDot) {
              firstDot.classList.add('is-active');
              firstDot.style.width = '40px';
            }
            startAutoPlay();
          }
        },
        traits: [
          { type: 'button', label: '幻灯片', text: '+ 添加幻灯片', command: 'addCarouselSlide' },
        ],
      },
    },
    view: {
      events: {
        'click .el-carousel-dot': 'onDotClick',
      },
      _switchTo(idx) {
        const container = this.el.querySelector('.el-carousel-container')
        const dots = this.el.querySelectorAll('.el-carousel-dot')
        if (container) container.style.transform = 'translateX(-' + (idx * 100) + '%)'
        dots.forEach((d, i) => {
          d.style.width = (i === idx ? 40 : 14) + 'px'
          d.className = 'el-carousel-dot' + (i === idx ? ' is-active' : '')
        })
      },
      onDotClick(e) {
        const dot = e.target.closest('.el-carousel-dot')
        if (!dot) return
        const dots = Array.from(this.el.querySelectorAll('.el-carousel-dot'))
        const idx = dots.indexOf(dot)
        if (idx === -1) return
        this._switchTo(idx)
      },
      mounted() {
        this.el.setAttribute('data-editing', '1')
      },
    },
  })

  // ===== 走马灯幻灯片 =====
  editor.DomComponents.addType('el-carousel-slide', {
    isComponent: function(el) {
      if (el.nodeType === 1 && el.classList.contains('el-carousel-slide')) {
        return { type: 'el-carousel-slide' }
      }
    },
    model: {
      defaults: {},
    },
  })

  // ===== 添加幻灯片命令 =====
  editor.Commands.add('addCarouselSlide', {
    run(editor) {
      const selected = editor.getSelected()
      if (!selected) return
      let carousel = selected
      while (carousel && carousel.get('type') !== 'el-carousel') {
        carousel = carousel.parent()
      }
      if (!carousel) return
      const comps = carousel.components()
      if (comps.length < 2) return
      const containerComp = comps.at(0)
      const indicatorComp = comps.at(1)
      if (containerComp) {
        containerComp.components().add(
          '<div class="el-carousel-slide" style="background:linear-gradient(135deg,#409eff,#337ecc);">' +
            '<div style="font-size:32px;font-weight:700;margin-bottom:16px;letter-spacing:2px;text-shadow:0 2px 8px rgba(0,0,0,0.2);">新幻灯片</div>' +
            '<div style="font-size:16px;color:rgba(255,255,255,0.85);max-width:400px;text-align:center;line-height:1.6;">描述文字</div>' +
          '</div>'
        )
      }
      if (indicatorComp) {
        indicatorComp.components().add(
          '<button class="el-carousel-dot" style="width:14px;"></button>'
        )
      }
    },
  })

  // ===== 卡片（容器，支持 resize） =====
  editor.DomComponents.addType('el-card', {
    isComponent: function(el) {
      if (el.getAttribute && el.getAttribute('data-gjs-type') === 'el-card') {
        return { type: 'el-card' }
      }
    },
    model: {
      defaults: {
        resizable: {
          keyWidth: 'width',
          keyHeight: 'height',
          handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
          min_dim: 20,
        },
      },
    },
  })

  // ===== 导航菜单 =====
  registerMenuType(editor)

  // ===== 测试 traits =====
  registerTestType(editor)

  // ===== 统计组件（容器，支持 resize） =====
  editor.DomComponents.addType('el-statistic', {
    isComponent: function(el) {
      if (el.getAttribute && el.getAttribute('data-gjs-type') === 'el-statistic') {
        return { type: 'el-statistic' }
      }
    },
    model: {
      defaults: {
        resizable: {
          keyWidth: 'width',
          keyHeight: 'height',
          handlers: ['se', 'e', 's', 'ne', 'nw', 'sw'],
          min_dim: 20,
        },
      },
    },
  })
}
