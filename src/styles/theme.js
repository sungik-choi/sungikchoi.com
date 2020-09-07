const calcRem = (size) => `${size / 16}rem`;

const color = {
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
};

const minWidth = calcRem(320);
const width = calcRem(980);
const postWidth = calcRem(653);

const navHeight = {
  sm: calcRem(56),
  lg: calcRem(64),
};

const gridGap = {
  sm: calcRem(10),
  lg: calcRem(24),
  xl: calcRem(36),
};

const padding = {
  sm: calcRem(16),
  lg: calcRem(22),
};

const borderRadius = {
  sm: '6px',
  md: '16px',
};

const sizing = {
  xs: calcRem(4),
  sm: calcRem(8),
  base: calcRem(16),
  md: calcRem(24),
  lg: calcRem(40),
  xl: calcRem(64),
};

const text = {
  xs: calcRem(10),
  sm: calcRem(12),
  base: calcRem(16),
  md: calcRem(18),
  lg: calcRem(24),
  xl: calcRem(48),
  title: calcRem(21),
};

const fontWeight = {
  regular: 400,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
};

// ! 중간 디바이스 (태블릿) 설정 필요

const device = {
  lg: calcRem(1024),
};

const theme = {
  color,
  text,
  minWidth,
  width,
  postWidth,
  borderRadius,
  sizing,
  gridGap,
  padding,
  device,
  navHeight,
  fontWeight,
};

export default theme;
