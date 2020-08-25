import styled from 'styled-components';

const Markdown = styled.div`
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

  h2 {
    font-size: 24px;
    margin-bottom: ${({ rhythm }) => rhythm(1)};
    margin-top: ${({ rhythm }) => rhythm(2.25)};
  }

  h3 {
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1.5)};
  }

  h4,
  h5,
  h6 {
    margin-bottom: ${({ rhythm }) => rhythm(0.5)};
    margin-top: ${({ rhythm }) => rhythm(1)};
  }

  ul,
  ol {
    margin: ${({ rhythm }) => rhythm(1)} 0;
    margin-left: ${({ rhythm }) => rhythm(1.25)};
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
    font-size: 17px;
  }

  p {
    line-height: 1.7;
    margin-bottom: 1.5rem;
  }

  hr {
    margin: 40px 0;
    background: #d2d2d7;
  }

  blockquote {
    border-left: 0.25rem solid #dfe2e5;
    padding-left: 1rem;
    margin: 1.5rem 0;
    * {
      color: #6a737d;
    }
  }

  img {
    border-radius: ${({ theme }) => theme.borderRadius.md};
  }

  pre,
  code {
    font-family: SFMono-Regular, Consolas, Liberation Mono, Menlo, monospace;
    background-color: #f5f5f7 !important;
  }

  code {
    padding: 0.2rem 0.4rem;
    margin: 0;
    border-radius: 3px;
  }

  pre.shiki,
  pre.shiki-unknown {
    overflow: auto;
    overflow-wrap: break-word;
    padding: 1rem;
    margin: 1rem 0;
    white-space: pre-wrap;
    border-radius: 8px;
    code {
      padding: 0;
      margin: 0;
      border-radius: 0;
    }
  }
`;

export default Markdown;

//  h1: {
//       borderBottom: `1px solid ${gray(93)}`,
//       paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
//       marginBottom: rhythm(3 / 4),
//       marginTop: rhythm(1.5),
//     },
//     h2: {
//       borderBottom: `1px solid ${gray(93)}`,
//       paddingBottom: `calc(${rhythm(1 / 4)} - 1px)`,
//       marginBottom: rhythm(1 / 4),
//       marginTop: rhythm(1),
//     },
//     h6: {
//       color: gray(47),
//     },
//     "h3,h4,h5,h6": {
//       marginBottom: rhythm(1 / 2),
//       marginTop: rhythm(1),
//     },
//     "ol,ul": {
//       marginLeft: rhythm(1.25),
//     },
//     // children ol, ul
//     "li>ol,li>ul": {
//       marginLeft: rhythm(1.25),
//     },
//     a: {
//       color: "#4078c0",
//       textDecoration: "none",
//     },
//     "a:hover,a:active": {
//       textDecoration: "underline",
//     },
//     blockquote: {
//       borderLeft: `4px solid ${gray(87)}`,
//       color: gray(47),
//       marginTop: 0,
//       marginRight: 0,
//       marginLeft: 0,
//       paddingLeft: `calc(${rhythm(1 / 2)} - 1px)`,
//     },
//   }),
// }
