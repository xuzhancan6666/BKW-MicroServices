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
          { property: 'width',   units: ['px', '%'], defaults: 'auto' },
          { property: 'height',  units: ['px', '%'], defaults: 'auto' },
          { property: 'padding', units: ['px'], defaults: '0' },
          { property: 'margin',  units: ['px'], defaults: '0' },
        ],
      },
      {
        name: l.appearance,
        open: false,
        buildProps: ['background-color', 'border-radius', 'font-size', 'color', 'text-align', 'line-height'],
        properties: [
          {
            property: 'font-size',
            type: 'select',
            defaults: '16px',
            options: [
              { value: '12px', name: '12px' },
              { value: '14px', name: '14px' },
              { value: '16px', name: '16px' },
              { value: '18px', name: '18px' },
              { value: '20px', name: '20px' },
              { value: '24px', name: '24px' },
              { value: '32px', name: '32px' },
            ],
          },
          {
            property: 'line-height',
            type: 'select',
            defaults: '1.6',
            options: [
              { value: '1', name: '1.0' },
              { value: '1.2', name: '1.2' },
              { value: '1.4', name: '1.4' },
              { value: '1.6', name: '1.6' },
              { value: '1.8', name: '1.8' },
              { value: '2', name: '2.0' },
            ],
          },
        ],
      },
    ],
  }
}
