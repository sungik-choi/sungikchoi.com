import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'components/layout/layout';

const Home = ({ data }) => {
  return (
    <Layout>
      <PostGrid>
        {data.allMarkdownRemark.edges.map(({ node }) => (
          <div key={node.id}>
            <Link to={node.fields.slug}>
              <Thumbnail src="https://miro.medium.com/max/2880/1*GgLVXXfYDuS08V1SQQQaeQ.jpeg" />
              <h3>{node.frontmatter.tag}</h3>
              <h3>
                {node.frontmatter.title} <span>— {node.frontmatter.date}</span>
              </h3>
              <p>{node.frontmatter.desc}</p>
            </Link>
          </div>
        ))}
      </PostGrid>
    </Layout>
  );
};

const PostGrid = styled.section`
  padding-top: 40px;
  margin: 0 auto;
  width: 692px;
`;

const Thumbnail = styled.img`
  border-radius: 16px;
`;

export const query = graphql`
  query {
    allMarkdownRemark {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tag
            date(formatString: "DD MMMM, YYYY")
            desc
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
