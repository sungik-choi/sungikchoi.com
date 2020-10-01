import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';

const CategoryFilter = ({ categoryList }) => {
  const ALL_CATEGORY_NAME = 'All';
  const isActive = ({ isCurrent }) => (isCurrent ? { id: 'active' } : {});

  return (
    <Nav aria-label="Category Filter">
      <CategoryTitle>Category</CategoryTitle>
      <CategoryButton getProps={isActive} to="/">
        {ALL_CATEGORY_NAME}
      </CategoryButton>
      <Divider />
      <CategoryUl>
        {categoryList.map((category) => {
          const { fieldValue } = category;
          return (
            <li key={fieldValue}>
              <CategoryButton
                getProps={isActive}
                to={`/category/${kebabCase(fieldValue)}/`}
              >
                {fieldValue}
              </CategoryButton>
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
  background-color: ${({ theme }) => theme.color.card};
  margin-bottom: 3rem;
  padding: 0.75rem;
  border-radius: ${({ theme }) => theme.borderRadius.base};

  a#active {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.blue};
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding: 0.75rem 1.5rem;
  }
`;

const CategoryTitle = styled.em`
  font-size: ${({ theme }) => theme.text.base};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  font-style: initial;
  margin-right: ${({ theme }) => theme.sizing.lg};

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

const CategoryButton = styled(Link)`
  cursor: pointer;
  display: block;
  text-decoration: none;
  border: none;
  background-color: ${({ theme }) => theme.color.categoryButton};
  padding: ${({ theme }) => theme.sizing.sm} ${({ theme }) => theme.sizing.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  &:hover {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.blue};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  margin: 0 0.5rem;
  background-color: ${({ theme }) => theme.color.divider};
`;

const CategoryUl = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: scroll;

  li + li {
    margin-left: 6px;
  }
`;

export default CategoryFilter;
