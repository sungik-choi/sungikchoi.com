import React from "react";
import { Link } from "gatsby";
import Layout from "components/Layout";
import Header from "components/Header";

const Home = () => {
  return (
    <Layout>
      <Header text="Header" />
      <Link to="/contact/">Contact</Link>
      <p>Hello World</p>
    </Layout>
  );
};

export default Home;
