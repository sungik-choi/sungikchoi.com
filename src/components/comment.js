import React, { useRef, useContext, useEffect, useLayoutEffect } from 'react';
import { ThemeContext } from 'components/layout/layout';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

const src = 'https://utteranc.es';
const utterancesSelector = 'iframe.utterances-frame';
const LIGHT_THEME = 'github-light';
const DARK_THEME = 'github-dark';

const Comment = () => {
  const theme = useContext(ThemeContext);
  const themeMode = theme === 'light' ? LIGHT_THEME : DARK_THEME;

  const site = useSiteMetadata();
  const { repo } = site.siteMetadata.utterances;
  const containerRef = useRef(null);

  const postThemeMessage = (elem) => {
    const utterances = elem.contentWindow;
    const message = {
      type: 'set-theme',
      theme: themeMode,
    };
    utterances.postMessage(message, src);
  };

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

  useLayoutEffect(() => {
    const bSameSavedTheme = theme === localStorage.getItem('theme');
    if (!bSameSavedTheme) return;
    const utterancesEl = document.querySelector(utterancesSelector);
    if (utterancesEl) postThemeMessage(utterancesEl);
    else createUtterancesEl();
  }, [theme]);

  return <div ref={containerRef} />;
};

Comment.displayName = 'comment';

export default Comment;
