import React, { useEffect, useContext } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import styled from 'styled-components';
import SEO from 'components/seo';
import Layout from 'layout/layout';
import ThemeContext from 'store/themeContext';
import Markdown from 'styles/markdown';
import { rhythm } from 'styles/typography';

function initializeChannelIO() {
  (function () {
    var w = window;
    if (w.ChannelIO) {
      return w.console.error('ChannelIO script included twice.');
    }
    var ch = function () {
      ch.c(arguments);
    };
    ch.q = [];
    ch.c = function (args) {
      ch.q.push(args);
    };
    w.ChannelIO = ch;
    function l() {
      if (w.ChannelIOInitialized) {
        return;
      }
      w.ChannelIOInitialized = true;
      var s = document.createElement('script');
      s.type = 'text/javascript';
      s.async = true;
      s.src = 'https://cdn.channel.io/plugin/ch-plugin-web.js';
      var x = document.getElementsByTagName('script')[0];
      if (x.parentNode) {
        x.parentNode.insertBefore(s, x);
      }
    }
    if (document.readyState === 'complete') {
      l();
    } else {
      w.addEventListener('DOMContentLoaded', l);
      w.addEventListener('load', l);
    }
  })();

  window.ChannelIO('boot', {
    // eslint-disable-next-line no-undef
    pluginKey: process.env.CHANNEL_PLUGIN_KEY,
  });

  return () => {
    window.ChannelIO('shutdown');
  };
}

function setAppearanceOfChannelIO(theme) {
  if (!window.ChannelIO) {
    return;
  }
  window.ChannelIO('setAppearance', theme);
}

const ChannelIO = () => {
  const theme = useContext(ThemeContext);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    return initializeChannelIO();
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    setAppearanceOfChannelIO(theme);
  }, [theme]);

  return null;
};

const About = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(filter: { fileAbsolutePath: { regex: "/about/" } }) {
        edges {
          node {
            html
          }
        }
      }
    }
  `);

  const md = data.allMarkdownRemark.edges[0].node.html;

  return (
    <Layout>
      <SEO title="About" />
      <ChannelIO />
      <Container
        dangerouslySetInnerHTML={{ __html: md }}
        rhythm={rhythm}
      ></Container>
    </Layout>
  );
};

const Container = styled(Markdown).attrs({
  as: 'main',
})`
  width: var(--post-width);
  margin: 0 auto;
  margin-top: 80px;
  margin-bottom: 6rem;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    margin-top: var(--sizing-xl);
    width: 87.5%;
  }

  h1,
  h2,
  h3,
  h4 {
    font-weight: var(--font-weight-extra-bold);
  }

  h1 {
    letter-spacing: -0.02em;
    margin-bottom: 0.5rem;
  }

  h2 {
    letter-spacing: -0.02em;
    margin-top: var(--sizing-lg);

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.75rem;
    }
  }

  h3 {
    letter-spacing: -0.02em;

    @media (max-width: ${({ theme }) => theme.device.sm}) {
      font-size: 1.25rem;
    }
  }

  h4 {
    font-size: var(--text-md);
    margin-top: 2rem;
  }

  li {
    line-height: 1.5;
  }

  #title {
    margin-bottom: 2rem;
  }

  #eng-title {
    font-weight: var(--font-weight-bold);
    font-size: var(--text-title);
  }

  #project,
  #education,
  #career {
    h3 {
      font-size: 1.25rem;
      margin-bottom: 0.3rem;
    }
  }

  .datetime {
    color: var(--color-text-3);
    font-weight: var(--font-weight-semi-bold);
    font-size: 0.875rem;
  }

  li ul {
    margin-top: 0.435rem;
    margin-bottom: 0.435rem;
  }

  .contacts {
    display: flex;
    margin: 0;
    line-height: 0;
    list-style: none;

    li {
      flex: 0 0 auto;
      margin: 0;
      line-height: 0;
    }
  }

  .contact {
    cursor: pointer;
    display: block;
    padding: 8px;

    &:hover,
    &:focus {
      path {
        color: var(--color-blue) !important;
      }
    }

    path {
      transition: color 150ms ease-in-out;
      color: var(--color-text-3) !important;
    }
  }

  #skill ul {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    margin: 0;
    list-style: none;
    li {
      margin-right: 6px;
      padding: var(--sizing-sm) var(--sizing-base);
      background-color: var(--color-category-button);
      border-radius: var(--border-radius-base);
      font-weight: 500;
      @media (max-width: ${({ theme }) => theme.device.sm}) {
        font-size: var(--text-base);
        padding: 6px 12px;
      }
    }
    li:last-child {
      margin-right: 0;
    }
  }

  .footnotes {
    * {
      font-size: 0.875rem;
    }

    li,
    p {
      color: var(--color-text-3);
    }

    p,
    .footnote-backref {
      display: inline;
    }
  }
`;

export default About;
