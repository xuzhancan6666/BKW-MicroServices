/**
 * element-ui/index.js — ElementUI 高还原组件 block 集合
 *
 * 包含：
 *   getElementBlocks()  — 返回所有 block 定义
 *   registerElementBlockTypes(editor) — 注册交互行为（点击切换、树展开等）
 */

import { getMenuBlocks } from './menu.js'
import { getStepsBlocks } from './steps.js'
import { getTimelineBlocks } from './timeline.js'
import { getTreeBlocks } from './tree.js'
import { getTableBlocks } from './table.js'
import { getStatisticBlocks } from './statistic.js'
import { getCardBlocks } from './card.js'
import { getTagBlocks } from './tag.js'
import { getLinkBlocks } from './link.js'
import { getCarouselBlocks } from './carousel.js'

export function getElementBlocks() {
  return [
    ...getMenuBlocks(),
    ...getStepsBlocks(),
    ...getTimelineBlocks(),
    ...getTreeBlocks(),
    ...getTableBlocks(),
    ...getStatisticBlocks(),
    ...getCardBlocks(),
    ...getTagBlocks(),
    ...getLinkBlocks(),
    ...getCarouselBlocks(),
  ]
}

/**
 * 注册 ElementUI 组件的交互类型
 * 使 GrapesJS 编辑器内支持点击交互，并导出 script 到 HTML
 */
export function registerElementBlockTypes(editor) {
  // ===== 横向菜单 =====
  editor.DomComponents.addType('el-horizontal-menu', {
    model: {
      defaults: {
        script: function() {
          var root = this;
          root.addEventListener('click', function(e) {
            var item = e.target.closest('.el-menu-item');
            if (!item) return;
            root.querySelectorAll('.el-menu-item').forEach(function(i) {
              i.classList.remove('is-active');
            });
            item.classList.add('is-active');
          });
        },
      },
    },
    view: {
      events: {
        'click .el-menu-item': 'onMenuItemClick',
      },
      onMenuItemClick(e) {
        const item = e.currentTarget
        this.el.querySelectorAll('.el-menu-item').forEach(el => {
          el.classList.remove('is-active')
        })
        item.classList.add('is-active')
      },
    },
  })

  // ===== 纵向菜单 =====
  editor.DomComponents.addType('el-vertical-menu', {
    model: {
      defaults: {
        script: function() {
          var root = this;
          root.addEventListener('click', function(e) {
            var item = e.target.closest('.el-menu-item');
            if (!item) return;
            root.querySelectorAll('.el-menu-item').forEach(function(i) {
              i.classList.remove('is-active');
            });
            item.classList.add('is-active');
          });
        },
      },
    },
    view: {
      events: {
        'click .el-menu-item': 'onMenuItemClick',
      },
      onMenuItemClick(e) {
        const item = e.currentTarget
        this.el.querySelectorAll('.el-menu-item').forEach(el => {
          el.classList.remove('is-active')
        })
        item.classList.add('is-active')
      },
    },
  })

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
          root.addEventListener('click', function(e) {
            var dot = e.target.closest('.el-carousel-dot');
            if (!dot) return;
            var dots = Array.from(root.querySelectorAll('.el-carousel-dot'));
            var idx = dots.indexOf(dot);
            if (idx === -1) return;

            // 切换幻灯片
            var slides = root.querySelectorAll('.el-carousel-slide');
            slides.forEach(function(s, i) {
              s.style.display = i === idx ? 'flex' : 'none';
            });

            // 切换指示器样式
            dots.forEach(function(d, i) {
              d.style.width = (i === idx ? 28 : 8) + 'px';
              d.className = 'el-carousel-dot' + (i === idx ? ' is-active' : '');
            });
          });
        },
      },
    },
    view: {
      events: {
        'click .el-carousel-dot': 'onDotClick',
      },
      onDotClick(e) {
        const dot = e.currentTarget
        const dots = Array.from(this.el.querySelectorAll('.el-carousel-dot'))
        const idx = dots.indexOf(dot)
        if (idx === -1) return

        const slides = this.el.querySelectorAll('.el-carousel-slide')
        slides.forEach((s, i) => {
          s.style.display = i === idx ? 'flex' : 'none'
        })

        dots.forEach((d, i) => {
          d.style.width = (i === idx ? 28 : 8) + 'px'
          d.className = 'el-carousel-dot' + (i === idx ? ' is-active' : '')
        })
      },
    },
  })
}
