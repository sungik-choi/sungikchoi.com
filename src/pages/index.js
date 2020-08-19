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
  /* padding-top: ${({ theme }) => theme.sizing.lg}; */
  height: 100%;
`;

const Post = styled.main`
  box-sizing: content-box;
  padding-top: ${({ theme }) => theme.sizing.base};
  max-width: ${({ theme }) => theme.width};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding-top: ${({ theme }) => theme.sizing.lg};
  }
`;

const Content = styled.div``;

const Grid = styled.ul`
  display: grid;
  grid-gap: ${({ theme }) => theme.gridGap.sm};
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: auto;
  list-style: none;
  margin: 0;
  padding: 0;

  & > li {
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-gap: ${({ theme }) => theme.gridGap.lg};
  }
`;

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 2;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-column: span 1;
  }
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
