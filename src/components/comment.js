import React, { useRef, useContext, useEffect } from 'react';
import { ThemeContext } from 'styled-components';
import { useSiteMetadata } from 'hooks/useSiteMetadata';
import { LIGHT } from 'constants/constants';

const src = 'https://utteranc.es';
const utterancesSelector = 'iframe.utterances-frame';
const LIGHT_THEME = 'github-light';
const DARK_THEME = 'github-dark';

const Comment = () => {
  const { theme } = useContext(ThemeContext);
  const themeMode = theme === LIGHT ? LIGHT_THEME : DARK_THEME;

  const site = useSiteMetadata();
  const { repo } = site.siteMetadata.utterances;
  const containerRef = useRef(null);

  useEffect(() => {
    const createUtterancesEl = () => {
      const comment = document.createElement('script');
      const attributes = {
        src: `${src}/client.js`,
        repo,
        'issue-term': 'title',
        label: 'comment',
        theme: themeMode,
        crossOrigin: 'anonymous',
        async: 'true',
      };
      Object.entries(attributes).forEach(([key, value]) => {
        comment.setAttribute(key, value);
      });
      containerRef.current.appendChild(comment);
    };

    const postThemeMessage = (elem) => {
      const utterances = elem.contentWindow;
      const message = {
        type: 'set-theme',
        theme: themeMode,
      };
      utterances.postMessage(message, src);
    };

    const utterancesEl = document.querySelector(utterancesSelector);
    utterancesEl ? postThemeMessage(utterancesEl) : createUtterancesEl();
  });

  return <div ref={containerRef} />;
};

Comment.displayName = 'comment';

export default Comment;
