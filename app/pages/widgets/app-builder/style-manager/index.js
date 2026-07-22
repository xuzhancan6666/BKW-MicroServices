/**
 * APP 端 Style Manager — 所有尺寸单位限定为 rem / vh / vw / %
 */

const noPx = ['rem', 'vh', 'vw', '%']

const number = (overrides = {}) => ({
  type: 'number',
  units: noPx,
  ...overrides,
})

export default function getAppStyleManager() {
  return {
    sectors: [
      {
        name: '尺寸',
        open: true,
        buildProps: ['width', 'height', 'min-width', 'min-height', 'padding', 'margin', 'gap'],
        properties: [
          number({ property: 'width', defaults: 'auto' }),
          number({ property: 'height', defaults: 'auto' }),
          number({ property: 'min-width' }),
          number({ property: 'min-height' }),
          number({ property: 'padding', defaults: '0' }),
          number({ property: 'margin', defaults: '0' }),
          number({ property: 'gap' }),
        ],
      },
      {
        name: '布局',
        open: false,
        buildProps: ['display', 'position', 'top', 'right', 'bottom', 'left', 'overflow', 'opacity', 'z-index'],
        properties: [
          {
            property: 'display',
            type: 'select',
            defaults: 'flex',
            options: [
              { value: 'flex', name: 'Flex' },
              { value: 'block', name: 'Block' },
              { value: 'inline', name: 'Inline' },
              { value: 'inline-block', name: 'Inline-Block' },
              { value: 'none', name: 'None' },
            ],
          },
          {
            property: 'position',
            type: 'select',
            defaults: 'static',
            options: [
              { value: 'static', name: 'Static' },
              { value: 'relative', name: 'Relative' },
              { value: 'absolute', name: 'Absolute' },
              { value: 'fixed', name: 'Fixed' },
            ],
          },
          number({ property: 'top' }),
          number({ property: 'right' }),
          number({ property: 'bottom' }),
          number({ property: 'left' }),
          {
            property: 'overflow',
            type: 'select',
            defaults: 'visible',
            options: [
              { value: 'visible', name: 'Visible' },
              { value: 'hidden', name: 'Hidden' },
              { value: 'scroll', name: 'Scroll' },
              { value: 'auto', name: 'Auto' },
            ],
          },
          { property: 'opacity', type: 'number', min: 0, max: 1, step: 0.05, units: [] },
          { property: 'z-index', type: 'number' },
        ],
      },
      {
        name: 'Flex',
        open: false,
        buildProps: [
          'flex-direction', 'flex-wrap', 'justify-content', 'align-items',
          'align-content', 'flex-grow', 'flex-shrink', 'flex-basis', 'order',
        ],
        properties: [
          {
            property: 'flex-direction',
            type: 'select',
            defaults: 'column',
            options: [
              { value: 'column', name: '纵向' },
              { value: 'row', name: '横向' },
              { value: 'column-reverse', name: '纵向反向' },
              { value: 'row-reverse', name: '横向反向' },
            ],
          },
          {
            property: 'flex-wrap',
            type: 'select',
            defaults: 'nowrap',
            options: [
              { value: 'nowrap', name: '不换行' },
              { value: 'wrap', name: '换行' },
            ],
          },
          {
            property: 'justify-content',
            type: 'select',
            defaults: 'flex-start',
            options: [
              { value: 'flex-start', name: 'Flex Start' },
              { value: 'flex-end', name: 'Flex End' },
              { value: 'center', name: 'Center' },
              { value: 'space-between', name: 'Space Between' },
              { value: 'space-around', name: 'Space Around' },
            ],
          },
          {
            property: 'align-items',
            type: 'select',
            defaults: 'stretch',
            options: [
              { value: 'stretch', name: 'Stretch' },
              { value: 'flex-start', name: 'Flex Start' },
              { value: 'flex-end', name: 'Flex End' },
              { value: 'center', name: 'Center' },
              { value: 'baseline', name: 'Baseline' },
            ],
          },
          {
            property: 'align-content',
            type: 'select',
            defaults: 'stretch',
            options: [
              { value: 'stretch', name: 'Stretch' },
              { value: 'flex-start', name: 'Flex Start' },
              { value: 'flex-end', name: 'Flex End' },
              { value: 'center', name: 'Center' },
              { value: 'space-between', name: 'Space Between' },
            ],
          },
          number({ property: 'flex-grow', min: 0, max: 10 }),
          number({ property: 'flex-shrink', min: 0, max: 10 }),
          number({ property: 'flex-basis' }),
          { property: 'order', type: 'number' },
        ],
      },
      {
        name: '文字',
        open: false,
        buildProps: [
          'font-family', 'font-weight', 'font-size', 'font-style',
          'line-height', 'letter-spacing', 'text-align', 'color', 'text-shadow',
        ],
        properties: [
          {
            property: 'font-family',
            type: 'select',
            defaults: 'inherit',
            options: [
              { value: 'inherit', name: '继承' },
              { value: 'Arial, sans-serif', name: 'Arial' },
              { value: "'Helvetica Neue', Helvetica, sans-serif", name: 'Helvetica' },
              { value: "'PingFang SC', 'Microsoft YaHei', sans-serif", name: '苹方/微软雅黑' },
            ],
          },
          {
            property: 'font-weight',
            type: 'select',
            defaults: '400',
            options: [
              { value: '100', name: 'Thin' },
              { value: '300', name: 'Light' },
              { value: '400', name: 'Regular' },
              { value: '500', name: 'Medium' },
              { value: '600', name: 'Semi Bold' },
              { value: '700', name: 'Bold' },
              { value: '900', name: 'Black' },
            ],
          },
          number({ property: 'font-size', defaults: '16px' }),
          {
            property: 'font-style',
            type: 'select',
            defaults: 'normal',
            options: [
              { value: 'normal', name: 'Normal' },
              { value: 'italic', name: 'Italic' },
            ],
          },
          { property: 'line-height', type: 'number', units: [], min: 0 },
          number({ property: 'letter-spacing' }),
          {
            property: 'text-align',
            type: 'select',
            defaults: 'left',
            options: [
              { value: 'left', name: 'Left' },
              { value: 'center', name: 'Center' },
              { value: 'right', name: 'Right' },
              { value: 'justify', name: 'Justify' },
            ],
          },
          { property: 'color', type: 'color' },
          { property: 'text-shadow', type: 'shadow' },
        ],
      },
      {
        name: '背景',
        open: false,
        buildProps: ['background-color', 'background-image', 'background-size', 'background-repeat', 'border-radius', 'box-shadow'],
        properties: [
          { property: 'background-color', type: 'color' },
          {
            property: 'background-image',
            type: 'file',
            label: '背景图',
          },
          {
            property: 'background-size',
            type: 'select',
            defaults: 'cover',
            options: [
              { value: 'cover', name: '铺满' },
              { value: 'contain', name: '包含' },
              { value: 'auto', name: '自动' },
              { value: '100% 100%', name: '拉伸' },
            ],
          },
          {
            property: 'background-repeat',
            type: 'select',
            defaults: 'no-repeat',
            options: [
              { value: 'no-repeat', name: '不重复' },
              { value: 'repeat', name: '平铺' },
              { value: 'repeat-x', name: '横向重复' },
              { value: 'repeat-y', name: '纵向重复' },
            ],
          },
          number({ property: 'border-radius' }),
          { property: 'box-shadow', type: 'shadow' },
        ],
      },
      {
        name: '边框',
        open: false,
        buildProps: ['border-width', 'border-style', 'border-color'],
        properties: [
          number({ property: 'border-width', defaults: '1px' }),
          {
            property: 'border-style',
            type: 'select',
            defaults: 'solid',
            options: [
              { value: 'none', name: 'None' },
              { value: 'solid', name: 'Solid' },
              { value: 'dashed', name: 'Dashed' },
              { value: 'dotted', name: 'Dotted' },
            ],
          },
          { property: 'border-color', type: 'color' },
        ],
      },
    ],
  }
}
