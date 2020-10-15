import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import NavBar from './navBar/navBar';
import useTheme from 'hooks/useTheme';
import { useSiteMetadata } from 'hooks/useSiteMetadata';
import { lightTheme, darkTheme } from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';
import { LIGHT } from 'constants/constants';

const Layout = ({ children }) => {
  const [theme, themeToggler] = useTheme();
  const themeMode = theme === LIGHT ? lightTheme : darkTheme;

  const site = useSiteMetadata();
  const { title, description, author } = site.siteMetadata;
  const copyrightStr = `${description}. Copyright © ${author}.`;

  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyle />
      <Container>
        <NavBar title={title} themeToggler={themeToggler} />
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
  background-color: ${({ theme }) => theme.color.postBackground};
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
  color: ${({ theme }) => theme.color.gray4};
`;

export default Layout;
