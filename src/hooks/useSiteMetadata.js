import { useStaticQuery, graphql } from 'gatsby';

export const useSiteMetadata = () => {
  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            title
            description
            author
            githubLink
            utterances {
              repo
            }
            postTitle
            menuLinks {
              name
              link
            }
          }
        }
      }
    `
  );
  return site;
};
