import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'components/layout/layout';
import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ data }) => {
  return (
    <Layout>
      <PostGrid>
        <Post>
          <ul>
            {data.allMarkdownRemark.edges.map(({ node }) => {
              const { title, desc, date, tag } = node.frontmatter;
              const korDate = convertToKorDate(date);
              const ariaLabel = `${title} - ${tag} - Posted on ${korDate}`;
              return (
                <List key={node.id}>
                  <Link to={node.fields.slug} aria-label={ariaLabel}>
                    <article>
                      <Thumbnail src="https://miro.medium.com/max/2880/1*GgLVXXfYDuS08V1SQQQaeQ.jpeg" />
                      <h2>{title}</h2>
                      <p>{desc}</p>
                      <time role="text" dateTime={date}>
                        {korDate}
                      </time>
                      <span>{tag}</span>
                    </article>
                  </Link>
                </List>
              );
            })}
          </ul>
        </Post>
      </PostGrid>
    </Layout>
  );
};

const PostGrid = styled.main`
  padding-top: 40px;
  margin: 0 auto;
  width: 692px;
`;

const Post = styled.section``;

const List = styled.li`
  list-style: none;
`;

const Thumbnail = styled.img`
  border-radius: 8px;
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
            date(formatString: "YYYY-MM-DD")
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
