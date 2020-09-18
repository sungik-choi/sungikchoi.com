import styled from 'styled-components';

const Category = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.text.sm};
  font-weight: ${({ theme }) => theme.fontWeight.bold};
  color: ${({ theme }) => theme.color.pink};
`;

export default Category;
