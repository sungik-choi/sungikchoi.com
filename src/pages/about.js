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

  #title {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    align-content: end;
    margin-bottom: 2rem;
  }

  #time {
    font-size: var(--text-sm);
    color: var(--color-text-3);
    time {
      color: var(--color-text-3);
    }
  }

  #eng-title {
    margin-top: auto;
    margin-left: 0.5rem;
    font-size: 30px;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h2 {
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }

  li {
    line-height: 1.5;
  }

  #project {
    h3 + h3 {
      margin-top: var(--sizing-lg);
    }
  }

  #skill ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    list-style: none;
    li {
      margin-right: 6px;
      padding: var(--sizing-sm) var(--sizing-base);
      background-color: var(--color-category-button);
      border-radius: var(--border-radius-base);
      font-weight: 500;
    }

    li:last-child {
      margin-right: 0;
    }
  }

  #education {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.5rem;
    }

    h3 + p {
      margin-bottom: 0;
      font-size: 0.875rem;
    }
  }

  thead {
    position: absolute;
    width: 1px;
    height: 1px;
    overflow: hidden;
    clip: rect(1px, 1px, 1px, 1px);
    white-space: no-wrap;
  }

  tbody {
    border-top: 1px solid var(--color-gray-3);
  }

  li ul {
    margin-top: 0.435rem;
    margin-bottom: 0.435rem;
  }
`;

export default About;
