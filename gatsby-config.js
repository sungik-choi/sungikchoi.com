/* eslint-disable no-undef */

module.exports = {
  siteMetadata: {
    title: `Sungik Choi`,
    description: `Sungik Choi's Devlog`,
    author: `Sungik Choi`,
    utterances: {
      repo: 'sungik-choi/blog-comment',
    },
    postTitle: '전체 포스트',
    menuLinks: [
      {
        link: '/',
        name: '홈',
      },
      {
        link: '/about/',
        name: '소개',
      },
      {
        link: 'https://www.github.com/sungik-choi',
        name: 'Github',
      },
    ],
  },
  plugins: [
    `gatsby-plugin-styled-components`,
    `gatsby-alias-imports`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    `gatsby-plugin-sharp`,
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/styles/typography`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-vscode`,
            options: {
              theme: {
                default: 'Github Light Theme',
                parentSelector: {
                  'body[data-theme=dark]': 'Dark Github',
                },
              },
              extensions: ['vscode-theme-github-light', 'dark-theme-github'],
            },
          },
          {
            resolve: `gatsby-remark-images`,
            options: {
              linkImagesToOriginal: false,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Sungik Choi`,
        short_name: `Sungik Choi`,
        start_url: `/`,
        background_color: `#1c1c1c`,
        theme_color: `#1c1c1c`,
        display: `standalone`,
        icon: `src/images/icon.svg`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
  ],
};
``;
