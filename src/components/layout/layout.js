import React, { createContext } from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useTheme from 'hooks/useTheme';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

import { lightTheme, darkTheme } from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

import NavBar from './navBar';

export const ThemeContext = createContext();

const Layout = ({ children }) => {
  const [theme, themeToggler] = useTheme();
  const themeMode = theme === 'light' ? lightTheme : darkTheme;

  const site = useSiteMetadata();
  const { title, description, author } = site.siteMetadata;
  const copyrightStr = `${description}. Copyright © ${author}.`;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Container>
        <NavBar title={title} />
        <ThemeToggleButton onClick={themeToggler}>테마변경</ThemeToggleButton>
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
        <Footer role="contentinfo">
          <Copyright aria-label="Copyright">{copyrightStr}</Copyright>
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

const ThemeToggleButton = styled.button`
  position: sticky;
  top: 0;
  left: 0;
  z-index: 1000;
`;

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => `min-height: calc(100vh - ${theme.footerHeight})`};
  background-color: ${({ theme }) => theme.color.white};
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${({ theme }) => theme.footerHeight};
  background-color: ${({ theme }) => theme.color.gray1};
`;

const Copyright = styled.span`
  font-size: ${({ theme }) => theme.text.sm};
  font-weight: 400;
  color: ${({ theme }) => theme.color.gray6};
`;

export default Layout;
