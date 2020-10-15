import styled from 'styled-components';

const Category = styled.span`
  display: block;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.text3};
`;

export default Category;
