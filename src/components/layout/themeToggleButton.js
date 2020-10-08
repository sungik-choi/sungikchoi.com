import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import { Background } from './navBar';
import ThemeIcon from './themeIcon';
import { DARK } from 'constants/constants';

const ThemeToggleButton = ({ themeToggler }) => {
  const { theme } = useContext(ThemeContext);
  const LABEL_TEXT = theme === DARK ? '라이트 모드로 보기' : '다크 모드로 보기';

  return (
    <Button onClick={themeToggler}>
      <ButtonBackground />
      <Content>
        <Icon version="1.1" x="0px" y="0px" viewBox="0 0 24 24">
          <ThemeIcon theme={theme} />
        </Icon>
        <Text className="visually-hidden">{LABEL_TEXT}</Text>
      </Content>
    </Button>
  );
};

const Icon = styled.svg`
  width: 1.5rem;
  height: 1.5rem;
  fill: ${({ theme }) => theme.color.icon};
  transform: translate(2px, -1px);
  @media (min-width: ${({ theme }) => theme.device.lg}) {
    width: 1.125rem;
    height: 1.125rem;
    transform: translate(0, -1px);
  }
`;

const ButtonBackground = styled(Background)`
  border-radius: 50%;
  border: none;
  background-color: ${({ theme }) => theme.color.floatingButton};
  box-shadow: 0 3px 15px ${({ theme }) => theme.color.floatingButtonShadow};

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const Content = styled.div`
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const Text = styled.span`
  color: ${({ theme }) => theme.color.floatingButtonText};
  margin-left: 0.375rem;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    position: static !important;
    width: auto !important;
    height: auto !important;
    clip: auto !important;
    white-space: auto !important;
  }
`;

const Button = styled.button`
  cursor: pointer;
  box-sizing: border-box;
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  z-index: 100;
  right: ${({ theme }) => theme.sizing.md};
  bottom: ${({ theme }) => theme.sizing.md};
  padding: ${({ theme }) => theme.sizing.base};
  padding-right: 1.25rem;
  border: 1px solid ${({ theme }) => theme.color.floatingButtonBorder};
  border-radius: 50%;

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }

  &:hover {
    outline: none;
    border: 1px solid ${({ theme }) => theme.color.floatingButtonBorderHover};

    ${Icon}, ${Text} {
      color: ${({ theme }) => theme.color.floatingButtonTextHover};
      fill: ${({ theme }) => theme.color.floatingButtonTextHover};
    }

    ${ButtonBackground} {
      background-color: ${({ theme }) => theme.color.floatingButtonHover};
      box-shadow: 0 3px 15px
        ${({ theme }) => theme.color.floatingButtonShadowHover};
    }
  }
`;

export default ThemeToggleButton;
