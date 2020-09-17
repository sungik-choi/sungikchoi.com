import React, { useState, useLayoutEffect } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import kebabCase from 'lodash/kebabCase';

import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import Card from 'components/card';
import { ThumbnailWrapper } from 'components/centeredImg';

import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ pageContext, data }) => {
  const [post, setPost] = useState([]);
  const currentTag = pageContext.tag;
  const tagList = data.allMarkdownRemark.group;
  const postData = data.allMarkdownRemark.edges;

  const filteredPostData = currentTag
    ? postData.filter(({ node }) => node.frontmatter.tag === currentTag)
    : postData;

  useLayoutEffect(() => {
    filteredPostData.forEach(({ node }) => {
      const {
        id,
        fields: { slug },
        frontmatter: {
          title,
          desc,
          date,
          tag,
          thumbnail: { base },
          alt,
        },
      } = node;

      setPost((prevPost) => [
        ...prevPost,
        { id, slug, title, desc, date, tag, base, alt },
      ]);
    });
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <section>
          <Content>
            <ul>
              <li key="all">
                <Link to="/">all</Link>
              </li>
              {tagList.map((tag) => {
                const { fieldValue } = tag;
                return (
                  <li key={fieldValue}>
                    <Link to={`/tags/${kebabCase(fieldValue)}`}>
                      {fieldValue}
                    </Link>
                  </li>
                );
              })}
            </ul>
            <Grid>
              {!post ? (
                <div>loading...</div>
              ) : (
                post.map((data) => {
                  const { id, slug, title, desc, date, tag, base, alt } = data;
                  const korDate = convertToKorDate(date);
                  const ariaLabel = `${title} - ${tag} - Posted on ${korDate}`;
                  return (
                    <List key={id}>
                      <Link to={slug} aria-label={ariaLabel}>
                        <Card
                          thumbnail={base}
                          alt={alt}
                          tag={tag}
                          title={title}
                          desc={desc}
                          date={date}
                          korDate={korDate}
                        />
                      </Link>
                    </List>
                  );
                })
              )}
            </Grid>
          </Content>
        </section>
      </Main>
    </Layout>
  );
};

const Main = styled.main`
  min-width: ${({ theme }) => theme.minWidth};
  ${({ theme }) =>
    `min-height: calc(100vh - ${theme.navHeight} - ${theme.footerHeight})`};
  background-color: ${({ theme }) => theme.color.gray1};
`;

const Content = styled.div`
  box-sizing: content-box;
  padding-top: ${({ theme }) => theme.gridGap.lg};
  width: 87.5%;
  margin: 0 auto;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    width: 100%;
    max-width: ${({ theme }) => theme.width};
    padding-top: ${({ theme }) => theme.sizing.lg};
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: ${({ theme }) => theme.gridGap.lg};
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-gap: ${({ theme }) => theme.gridGap.xl};
  }
`;

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 2;

  &:hover ${ThumbnailWrapper}::after {
    opacity: 1;
  }

  & .gatsby-image-wrapper {
    transition: opacity 1s ease-out, transform 0.5s ease;
  }

  &:hover .gatsby-image-wrapper {
    transform: scale(1.03);
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    grid-column: span 1;
  }
`;

export const query = graphql`
  query {
    allMarkdownRemark(
      limit: 2000
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      group(field: frontmatter___tag) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            tag
            date(formatString: "YYYY-MM-DD")
            desc
            thumbnail {
              base
            }
            alt
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
