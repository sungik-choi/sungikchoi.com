import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    color: ${({ theme }) => theme.color.text};
  }

  h1 a, li a  {
    text-decoration: none;
  }
`;

export default GlobalStyle;
