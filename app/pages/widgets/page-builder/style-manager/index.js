const LABELS = {
  zh_CN: { dim: '尺寸边距', border: '边框背景', font: '字体排版' },
  zh_HK: { dim: '尺寸邊距', border: '邊框背景', font: '字體排版' },
  en_US: { dim: 'Size & Spacing', border: 'Border & Background', font: 'Typography' },
}

export default function getStyleManager(lang, fixedUnit) {
  const l = LABELS[lang] || LABELS.zh_CN

  const unitProps = fixedUnit ? [
    { property: 'width', units: [fixedUnit] },
    { property: 'height', units: [fixedUnit] },
    { property: 'padding', units: [fixedUnit] },
    { property: 'padding-top', units: [fixedUnit] },
    { property: 'padding-right', units: [fixedUnit] },
    { property: 'padding-bottom', units: [fixedUnit] },
    { property: 'padding-left', units: [fixedUnit] },
    { property: 'margin', units: [fixedUnit] },
    { property: 'margin-top', units: [fixedUnit] },
    { property: 'margin-right', units: [fixedUnit] },
    { property: 'margin-bottom', units: [fixedUnit] },
    { property: 'margin-left', units: [fixedUnit] },
    { property: 'border-radius', units: [fixedUnit] },
    { property: 'border-top-left-radius', units: [fixedUnit] },
    { property: 'border-top-right-radius', units: [fixedUnit] },
    { property: 'border-bottom-right-radius', units: [fixedUnit] },
    { property: 'border-bottom-left-radius', units: [fixedUnit] },
  ] : []

  const dimProps = ['width', 'height', 'padding', 'margin',
    'padding-top', 'padding-right', 'padding-bottom', 'padding-left',
    'margin-top', 'margin-right', 'margin-bottom', 'margin-left']

  const borderProps = ['background-color', 'border-radius', 'border', 'box-shadow',
    'border-top-left-radius', 'border-top-right-radius',
    'border-bottom-right-radius', 'border-bottom-left-radius']

  return {
    sectors: [
      {
        name: l.dim,
        open: true,
        buildProps: ['width', 'height', 'padding', 'margin'],
        properties: unitProps.filter(p => dimProps.includes(p.property)),
      },
      {
        name: l.border,
        open: false,
        buildProps: ['background-color', 'border-radius', 'border', 'box-shadow'],
        properties: unitProps.filter(p => borderProps.includes(p.property)),
      },
      {
        name: l.font,
        open: false,
        buildProps: ['font-size', 'line-height', 'font-weight', 'color', 'text-align'],
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
              { value: '28px', name: '28px' },
              { value: '32px', name: '32px' },
              { value: '36px', name: '36px' },
              { value: '48px', name: '48px' },
              { value: '64px', name: '64px' },
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
