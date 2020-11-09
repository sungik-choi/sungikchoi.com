import { useState, useLayoutEffect } from 'react';

const usePosts = (data, pageContext) => {
  const [posts, setPosts] = useState([]);
  const currentCategory = pageContext.category;
  const postData = data.allMarkdownRemark.edges;

  useLayoutEffect(() => {
    const filteredPostData = currentCategory
      ? postData.filter(
          ({ node }) => node.frontmatter.category === currentCategory
        )
      : postData;

    filteredPostData.forEach(({ node }) => {
      const {
        id,
        fields: { slug },
        frontmatter: {
          title,
          desc,
          date,
          category,
          thumbnail: { childImageSharp },
          alt,
        },
      } = node;

      setPosts((prevPost) => [
        ...prevPost,
        {
          id,
          slug,
          title,
          desc,
          date,
          category,
          thumbnail: childImageSharp.id,
          alt,
        },
      ]);
    });
  }, [currentCategory, postData]);

  return { posts, currentCategory };
};

export default usePosts;
