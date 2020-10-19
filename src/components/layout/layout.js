import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from './navBar/navBar';
import ThemeContext from 'components/themeContext';
import useTheme from 'hooks/useTheme';
import { useSiteMetadata } from 'hooks/useSiteMetadata';
import styledTheme from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

const Layout = ({ children }) => {
  const [theme, themeToggler] = useTheme();
  const site = useSiteMetadata();
  const { title, description, author } = site.siteMetadata;
  const copyrightStr = `${description}. Copyright © ${author}.`;

  return (
    <ThemeProvider theme={styledTheme}>
      <ThemeContext.Provider value={theme}>
        <GlobalStyle />
        <Container>
          <NavBar title={title} themeToggler={themeToggler} />
          {children}
        </Container>
        <Footer role="contentinfo">
          <Copyright aria-label="Copyright">{copyrightStr}</Copyright>
        </Footer>
      </ThemeContext.Provider>
    </ThemeProvider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  min-height: calc(100vh - var(--footer-height));
  background-color: var(--color-post-background);
`;

const Footer = styled.footer`
  display: flex;
  justify-content: center;
  align-items: center;
  height: var(--footer-height);
  background-color: var(--color-gray-1);
`;

const Copyright = styled.span`
  font-size: var(--text-sm);
  font-weight: var(--font-weight-regular);
  color: var(--color-gray-4);
`;

export default Layout;
