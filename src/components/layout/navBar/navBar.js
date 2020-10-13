import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { css, ThemeContext } from 'styled-components';
import { Link } from 'gatsby';
import ThemeToggleButton from './themeToggleButton/themeToggleButton';
import MenuIcon from './menuIcon';
import Background from 'styles/background';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

// ! 메뉴 등장 시 스크롤 막기
// ! 메뉴 등장 시 키보드 포커스가 메뉴 안으로만 향하도록 변경

const NavBar = ({ title, themeToggler }) => {
  const site = useSiteMetadata();
  const { menuLinks, githubLink } = site.siteMetadata;

  const [toggle, setToggle] = useState(false);
  const { device } = useContext(ThemeContext);
  const curtainRef = useRef(null);

  const onClickHandler = () =>
    toggle === true ? setToggle(false) : setToggle(true);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${device.sm})`);
    const hideCurtainAnimation = () => {
      curtainRef.current.style.display = 'none';
      setTimeout(() => {
        curtainRef.current.style.display = 'block';
      }, 500);
    };
    const setToggleFalse = (e) => {
      if (e.matches) {
        hideCurtainAnimation();
        return;
      }
      setToggle(false);
    };
    mql.addEventListener('change', setToggleFalse);
    return () => mql.removeEventListener('change', setToggleFalse);
  });

  return (
    <Nav aria-label="Global Navigation">
      <NavBackground toggle={toggle} />
      <Content>
        <Title onClick={() => setToggle(false)}>
          <Link to="/">{title}</Link>
        </Title>
        <LinkWrap toggle={toggle}>
          <Curtain ref={curtainRef} toggle={toggle} />
          <LinkContent toggle={toggle}>
            <LinkUl toggle={toggle}>
              {menuLinks.map(({ link, name }) => (
                <li key={name} onClick={() => link === '/' && setToggle(false)}>
                  <Link to={link}>{name}</Link>
                </li>
              ))}
              <li>
                <a target="_blank" rel="noreferrer" href={githubLink}>
                  Github
                </a>
              </li>
              <li>
                <ThemeToggleButton themeToggler={themeToggler} />
              </li>
            </LinkUl>
          </LinkContent>
          <MenuIcon onClickHandler={onClickHandler} toggle={toggle} />
        </LinkWrap>
      </Content>
    </Nav>
  );
};

const Nav = styled.nav`
  min-width: ${({ theme }) => theme.minWidth};
  position: sticky;
  overflow-x: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: ${({ theme }) => theme.navHeight};
  z-index: 10;

  a:hover {
    text-decoration: none;
  }
`;

const Content = styled.div`
  box-sizing: content-box;
  position: relative;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.width};
  padding: 0 ${({ theme }) => theme.padding.lg};
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    margin: 0;
    list-style-type: none;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    padding: 0 ${({ theme }) => theme.padding.sm};
  }
`;

const Title = styled.h1`
  z-index: 9999;
  padding: 0;
  border: none;
  font-size: ${({ theme }) => theme.text.title};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.text};

  a {
    color: inherit;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    font-size: ${({ theme }) => theme.text.md};
  }
`;

const LinkUl = styled.ul`
  display: flex;

  a {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }

  a:hover {
    color: ${({ theme }) => theme.color.blue};
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 2rem;
  }

  li:first-child,
  li:last-child {
    margin-left: 0;
  }

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    flex-direction: column;
    padding-left: ${({ theme }) => theme.sizing.lg};

    li {
      display: block;
      margin-left: 0;
      font-size: ${({ theme }) => theme.text.md};

      a {
        display: block;
        ${({ toggle, theme }) =>
          toggle && `width: calc(100vw - ${theme.sizing.lg} * 2)`};
        height: 100%;
        padding: 0.5rem 0;
        font-weight: 500;
      }
    }

    li + li::before {
      content: '';
      display: block;
      position: absolute;
      ${({ theme }) => `width: calc(100vw - ${theme.sizing.lg} * 2)`};
      height: 1px;
      transform: translateY(-2px);
      background-color: ${({ theme }) => theme.color.divider};
    }
  }
`;

const NavBackground = styled(Background)`
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    &::after {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.postBackground};
      transition: opacity
        ${({ toggle }) => (toggle ? '0.1s ease' : '0.4s ease-in-out 0.48s')};
      opacity: ${({ toggle }) => (toggle ? '1' : '0')};
    }
  }
`;

const Curtain = styled.div`
  visibility: hidden;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    visibility: visible;
    position: fixed;
    ${({ theme }) => `top: calc(${theme.navHeight} - 1px)`};
    left: 0;
    width: 100%;
    ${({ theme }) => `height: calc(100% - ${theme.navHeight} + 1px)`};
    background-color: ${({ theme }) => theme.color.postBackground};
    transition: transform 0.6s cubic-bezier(0.41, 0.06, 0.05, 1) 0.1s;
    transform: ${({ toggle }) => (toggle ? 'scaleY(1)' : 'scaleY(0)')};
    transform-origin: top;
  }
`;

const LinkContent = styled.div`
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    visibility: ${({ toggle }) => (toggle ? 'visible' : 'hidden')};
    z-index: 200;
  }
`;

const LinkWrap = styled.div`
  display: flex;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    ${({ toggle }) =>
      toggle &&
      css`
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        ${({ theme }) =>
          `padding-top: calc(${theme.navHeight} + ${theme.sizing.lg})`};
      `}
  }
`;

export default NavBar;
