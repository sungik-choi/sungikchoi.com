import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Card from 'components/card';
import { ThumbnailWrapper } from 'components/centeredImg';
import convertToKorDate from 'utils/convertToKorDate';

const MAX_POST_NUM = 10;

const PostGrid = ({ posts }) => {
  const [hasMore, setHasMore] = useState(false);
  const [currentList, setCurrentList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [observerLoading, setObserverLoading] = useState(false);

  const observer = useRef(null);
  const scrollEdgeRef = useRef(null);

  useEffect(() => {
    if (!posts.length || isLoading) return;
    setHasMore(posts.length > MAX_POST_NUM);
    setCurrentList([...posts.slice(0, MAX_POST_NUM)]);
    setIsLoading(true);
  }, [isLoading, posts]);

  useEffect(() => {
    const loadEdges = () => {
      const currentLength = currentList.length;
      const more = currentLength < posts.length;
      const nextEdges = more
        ? posts.slice(currentLength, currentLength + MAX_POST_NUM)
        : [];
      setHasMore(more);
      setCurrentList([...currentList, ...nextEdges]);
    };

    const scrollEdgeElem = scrollEdgeRef.current;

    const option = {
      rootMargin: '0px 0px 400px 0px',
      threshold: [0],
    };

    observer.current = new IntersectionObserver((entries) => {
      if (!hasMore) return;
      entries.forEach((entry) => {
        if (!observerLoading) {
          setObserverLoading(true);
          return;
        }
        if (entry.isIntersecting) loadEdges();
      });
    }, option);

    observer.current.observe(scrollEdgeElem);
    return () => observer.current && observer.current.disconnect();
  });

  return (
    <Grid role="list">
      {currentList.map((data) => {
        const { id, slug, title, desc, date, category, thumbnail, alt } = data;
        const korDate = convertToKorDate(date);
        const ariaLabel = `${title} - ${category} - Posted on ${korDate}`;
        return (
          <List key={id} role="listitem">
            <Link to={slug} aria-label={ariaLabel}>
              <Card
                thumbnail={thumbnail}
                alt={alt}
                category={category}
                title={title}
                desc={desc}
                date={date}
                korDate={korDate}
              />
            </Link>
          </List>
        );
      })}
      <div ref={scrollEdgeRef} />
    </Grid>
  );
};

const Grid = styled.ul`
  display: grid;
  grid-gap: var(--grid-gap-xl);
  grid-template-columns: repeat(2, 1fr);
  list-style: none;

  & > li {
    margin-bottom: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-gap: var(--grid-gap-lg);
  }
`;

const List = styled.li`
  box-sizing: border-box;
  grid-column: span 1;

  a {
    display: block;
    height: 100%;
  }

  a:hover ${ThumbnailWrapper}::after, a:focus ${ThumbnailWrapper}::after {
    opacity: 1;
  }

  & .gatsby-image-wrapper {
    transition: opacity 1s ease-out, transform 0.5s ease;
  }

  a:hover,
  a:focus {
    .gatsby-image-wrapper {
      transform: scale(1.03);
    }
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    grid-column: span 2;
  }
`;

export default PostGrid;
