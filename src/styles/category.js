import styled from 'styled-components';

const Category = styled.span`
  display: block;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.gray5};
`;

export default Category;
