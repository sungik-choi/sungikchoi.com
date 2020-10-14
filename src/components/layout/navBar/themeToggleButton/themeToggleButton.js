import React, { useContext } from 'react';
import { ThemeContext } from 'styled-components';
import styled from 'styled-components';
import ThemeIcon from './themeIcon';
import Background from 'styles/background';
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
        <Text>{LABEL_TEXT}</Text>
      </Content>
    </Button>
  );
};

const Icon = styled.svg`
  width: 1.125rem;
  height: 1.125rem;
  fill: ${({ theme }) => theme.color.icon};
  transform: translateY(-1px);

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 0;
    height: 1rem;
    transition: width 0.3s ease;
  }
`;

const ButtonBackground = styled(Background)`
  border: none;
  background-color: ${({ theme }) => theme.color.floatingButton};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  box-shadow: 0 3px 15px ${({ theme }) => theme.color.floatingButtonShadow};

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    visibility: hidden;
    background-color: transparent;
    border-radius: 0;
    box-shadow: none;
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

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    color: ${({ theme }) => theme.color.text};
    margin-left: 0;
    font-weight: 500;
    border-radius: 50%;
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
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  font-weight: 500;

  @media (min-width: ${({ theme }) => theme.device.sm}) {
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
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    justify-content: start;
    position: static;
    border-radius: 0;
    border: none;
    width: 100%;
    padding: 0.5rem 0;

    &:hover,
    &:focus {
      ${Icon}, ${Text} {
        fill: ${({ theme }) => theme.color.blue};
        color: ${({ theme }) => theme.color.blue};
      }
      ${Icon} {
        width: 1rem;
        margin-right: 4px;
      }
    }
  }
`;

export default ThemeToggleButton;
