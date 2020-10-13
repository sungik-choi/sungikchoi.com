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

  html, body, #___gatsby, #gatsby-focus-wrapper {
    min-height: 100vh;
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Noto Sans CJK KR', 'Noto Sans', Roboto, 'Segoe UI', 'Helvetica Neue', Arial, sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
  }

  :lang(ko) {
    word-break: keep-all; 
  }

  ul, ol, li, dl, dt, dd, h1, h2, h3, h4, h5, h6, hgroup, p, blockquote, figure, form, fieldset, input, legend, pre, abbr, button {
    margin: 0;
    padding: 0;
  }

  h1 a, li a  {
    text-decoration: none;
  }

  a {
    text-decoration: none;
  }

  *:focus:not(:focus-visible) {
    outline: none;
  }

  :focus-visible {
    outline: 4px solid rgba(0,125,250,0.6);
    outline-offset: 1px;
  }
/* 
  :focus {
    outline: 4px solid rgba(0,125,250,0.6);
    outline-offset: 1px;
  } */

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
