import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import useTheme from 'hooks/useTheme';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

import { lightTheme, darkTheme } from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

import NavBar from './navBar';

const Layout = ({ children }) => {
  const [theme, themeToggler] = useTheme();
  // ? 왜 2번 불리면서 theme가 제대로 저장이 안되는거지?
  const themeMode = theme === 'light' ? lightTheme : darkTheme;
  console.log(theme, themeMode);
  const site = useSiteMetadata();
  const { title, description, author } = site.siteMetadata;
  const copyrightStr = `${description}. Copyright © ${author}.`;

  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyle />
      <Container>
        <NavBar title={title} />
        {children}
        <Footer role="contentinfo">
          <Copyright aria-label="Copyright">{copyrightStr}</Copyright>
        </Footer>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => `min-height: calc(100vh - ${theme.footerHeight})`};
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
