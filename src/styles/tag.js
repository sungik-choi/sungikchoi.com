import styled from 'styled-components';

const Tag = styled.span`
  display: block;
  font-size: ${({ theme }) => theme.text.sm};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.pink};
`;

export default Tag;
