const unit = 4;

const calcRem = (size) => `${size / 16}rem`;

const color = {
  gray1: '#f5f5f7',
  gray2: '#B2B2B2',
  shadow: '#d2d2d7',
  text: '#1d1d1f',
  hover: '#06c',
};

const sizing = {
  lg: calcRem(unit * 10),
};

const theme = {
  color,
  sizing,
};

export default theme;
