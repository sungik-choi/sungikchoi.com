import React from 'react';
import { Link } from 'gatsby';
import kebabCase from 'lodash/kebabCase';

const TagFilter = ({ tagList }) => {
  const ALL_TAG_NAME = 'All';

  return (
    <ul>
      <li key={ALL_TAG_NAME}>
        <Link to="/">{ALL_TAG_NAME}</Link>
      </li>
      {tagList.map((tag) => {
        const { fieldValue } = tag;
        return (
          <li key={fieldValue}>
            <Link to={`/tags/${kebabCase(fieldValue)}`}>{fieldValue}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default TagFilter;
