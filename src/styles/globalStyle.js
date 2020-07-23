import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => theme.color.text};
  }
`;

export default GlobalStyle;
