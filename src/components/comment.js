import React, { createRef, useLayoutEffect } from 'react';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

const src = 'https://utteranc.es/client.js';

const Comment = () => {
  const site = useSiteMetadata();
  const { repo, theme } = site.siteMetadata.utterances;
  const containerRef = createRef();

  useLayoutEffect(() => {
    const comment = document.createElement('script');

    const attributes = {
      src,
      repo,
      'issue-term': 'pathname',
      label: 'comment',
      theme,
      crossOrigin: 'anonymous',
      async: 'true',
    };

    Object.entries(attributes).forEach(([key, value]) => {
      comment.setAttribute(key, value);
    });

    containerRef.current.appendChild(comment);
  }, []);

  return <div ref={containerRef} />;
};

Comment.displayName = 'comment';

export default Comment;
