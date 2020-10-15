import React from 'react';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from 'components/layout/layout';
import SEO from 'components/seo';
import Comment from 'components/comment';
import { rhythm } from 'styles/typography';
import Category from 'styles/category';
import DateTime from 'styles/dateTime';
import Markdown from 'styles/markdown';
import convertToKorDate from 'utils/convertToKorDate';

const BlogPost = ({ data }) => {
  const {
    markdownRemark: {
      frontmatter: { title, desc, date, category },
      html,
    },
  } = data;

  const korDate = convertToKorDate(date);

  return (
    <Layout>
      <SEO title={title} description={desc} />
      <main>
        <article>
          <OuterWrapper>
            <InnerWrapper>
              <div>
                <header>
                  <Info>
                    <PostCategory>{category}</PostCategory>
                    <Time dateTime={date}>{korDate}</Time>
                  </Info>
                  <Title>{title}</Title>
                  <Desc>{desc}</Desc>
                </header>
                <Divider />
                <Markdown
                  dangerouslySetInnerHTML={{ __html: html }}
                  rhythm={rhythm}
                />
              </div>
            </InnerWrapper>
          </OuterWrapper>
        </article>
        <CommentWrap>
          <Comment />
        </CommentWrap>
      </main>
    </Layout>
  );
};

const OuterWrapper = styled.div`
  margin-top: ${({ theme }) => theme.sizing.xl};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: ${({ theme }) => theme.sizing.lg};
  }
`;

const InnerWrapper = styled.div`
  width: ${({ theme }) => theme.postWidth};
  margin: 0 auto;
  padding-bottom: ${({ theme }) => theme.sizing.lg};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 87.5%;
  }
`;

const CommentWrap = styled.section`
  width: 100%;
  padding: 0 1rem;
  margin: 0 auto;
  margin-bottom: ${({ theme }) => theme.sizing.xl};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: auto;
  }
`;

const PostCategory = styled(Category)`
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
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
  line-height: 1.5;
  font-size: ${({ theme }) => theme.text.lg};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.31579;
    font-size: 1.1875rem;
  }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${({ theme }) => theme.color.gray3};
  margin-top: ${({ theme }) => theme.sizing.lg};
  margin-bottom: ${({ theme }) => theme.sizing.lg};
`;

const Title = styled.h1`
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  line-height: 1.1875;
  font-size: ${({ theme }) => theme.text.xl};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    line-height: 1.21875;
    font-size: 2rem;
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
        category
      }
      excerpt
    }
  }
`;

export default BlogPost;
