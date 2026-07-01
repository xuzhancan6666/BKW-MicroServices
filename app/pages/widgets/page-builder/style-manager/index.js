const LABELS = {
  zh_CN: { dim: '尺寸', appearance: '外观' },
  zh_HK: { dim: '尺寸', appearance: '外觀' },
  en_US: { dim: 'Size', appearance: 'Appearance' },
}

export default function getStyleManager(lang) {
  const l = LABELS[lang] || LABELS.zh_CN

  return {
    sectors: [
      {
        name: l.dim,
        open: true,
        buildProps: ['width', 'height', 'padding', 'margin'],
        properties: [
          { property: 'width',   defaults: 'auto' },
          { property: 'height',  defaults: 'auto' },
          { property: 'padding', defaults: '0' },
          { property: 'margin',  defaults: '0' },
        ],
      },
      {
        name: l.appearance,
        open: false,
        buildProps: ['background-color', 'background-image', 'background-size', 'background-repeat', 'border-radius', 'font-size', 'color', 'text-align', 'line-height'],
        properties: [
          {
            property: 'background-image',
            type: 'file',
            label: '背景图',
          },
          {
            property: 'background-size',
            type: 'select',
            label: '背景填充',
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
            label: '重复',
            defaults: 'no-repeat',
            options: [
              { value: 'no-repeat', name: '不重复' },
              { value: 'repeat', name: '平铺' },
              { value: 'repeat-x', name: '横向重复' },
              { value: 'repeat-y', name: '纵向重复' },
            ],
          },
          {
            property: 'font-size',
            type: 'select',
            defaults: '16px',
            options: [
              { value: '12px', name: '12' },
              { value: '14px', name: '14' },
              { value: '16px', name: '16' },
              { value: '18px', name: '18' },
              { value: '20px', name: '20' },
              { value: '24px', name: '24' },
              { value: '32px', name: '32' },
            ],
          },
          {
            property: 'line-height',
            type: 'select',
            defaults: '1.6',
            options: [
              { value: '1',   name: '1.0' },
              { value: '1.2', name: '1.2' },
              { value: '1.4', name: '1.4' },
              { value: '1.6', name: '1.6' },
              { value: '1.8', name: '1.8' },
              { value: '2',   name: '2.0' },
            ],
          },
        ],
      },
    ],
  }
}
