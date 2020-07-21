import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "components/Layout";
import Header from "components/Header";

const Home = ({ data }) => {
  return (
    <Layout>
      <Header text="title" />
      <Link to="/contact/">Contact</Link>
      <p>Hello World</p>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <div key={node.id}>
          <Link to={node.fields.slug}>
            <h3>
              {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
            </h3>
            <p>{node.excerpt}</p>
          </Link>
        </div>
      ))}
    </Layout>
  );
};

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            date(formatString: "DD MMMM, YYYY")
          }
          fields {
            slug
          }
          excerpt
        }
      }
    }
  }
`;

export default Home;
