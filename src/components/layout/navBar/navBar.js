import React, { useState, useEffect, useRef, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'gatsby';
import ThemeToggleButton from './themeToggleButton/themeToggleButton';
import MenuIcon from './menuIcon';
import Background from 'styles/background';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

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
        <LinkWrap>
          <Curtain ref={curtainRef} toggle={toggle} />
          <LinkContent toggle={toggle}>
            <LinkUl>
              {menuLinks.map(({ link, name }) => (
                <li key={name}>
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
  padding: 0 ${({ theme }) => theme.padding.sm};
  height: 100%;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;

  li {
    margin: 0;
    list-style-type: none;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    padding: 0 ${({ theme }) => theme.padding.lg};
  }
`;

const Title = styled.h1`
  padding: 0;
  border: none;
  font-size: ${({ theme }) => theme.text.md};
  font-weight: ${({ theme }) => theme.fontWeight.semiBold};
  color: ${({ theme }) => theme.color.text};

  a {
    color: inherit;
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    font-size: ${({ theme }) => theme.text.title};
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
        ${({ toggle }) => (toggle ? '0.1s ease' : '0.4s ease-in-out 0.5s')};
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
  }
`;

const LinkWrap = styled.div`
  display: flex;
  align-items: center;
  align-content: center;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
  }
`;

export default NavBar;
