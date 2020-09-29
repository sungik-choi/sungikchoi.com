const calcRem = (size) => `${size / 16}rem`;

export const lightTheme = {
  width: calcRem(980),
  minWidth: calcRem(320),
  postWidth: calcRem(650),
  navHeight: calcRem(54),
  footerHeight: calcRem(60),

  color: {
    black: '#000',
    white: '#fff',
    gray1: '#f5f5f5',
    gray2: '#fafafa',
    gray3: '#e0e0e0',
    gray4: '#d6d6d6',
    gray5: '#6e6e6e',
    gray6: '#868686',
    transparent: 'rgba(255, 255, 255, 0.7)',
    shadow: '#d2d2d2',
    dimmed: 'rgba(0, 0, 0, 0.15)',
    text: '#1d1d1d',
    hover: '#06c',
    pink: '#e94256',
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
