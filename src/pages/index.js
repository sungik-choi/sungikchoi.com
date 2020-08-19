import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import Card from 'components/card';

import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO />
      <Background>
        <Post>
          <section>
            <Content>
              <Grid>
                {data.allMarkdownRemark.edges.map(({ node }) => {
                  const {
                    title,
                    desc,
                    date,
                    tag,
                    thumbnail,
                  } = node.frontmatter;
                  const korDate = convertToKorDate(date);
                  const ariaLabel = `${title} - ${tag} - Posted on ${korDate}`;
                  return (
                    <List key={node.id}>
                      <Link to={node.fields.slug} aria-label={ariaLabel}>
                        <Card
                          thumbnail={thumbnail}
                          tag={tag}
                          title={title}
                          desc={desc}
                          date={date}
                          korDate={korDate}
                        />
                      </Link>
                    </List>
                  );
                })}
              </Grid>
            </Content>
          </section>
        </Post>
      </Background>
    </Layout>
  );
};

const Background = styled.div`
  background-color: ${({ theme }) => theme.color.gray1};
  height: 100%;
`;

const Post = styled.main`
  padding-top: ${({ theme }) => theme.sizing.lg};
  max-width: 980px;
  margin: 0 auto;
`;

const Content = styled.div``;

const Grid = styled.ul`
  display: grid;
  grid-gap: 20px;
  grid-template-columns: repeat(12, 1fr);
  grid-auto-rows: auto;
  list-style: none;
  margin: 0;
  padding: 0;
  & > li {
    margin-bottom: 0;
  }
`;

const List = styled.li`
  grid-column: span 6;
`;

export const query = graphql`
  query {
    allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tag
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail
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
