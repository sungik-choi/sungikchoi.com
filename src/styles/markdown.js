import styled from 'styled-components';

const Markdown = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  strong {
    font-weight: 600;
  }

  a,
  p {
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.hover};
    * {
      color: ${({ theme }) => theme.color.hover};
    }
    &:hover,
    &:active {
      text-decoration: underline;
    }
  }

  & > *:first-child {
    margin-top: 0;
  }

  h2 {
    font-size: 1.3125rem;
    line-height: 1.3;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(2.25)};

    @media (min-width: ${({ theme }) => theme.device.lg}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    font-size: 1.1875rem;

    @media (min-width: ${({ theme }) => theme.device.lg}) {
      font-size: 1.31951rem;
    }
  }

  h3,
  h4,
  h5,
  h6 {
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1)};
  }

  ul,
  ol {
    margin-top: ${({ rhythm }) => rhythm(1)};
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  li > ul,
  li > ol {
    margin-top: 0;
    margin-bottom: 0;
  }

  li > p {
    margin-bottom: 0;
  }

  li > ol,
  li > ul {
    margin-left: ${({ rhythm }) => rhythm(1.25)};
  }

  li {
    margin-bottom: ${({ rhythm }) => rhythm(0.3)};
  }

  p,
  li,
  blockquote {
    font-size: 1.0625rem;
  }

  p {
    line-height: 1.68;
    margin-bottom: 1.5rem;
  }

  hr {
    margin: 40px 0;
    background: ${({ theme }) => theme.color.shadow};
  }

  blockquote {
    border-left: 0.25rem solid ${({ theme }) => theme.color.gray3};
    padding-left: 1rem;
    margin: 1.5rem 0;
    * {
      color: ${({ theme }) => theme.color.gray5};
    }
  }

  img {
    display: block;
  }

  pre,
  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    background-color: ${({ theme }) => theme.color.gray2};
  }

  pre {
    border: 1px solid ${({ theme }) => theme.color.gray4};
  }

  *:not(pre) > code {
    background-color: ${({ theme }) => theme.color.gray1};
    padding: 0.2rem 0.4rem;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
  }
`;

export default Markdown;
