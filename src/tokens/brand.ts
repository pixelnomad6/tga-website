export const colors = {
  navy:       '#1b2f4e',
  navyLight:  '#243d63',
  navyDark:   '#111f34',
  gold:       '#d8a744',
  goldLight:  '#e8be6e',
  goldDark:   '#b8893a',
  cream:      '#f8f6f1',
  creamDark:  '#ede9e0',
  slate:      '#6b7a8d',
  slateLight: '#8fa0b2',
  slateDark:  '#4e5d6e',
  white:      '#ffffff',
  black:      '#0d0d0d',
} as const;

export const fonts = {
  display: "'Playfair Display', Georgia, serif",
  body:    "'Inter', system-ui, sans-serif",
  accent:  "'Montserrat', Arial, sans-serif",
} as const;

export const breakpoints = {
  mobile:  '480px',
  tablet:  '768px',
  desktop: '1024px',
  wide:    '1280px',
} as const;

export type Color = keyof typeof colors;
export type Font  = keyof typeof fonts;
