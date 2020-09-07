import styled from 'styled-components';

const DateTime = styled.time`
  margin-top: ${({ theme }) => theme.sizing.md};
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.gray5};
`;

export default DateTime;
