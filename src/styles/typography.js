import Typography from 'typography';

const fontFamily = [
  'Pretendard Variable',
  'Pretendard',
  '-apple-system',
  'BlinkMacSystemFont',
  'Noto Sans CJK KR',
  'Noto Sans',
  'Roboto',
  'Segoe UI',
  'Helvetica Neue',
  'Arial',
  'sans-serif',
  'Apple Color Emoji',
  'Segoe UI Emoji',
  'Segoe UI Symbol',
  'Noto Color Emoji',
];

const typography = new Typography({
  headerFontFamily: fontFamily,
  bodyFontFamily: fontFamily,
});

export const rhythm = typography.rhythm;

export default typography;
