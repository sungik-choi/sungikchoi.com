/* eslint-disable no-undef */

module.exports = {
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
