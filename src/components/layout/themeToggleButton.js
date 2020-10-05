import React from 'react';
import styled from 'styled-components';

const ThemeToggleButton = ({ clickHandler }) => {
  return <ToggleButton onClick={clickHandler}>테마변경</ToggleButton>;
};

const ToggleButton = styled.button`
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 1000;
`;

export default ThemeToggleButton;
