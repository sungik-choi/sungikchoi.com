import styled from 'styled-components';

const DateTime = styled.time`
  margin-top: 0.75rem;
  font-size: 0.875rem;
  font-weight: ${({ theme }) => theme.fontWeight.regular};
  color: ${({ theme }) => theme.color.text3};
`;

export default DateTime;
