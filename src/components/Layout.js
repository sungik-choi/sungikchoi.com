import React from "react";
import styled from "styled-components";
import { useStaticQuery, graphql } from "gatsby";

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
    <Container>
      <h3>{data.site.siteMetadata.title}</h3>
      {children}
    </Container>
  );
};

const Container = styled.div`
  max-width: 650px;
  margin: 3rem auto;
`;

export default Layout;
