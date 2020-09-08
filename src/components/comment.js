import React, { createRef, useLayoutEffect } from 'react';

const src = 'https://utteranc.es/client.js';

const Comment = () => {
  const containerRef = createRef();

  useLayoutEffect(() => {
    const comment = document.createElement('script');

    const attributes = {
      src,
      repo: 'sungik-choi/blog-comment',
      'issue-term': 'pathname',
      label: 'comment',
      theme: 'preferred-color-scheme',
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
