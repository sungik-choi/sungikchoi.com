import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SEO from 'components/seo';
import Layout from 'components/layout/layout';
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
  margin-top: var(--sizing-xl);
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-lg);
    width: 87.5%;
  }

  h1 {
    margin-top: 1rem;
    margin-bottom: 2rem;
  }
`;

export default About;
