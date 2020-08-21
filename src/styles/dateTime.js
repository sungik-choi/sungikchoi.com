import styled from 'styled-components';

const DateTime = styled.time`
  margin-top: ${({ theme }) => theme.sizing.md};
  font-size: ${({ theme }) => theme.text.sm};
  color: ${({ theme }) => theme.color.gray2};
`;

export default DateTime;
