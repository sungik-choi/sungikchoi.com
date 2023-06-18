import React, { useContext, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import ThemeContext from 'store/themeContext';
import useSiteMetadata from 'hooks/useSiteMetadata';
import defaultOpenGraphImage from '../images/og-default.png';

const SEO = ({ description = '', meta = [], image = null, title }) => {
  const site = useSiteMetadata();
  const metaDescription = description || site.siteMetadata.description;
  const ogImageUrl =
    site.siteMetadata.siteUrl + (image || defaultOpenGraphImage);

  const theme = useContext(ThemeContext);

  const themeColor = useMemo(
    () => {
      if (typeof window === 'undefined') {
        return '#FFFFFF';
      }

      return window
        .getComputedStyle(document.body)
        .getPropertyValue('--color-theme-color');
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [theme]
  );

  return (
    <Helmet
      htmlAttributes={{
        lang: site.siteMetadata.lang,
      }}
      title={title}
      titleTemplate={`%s | ${site.siteMetadata.title}`}
      meta={[
        {
          name: 'description',
          content: metaDescription,
        },
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: metaDescription,
        },
        {
          property: 'og:type',
          content: 'website',
        },
        {
          name: 'twitter:card',
          content: 'summary',
        },
        {
          name: 'twitter:creator',
          content: site.siteMetadata.author,
        },
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: metaDescription,
        },
        {
          property: 'image',
          content: ogImageUrl,
        },
        {
          property: 'og:image',
          content: ogImageUrl,
        },
        {
          property: 'twitter:image',
          content: ogImageUrl,
        },
        {
          property: 'theme-color',
          content: themeColor,
        },
      ].concat(meta)}
    />
  );
};

export default SEO;
