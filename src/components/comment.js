import React, { createRef, useLayoutEffect } from 'react';
import { useStaticQuery, graphql } from 'gatsby';

const src = 'https://utteranc.es/client.js';

const Comment = () => {
  const containerRef = createRef();

  const data = useStaticQuery(
    graphql`
      query {
        site(comment: {}) {
          id
          comment {
            enable
            repo
            theme
          }
        }
      }
    `
  );

  const { enable, repo, theme } = data.site.comment;

  useLayoutEffect(() => {
    if (!enable) return;

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
