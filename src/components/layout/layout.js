import React from 'react';
import styled, { ThemeProvider } from 'styled-components';

import { useSiteMetadata } from 'hooks/useSiteMetadata';

import theme from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

import NavBar from './navBar';

const Layout = ({ children }) => {
  const site = useSiteMetadata();
  const { title, description, author } = site.siteMetadata;
  const copyrightStr = `${description}. Copyright © ${author}.`;

  return (
    <ThemeProvider theme={theme}>
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
