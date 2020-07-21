import React from "react";
import styled from "styled-components";
import { Link } from "gatsby";
import Header from "components/Header";

const Home = () => {
  return (
    <>
      <Header text="Header" />
      <Link to="/contact/">Contact</Link>
      <Container>Hello World</Container>
    </>
  );
};

const Container = styled.div`
  color: blue;
`;

export default Home;
