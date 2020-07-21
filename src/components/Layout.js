import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return (
    <Container>
      <h3>My Blog</h3>
      {children}
    </Container>
  );
};

const Container = styled.div`
  max-width: 650px;
  margin: 3rem auto;
`;

export default Layout;
