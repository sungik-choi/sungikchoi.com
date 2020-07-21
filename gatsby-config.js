/* eslint-disable no-undef */

module.exports = {
  siteMetadata: {
    title: `My Gatsby Blog GraphQL`,
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-transformer-remark`,
    `gatsby-alias-imports`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
  ],
};
