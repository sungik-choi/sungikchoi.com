import React from 'react';
import styled, { ThemeProvider } from 'styled-components';
import { useStaticQuery, graphql } from 'gatsby';

import theme from 'styles/theme';
import GlobalStyle from 'styles/globalStyle';

import NavBar from './navBar';

const Layout = ({ children }) => {
  const data = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
          }
        }
      }
    `
  );

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Container>
        <NavBar title={data.site.siteMetadata.title} />
        {children}
        <Footer></Footer>
      </Container>
    </ThemeProvider>
  );
};

const Container = styled.div`
  width: 100%;
  height: 100%;
  ${({ theme }) => `min-height: calc(100vh - ${theme.footerHeight})`};
`;

// ! footer 디자인 필요

const Footer = styled.footer`
  height: ${({ theme }) => theme.footerHeight};
  background-color: ${({ theme }) => theme.color.gray1};
`;

export default Layout;
