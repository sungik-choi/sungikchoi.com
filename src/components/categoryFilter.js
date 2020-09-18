import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import kebabCase from 'lodash/kebabCase';

const CategoryFilter = ({ categoryList }) => {
  const ALL_TAG_NAME = 'All';

  return (
    <CategoryUl>
      <li key={ALL_TAG_NAME}>
        <Link to="/">{ALL_TAG_NAME}</Link>
      </li>
      {categoryList.map((tag) => {
        const { fieldValue } = tag;
        return (
          <li key={fieldValue}>
            <Link to={`/category/${kebabCase(fieldValue)}`}>{fieldValue}</Link>
          </li>
        );
      })}
    </CategoryUl>
  );
};

const CategoryUl = styled.ul`
  list-style: none;
`;

export default CategoryFilter;
