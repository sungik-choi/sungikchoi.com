import React from "react";
import { graphql, Link } from "gatsby";
import Layout from "components/Layout";
import Header from "components/Header";

const Home = ({ data }) => {
  return (
    <Layout>
      <Header text={data.site.siteMetadata.title} />
      <Link to="/contact/">Contact</Link>
      <p>Hello World</p>
    </Layout>
  );
};

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
  }
`;

export default Home;
