import React, { useState, useLayoutEffect } from 'react';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import CategoryFilter from 'components/categoryFilter';
import Card from 'components/card';
import { ThumbnailWrapper } from 'components/centeredImg';
import { useSiteMetadata } from 'hooks/useSiteMetadata';
import convertToKorDate from 'utils/convertToKorDate';

const Home = ({ pageContext, data }) => {
  const [post, setPost] = useState([]);
  const currentCategory = pageContext.category;
  const postData = data.allMarkdownRemark.edges;

  useLayoutEffect(() => {
    const filteredPostData = currentCategory
      ? postData.filter(
          ({ node }) => node.frontmatter.category === currentCategory
        )
      : postData;

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
        { id, slug, title, desc, date, category, thumbnail: base, alt },
      ]);
    });
  }, [currentCategory, postData]);

  const site = useSiteMetadata();
  const postTitle = currentCategory || site.siteMetadata.postTitle;

  return (
    <Layout>
      <SEO title="Home" />
      <Main>
        <Content>
          <CategoryFilter categoryList={data.allMarkdownRemark.group} />
          <PostTitle>{postTitle}</PostTitle>
          <Grid role="list">
            {post.map((data) => {
              const {
                id,
                slug,
                title,
                desc,
                date,
                category,
                thumbnail,
                alt,
              } = data;
              const korDate = convertToKorDate(date);
              const ariaLabel = `${title} - ${category} - Posted on ${korDate}`;
              return (
                <List key={id} role="listitem">
                  <Link to={slug} aria-label={ariaLabel}>
                    <Card
                      thumbnail={thumbnail}
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
  min-width: var(--min-width);
  min-height: calc(100vh - var(--nav-height) - var(--footer-height));
  background-color: var(--color-background);
`;

const Content = styled.div`
  box-sizing: content-box;
  width: 87.5%;
  max-width: var(--width);
  padding-top: var(--sizing-lg);
  margin: 0 auto;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding-top: var(--grid-gap-lg);
    width: 87.5%;
  }
`;

const PostTitle = styled.h2`
  font-size: 2rem;
  font-weight: var(--font-weight-extra-bold);
  margin-bottom: var(--sizing-md);
  line-height: 1.21875;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: 1.75rem;
  }
`;

const Grid = styled.ul`
  display: grid;
  grid-gap: var(--grid-gap-xl);
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-gap: var(--grid-gap-lg);
  }
`;

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 1;

  a {
    display: block;
    height: 100%;
  }

  a:hover ${ThumbnailWrapper}::after, a:focus ${ThumbnailWrapper}::after {
    opacity: 1;
  }

  & .gatsby-image-wrapper {
    transition: opacity 1s ease-out, transform 0.5s ease;
  }

  a:hover,
  a:focus {
    .gatsby-image-wrapper {
      transform: scale(1.03);
    }
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-column: span 2;
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
        }
      }
    }
  }
`;

export default Home;
