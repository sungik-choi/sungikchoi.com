import React from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import Card from 'components/card';
import { Image, ThumbnailWrapper } from 'components/centeredImg';

import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <section>
          <Content>
            <Grid>
              {data.allMarkdownRemark.edges.map(({ node }) => {
                const { title, desc, date, tag, thumbnail } = node.frontmatter;
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
      </Main>
    </Layout>
  );
};

const Main = styled.main`
  background-color: ${({ theme }) => theme.color.gray1};
`;

const Content = styled.div`
  box-sizing: content-box;
  padding-top: ${({ theme }) => theme.sizing.base};
  max-width: ${({ theme }) => theme.width};
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding-top: ${({ theme }) => theme.sizing.lg};
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: ${({ theme }) => theme.gridGap.sm};
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

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
  border-radius: ${({ theme }) => theme.text.md};

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-column: span 1;
    border-radius: ${({ theme }) => theme.text.md};
    transition: opacity 250ms ease-out, transform 250ms ease-out,
      box-shadow 200ms ease;

    &:hover {
      box-shadow: 10px 10px 20px 0px rgba(0, 0, 0, 0.04),
        -10px 0 20px 0px rgba(0, 0, 0, 0.04);
      z-index: 1;
    }

    &:hover ${ThumbnailWrapper}::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.dimmed};
    }

    &:hover ${Image} {
      transform: translate(-50%, -50%) scale(1.05);
    }
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
