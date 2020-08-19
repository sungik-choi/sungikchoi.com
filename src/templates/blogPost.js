import React from 'react';
import { graphql } from 'gatsby';
import Layout from 'components/layout/layout';
import SEO from 'components/seo';

const BlogPost = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, desc, date, tag, thumbnail },
      html,
    },
  } = data;

  return (
    <Layout>
      <SEO title={title} description={desc} />
      <div>
        <h1>{title}</h1>
        <h2>{desc}</h2>
        <div dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </Layout>
  );
};

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        desc
        date
        tag
        thumbnail
      }
      excerpt
    }
  }
`;

export default BlogPost;
