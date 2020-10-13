import React, { useState, useEffect, useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'gatsby';
import ThemeToggleButton from './themeToggleButton/themeToggleButton';
import MenuIcon from './menuIcon';
import Background from 'styles/background';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

const NavBar = ({ title, themeToggler }) => {
  const theme = useContext(ThemeContext);
  const site = useSiteMetadata();
  const { menuLinks, githubLink } = site.siteMetadata;

  const [toggle, setToggle] = useState(false);
  const onClickHandler = () =>
    toggle === true ? setToggle(false) : setToggle(true);

  useEffect(() => {
    const mql = window.matchMedia(`(min-width: ${theme.device.lg})`);
    const setToggleFalse = (e) => {
      if (!e.matches) return;
      setToggle(false);
    };
    mql.addEventListener('change', setToggleFalse);
    return () => mql.removeEventListener('change', setToggleFalse);
  });

  return (
    <Nav aria-label="Global Navigation">
      <Background />
      <Content>
        <Title>
          <Link to="/">{title}</Link>
        </Title>
        <LinkWrap toggle={toggle}>
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

const LinkWrap = styled.div`
  @media (min-width: ${({ theme }) => theme.device.lg}) {
    display: flex;
    align-items: center;
    align-content: center;
  }
`;

const LinkUl = styled.ul`
  visibility: hidden;
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

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    visibility: visible;
  }
`;

export default NavBar;
