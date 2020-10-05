import React, { useRef, useLayoutEffect } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import kebabCase from 'lodash/kebabCase';
import { ACTIVE } from 'constants/constants';

const CategoryFilter = ({ categoryList }) => {
  const categoryRef = useRef(null);
  const ALL_CATEGORY_NAME = 'All';
  const isActive = ({ isCurrent }) => (isCurrent ? { id: ACTIVE } : {});

  useLayoutEffect(() => {
    if (!categoryRef) return;
    const categoryWrapEl = categoryRef.current;
    const isScrollActivated =
      categoryWrapEl.scrollWidth >= categoryWrapEl.offsetWidth;
    if (!isScrollActivated) return;
    const activeCategoryEl = document.querySelector(`#${ACTIVE}`);
    const offsetX = activeCategoryEl.offsetLeft - categoryWrapEl.offsetLeft;
    categoryWrapEl.scrollTo(
      offsetX -
        categoryWrapEl.offsetWidth / 2 +
        activeCategoryEl.offsetWidth / 2,
      0
    );
  }, []);

  return (
    <Nav aria-label="Category Filter">
      <CategoryTitle className="visually-hidden">Category</CategoryTitle>
      <CategoryButton getProps={isActive} to="/">
        {ALL_CATEGORY_NAME}
      </CategoryButton>
      <Divider />
      <CategoryUl ref={categoryRef} className="invisible-scrollbar">
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
`;

const CategoryButton = styled(Link)`
  cursor: pointer;
  display: block;
  background-color: ${({ theme }) => theme.color.categoryButton};
  padding: ${({ theme }) => theme.sizing.sm} ${({ theme }) => theme.sizing.base};
  border-radius: ${({ theme }) => theme.borderRadius.base};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};

  :focus {
    outline: none;
  }

  &:hover,
  &:focus {
    color: ${({ theme }) => theme.color.white};
    background-color: ${({ theme }) => theme.color.blue};
  }
`;

const Divider = styled.div`
  width: 1px;
  height: 2rem;
  margin: 0 ${({ theme }) => theme.sizing.sm};
  transform: translateX(-50%);
  background-color: ${({ theme }) => theme.color.divider};
`;

const CategoryUl = styled.ul`
  display: flex;
  list-style: none;
  overflow-x: scroll;
  -ms-overflow-style: none;
  scrollbar-width: none;

  li + li {
    margin-left: 6px;
  }
`;

export default CategoryFilter;
