import React, { useState, useLayoutEffect } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import CategoryFilter from 'components/categoryFilter';
import Card from 'components/card';
import { ThumbnailWrapper } from 'components/centeredImg';

import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ pageContext, data }) => {
  const [post, setPost] = useState([]);
  const currentCategory = pageContext.category;
  const categoryList = data.allMarkdownRemark.group;
  const postData = data.allMarkdownRemark.edges;

  const filteredPostData = currentCategory
    ? postData.filter(
        ({ node }) => node.frontmatter.category === currentCategory
      )
    : postData;

  const postTitle = currentCategory || 'New';

  useLayoutEffect(() => {
    filteredPostData.forEach(({ node }) => {
      const {
        id,
        fields: { slug },
        frontmatter: {
          title,
          desc,
          date,
          category,
          thumbnail: { base },
          alt,
        },
      } = node;

      setPost((prevPost) => [
        ...prevPost,
        { id, slug, title, desc, date, category, base, alt },
      ]);
    });
  }, []);

  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <Content>
          <CategoryFilter categoryList={categoryList} />
          <PostTitle>{postTitle}</PostTitle>
          <Grid role="list">
            {post.map((data) => {
              const { id, slug, title, desc, date, category, base, alt } = data;
              const korDate = convertToKorDate(date);
              const ariaLabel = `${title} - ${category} - Posted on ${korDate}`;
              return (
                <List key={id} role="listitem">
                  <Link to={slug} aria-label={ariaLabel}>
                    <Card
                      thumbnail={base}
                      alt={alt}
                      category={category}
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
      </Main>
    </Layout>
  );
};

const Main = styled.main`
  height: 3000px;
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

const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: ${({ theme }) => theme.fontWeight.extraBold};
  margin-bottom: 1.5rem;
  line-height: 1.21875;
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
      group(field: frontmatter___category) {
        fieldValue
        totalCount
      }
      totalCount
      edges {
        node {
          id
          frontmatter {
            title
            category
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
