import styled from 'styled-components';

const Markdown = styled.article`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: ${({ theme }) => theme.fontWeight.bold};
  }

  td,
  th {
    border-bottom: 1px solid ${({ theme }) => theme.color.gray3};
  }

  strong {
    font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  }

  a,
  p {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }

  a {
    text-decoration: none;
    color: ${({ theme }) => theme.color.blue} !important;
    * {
      color: ${({ theme }) => theme.color.blue} !important;
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
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(1.5)};

    @media (min-width: ${({ theme }) => theme.device.lg}) {
      font-size: 1.31951rem;
    }
  }

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
    margin-bottom: ${({ theme }) => theme.sizing.md};
  }

  hr {
    margin: ${({ theme }) => theme.sizing.lg} 0;
    background: ${({ theme }) => theme.color.gray3};
  }

  blockquote {
    border-left: 0.25rem solid ${({ theme }) => theme.color.gray2};
    padding-left: ${({ theme }) => theme.sizing.base};
    margin: ${({ theme }) => theme.sizing.md} 0;
    * {
      color: ${({ theme }) => theme.color.gray6};
    }
  }

  img {
    display: block;
  }

  pre,
  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    background-color: ${({ theme }) => theme.color.codeBlock};
  }

  pre {
    border: 1px solid ${({ theme }) => theme.color.gray3};
  }

  pre.grvsc-container {
    margin: ${({ theme }) => theme.sizing.md} 0;
  }

  .grvsc-line-highlighted::before {
    background-color: ${({ theme }) => theme.color.codeHighlight} !important;
    box-shadow: inset 4px 0 0 0
      ${({ theme }) => theme.color.codeHighlightBorder} !important;
  }

  *:not(pre) > code {
    background-color: ${({ theme }) => theme.color.code};
    padding: 0.2rem 0.4rem;
    margin: 0;
    font-size: 85%;
    border-radius: 3px;
  }
`;

export default Markdown;
