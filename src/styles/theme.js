const calcRem = (size) => `${size / 16}rem`;

export const lightTheme = {
  width: calcRem(980),
  minWidth: calcRem(320),
  postWidth: calcRem(650),
  navHeight: calcRem(54),
  footerHeight: calcRem(60),

  color: {
    text: '#1d1d1d',
    text2: '#1d1d1d',
    text3: '#696969',
    white: '#ffffff',
    navBar: 'rgba(255, 255, 255, 0.7)',
    navBorder: 'rgba(200, 200, 200, 0.7)',
    categoryButton: '#f2f2f2',
    background: '#f2f2f2',
    postBackground: '#ffffff',
    card: '#ffffff',
    code: '#f2f2f2',
    codeBlock: '#fafafa',
    codeHighlight: 'rgba(0, 0, 0, 0.05)',
    codeHighlightBorder: 'rgba(0, 0, 0, 0.2)',
    gray1: '#f2f2f2',
    gray2: '#e0e0e0',
    gray3: '#d1d1d1',
    gray4: '#868686',
    gray5: '#6e6e6e',
    gray6: '#696969',
    divider: 'rgba(0, 0, 0, 0.15)',
    dimmed: 'rgba(0, 0, 0, 0.15)',
    icon: 'transparent',
    blue: '#0066cc',
  },

  gridGap: {
    sm: calcRem(10),
    lg: calcRem(24),
    xl: calcRem(36),
  },

  padding: {
    sm: calcRem(16),
    lg: calcRem(22),
  },

  borderRadius: {
    sm: '6px',
    base: '8px',
  },

  sizing: {
    xs: calcRem(4),
    sm: calcRem(8),
    base: calcRem(16),
    md: calcRem(24),
    lg: calcRem(40),
    xl: calcRem(64),
  },

  text: {
    xs: calcRem(10),
    sm: calcRem(12),
    base: calcRem(16),
    md: calcRem(18),
    lg: calcRem(24),
    xl: calcRem(48),
    title: calcRem(20),
  },

  fontWeight: {
    regular: 400,
    semiBold: 600,
    bold: 700,
    extraBold: 800,
  },

  device: {
    lg: calcRem(1024),
  },
};

export const darkTheme = {
  ...lightTheme,

  color: {
    text: '#e6e6e6',
    text2: '#d1d1d1',
    text3: '#8c8c8c',
    white: '#e6e6e6',
    navBar: 'rgba(29, 29, 29, 0.7)',
    navBorder: 'rgba(255, 255, 255, 0.2)',
    categoryButton: '#484848',
    background: '#1c1c1c',
    postBackground: '#1c1c1c',
    card: '#2c2c2c',
    code: '#3a3a3a',
    codeBlock: '#1c1c1c',
    codeHighlight: 'rgba(255, 255, 255, 0.05)',
    codeHighlightBorder: 'rgba(255, 255, 255, 0.2)',
    gray1: '#1c1c1c',
    gray2: '#2c2c2c',
    gray3: '#3a3a3a',
    gray4: '#484848',
    gray5: '#646464',
    gray6: '#868686',
    divider: 'rgba(255, 255, 255, 0.15)',
    dimmed: 'rgba(0, 0, 0, 0.15)',
    icon: '#d1d1d1',
    blue: '#0a84ff',
  },

  fontWeight: {
    regular: 400,
    semiBold: 600,
    bold: 600,
    extraBold: 700,
  },
};
