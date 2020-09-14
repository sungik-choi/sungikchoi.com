import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import Comment from 'components/comment';

import { rhythm } from 'styles/typography';
import Tag from 'styles/tag';
import DateTime from 'styles/dateTime';
import Markdown from 'styles/markdown';

import convertToKorDate from 'utils/convertToKorDate';

const BlogPost = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, desc, date, tag },
      html,
    },
  } = data;

  const korDate = convertToKorDate(date);

  return (
    <Layout>
      <SEO title={title} description={desc} />
      <main>
        <Section>
          <Article>
            <div>
              <Info>
                <Tag>{tag}</Tag>
                <Time dateTime={date}>{korDate}</Time>
              </Info>
              <div>
                <Title>{title}</Title>
              </div>
              <div>
                <Desc>{desc}</Desc>
              </div>
              <Divider />
              <Markdown
                dangerouslySetInnerHTML={{ __html: html }}
                rhythm={rhythm}
              />
            </div>
          </Article>
        </Section>
        <CommentWrap>
          <Comment repo="sungik-choi/blog-comment" />
        </CommentWrap>
      </main>
    </Layout>
  );
};

const Section = styled.section`
  margin-top: ${({ theme }) => theme.sizing.lg};

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    margin-top: ${({ theme }) => theme.sizing.xl};
  }
`;

const Article = styled.article`
  width: 87.5%;
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.sizing.lg};

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    width: ${({ theme }) => theme.postWidth};
  }
`;

const CommentWrap = styled.div`
  padding: 0 1rem;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.sizing.xl};

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    width: 100%;
  }
`;

const Info = styled.div`
  margin-bottom: ${({ theme }) => theme.sizing.md};
`;

const Time = styled(DateTime)`
  display: block;
  margin-top: ${({ theme }) => theme.sizing.xs};
`;

const Desc = styled.p`
  margin-top: ${({ theme }) => theme.sizing.lg};
  line-height: 1.31579;
  font-size: 1.1875rem;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    line-height: 1.5;
    font-size: ${({ theme }) => theme.text.lg};
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.shadow};
  margin-top: ${({ theme }) => theme.sizing.lg};
  margin-bottom: ${({ theme }) => theme.sizing.lg};
`;

const Title = styled.h1`
  line-height: 1.21875;
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  font-size: 2rem;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    line-height: 1.1875;
    font-size: ${({ theme }) => theme.text.xl};
  }
`;

export const query = graphql`
  query($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        desc
        date(formatString: "YYYY-MM-DD")
        tag
      }
      excerpt
    }
  }
`;

export default BlogPost;
