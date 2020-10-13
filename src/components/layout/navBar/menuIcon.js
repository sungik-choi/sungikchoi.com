import React from 'react';
import styled from 'styled-components';

const MenuIcon = ({ onClickHandler, toggle }) => {
  return (
    <MenuIconWrap onClick={onClickHandler} toggle={toggle}>
      <MenuIconBreadTop>
        <div />
      </MenuIconBreadTop>
      <MenuIconBreadBottom>
        <div />
      </MenuIconBreadBottom>
    </MenuIconWrap>
  );
};

const MenuIconBreadTop = styled.div`
  top: 22px;
`;

const MenuIconBreadBottom = styled.div`
  bottom: 22px;
`;

const MenuIconWrap = styled.div`
  display: block;
  cursor: pointer;
  position: absolute;
  top: 0;
  right: 0;
  width: ${({ theme }) => theme.navHeight};
  height: ${({ theme }) => theme.navHeight};
  padding-right: ${({ theme }) => theme.padding.sm};

  & > div {
    position: absolute;
    width: 18px;
    height: 1px;
    left: 35px; // 19 + 16
    opacity: 0.8;
    transition: opacity 0.3s ease,
      transform
        ${({ toggle }) => (toggle === true ? '0.2s ease' : '0.3s ease 0.2s')};
  }

  & > div > div {
    width: 100%;
    height: 100%;
    background-color: ${({ theme }) => theme.color.text};
    transition: transform
      ${({ toggle }) => (toggle === true ? '0.3s ease 0.2s' : '0.2s ease')};
  }

  ${MenuIconBreadTop} {
    transform: ${({ toggle }) =>
      toggle === false ? 'none' : 'translateY(4.5px)'};
    div {
      transform: ${({ toggle }) =>
        toggle === false ? 'none' : 'rotate(45deg)'};
    }
  }

  ${MenuIconBreadBottom} {
    transform: ${({ toggle }) =>
      toggle === false ? 'none' : 'translateY(-4.5px)'};
    div {
      transform: ${({ toggle }) =>
        toggle === false ? 'none' : 'rotate(-45deg)'};
    }
  }

  &:hover > div {
    opacity: 1;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    display: none;
  }
`;

export default MenuIcon;
