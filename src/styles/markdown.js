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
    margin-bottom: ${({ rhythm }) => rhythm(0.7)}; /* 52 */
    margin-top: ${({ rhythm }) => rhythm(2.25)}; /* 16 */
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
    /* margin-left: 1.17647em; */
    margin-top: ${({ rhythm }) => rhythm(0.75)};
    margin-bottom: ${({ rhythm }) => rhythm(0.75)};
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
  }

  img {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  hr {
    margin-top: 40px;
    margin-bottom: 40px;
  }

  blockquote {
    border-left: 0.25rem solid #dfe2e5;
    padding-left: 1rem;
    margin-top: 1rem;
    margin-bottom: 1rem;
    * {
      color: #6a737d;
    }
  }

  pre,
  code {
    font-family: -apple-system-mono, monospace !important;
  }

  code {
    padding: 0.2em 0.4em;
    margin: 0;
    font-size: 85%;
    background-color: rgba(27, 31, 35, 0.05);
    border-radius: 6px;
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
