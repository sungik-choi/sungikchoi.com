import styled from 'styled-components';

const DateTime = styled.time`
  margin-top: ${({ theme }) => theme.sizing.md};
  font-size: ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.color.gray6};
`;

export default DateTime;
