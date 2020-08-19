import { createGlobalStyle } from 'styled-components';

// --indigo: #622aff;
// --blue: #0e90db;
// --pink: #e94256;
// --green: #0b9e43;
// --azure: #027fff;
// --r-localnav-height-stacked: 66px;

// --r-globalnav-height: 44px;
// --r-globalnav-segmentbar-height: 0;
// --r-globalnav-viewport-large-min-width: 1024px;
// --r-globalnav-viewport-large-max-width: 1441px;
// --r-globalnav-viewport-large-query: (min-width: 1024px);
// --r-globalnav-viewport-medium-min-width: 768px;
// --r-globalnav-viewport-medium-max-width: 1023px;
// --r-globalnav-viewport-medium-query: (max-width: 1023px);
// --r-globalnav-viewport-small-min-width: 420px;
// --r-globalnav-viewport-small-max-width: 767px;
// --r-globalnav-viewport-small-query: (max-width: 767px);
// --r-globalnav-viewport-xsmall-min-width: 320px;
// --r-globalnav-viewport-xsmall-max-width: 419px;
// --r-globalnav-viewport-xsmall-query: (max-width: 419px);

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => theme.color.text};
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  h1 a, li a  {
    text-decoration: none;
  }

  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: no-wrap;
  }
`;

export default GlobalStyle;
