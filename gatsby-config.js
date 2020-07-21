/* eslint-disable no-undef */

module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog GraphQL`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-alias-imports`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
  ],
};
