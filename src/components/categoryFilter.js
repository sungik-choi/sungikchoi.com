import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import kebabCase from 'lodash/kebabCase';

const CategoryFilter = ({ categoryList }) => {
  const ALL_CATEGORY_NAME = 'All';
  const isActive = ({ isCurrent }) => {
    return isCurrent ? { className: 'active' } : {};
  };

  return (
    <Nav aria-label="카테고리">
      <CategoryTitle>Category</CategoryTitle>
      <Link getProps={isActive} to="/">
        <AllCategoryButton>{ALL_CATEGORY_NAME}</AllCategoryButton>
      </Link>
      <Divider />
      <CategoryUl>
        {categoryList.map((category) => {
          const { fieldValue } = category;
          return (
            <li key={fieldValue}>
              <Link
                getProps={isActive}
                to={`/category/${kebabCase(fieldValue)}`}
              >
                <CategoryButton>{fieldValue}</CategoryButton>
              </Link>
            </li>
          );
        })}
      </CategoryUl>
    </Nav>
  );
};

const Nav = styled.nav`
  display: flex;
  align-items: center;
  background-color: white;
  margin-bottom: 3rem;
  padding: 0.75rem;
  border-radius: 8px;

  & a.active button {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.hover};
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding: 0.75rem 1.5rem;
  }
`;

const CategoryTitle = styled.em`
  font-size: 1rem;
  font-weight: bold;
  font-style: initial;
  margin-right: 40px;

  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: no-wrap;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    position: static;
    width: auto;
    height: auto;
    clip: auto;
    white-space: auto;
  }
`;

const CategoryButton = styled.button`
  cursor: pointer;
  border: none;
  background-color: ${({ theme }) => theme.color.gray1};
  padding: 8px 16px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  transition: 300ms ease;

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.hover};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.color.gray4};
`;

const AllCategoryButton = styled(CategoryButton)``;

const CategoryUl = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: scroll;
  overflow-y: hidden;

  li + li {
    margin-left: 4px;
  }
`;

export default CategoryFilter;
