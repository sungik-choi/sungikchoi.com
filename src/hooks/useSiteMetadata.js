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
              theme
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
