import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SEO from 'components/seo';
import Layout from 'layout/layout';
import Markdown from 'styles/markdown';
import { rhythm } from 'styles/typography';

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `);

  const md = data.allMarkdownRemark.edges[0].node.html;

  return (
    <Layout>
      <SEO title="About" />
      <Container
        dangerouslySetInnerHTML={{ __html: md }}
        rhythm={rhythm}
      ></Container>
    </Layout>
  );
};

const Container = styled(Markdown).attrs({
  as: 'main',
})`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }

  h1,
  h2 {
    font-weight: var(--font-weight-extra-bold);
  }

  h1 {
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
  }

  h2 {
    letter-spacing: -0.02em;
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    letter-spacing: -0.02em;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }

  li {
    line-height: 1.5;
  }

  #title {
    margin-bottom: 2rem;
  }

  #eng-title {
    font-weight: var(--font-weight-bold);
    font-size: var(--text-title);
  }

  #project,
  #education,
  #career {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }
  }

  .datetime {
    color: var(--color-text-3);
    font-weight: var(--font-weight-semi-bold);
    font-size: 0.875rem;
  }

  li ul {
    margin-top: 0.435rem;
    margin-bottom: 0.435rem;
  }

  .contacts {
    display: flex;
    margin: 0;
    line-height: 0;
    list-style: none;
  }

  .contact {
    flex: 0 0 auto;
    cursor: pointer;
    margin: 0;
    line-height: 0;

    &:hover {
      path {
        color: var(--color-blue) !important;
      }
    }

    path {
      transition: color 150ms ease-in-out;
      color: var(--color-text-3) !important;
    }
  }

  .footnotes {
    * {
      font-size: 0.875rem;
    }

    p,
    .footnote-backref {
      display: inline;
    }
  }
`;

export default About;
