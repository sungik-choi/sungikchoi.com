import styled from 'styled-components';

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: ${({ theme }) => theme.color.navBar};
  border-bottom: 1px solid ${({ theme }) => theme.color.navBorder};
`;

export default Background;
