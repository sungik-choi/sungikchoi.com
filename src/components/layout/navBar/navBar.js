import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Link } from 'gatsby';
import ThemeToggleButton from './themeToggleButton/themeToggleButton';
import Background from 'styles/background';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

const NavBar = ({ title, themeToggler }) => {
  const site = useSiteMetadata();
  const { menuLinks, githubLink } = site.siteMetadata;

  return (
    <Nav aria-label="Global Navigation">
      <Background />
      <Content>
        <Title>
          <Link to="/">{title}</Link>
        </Title>
        <LinkWrap>
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
          <MenuIconWrap>
            <MenuIconBreadTop />
            <MenuIconBreadBottom />
          </MenuIconWrap>
        </LinkWrap>
      </Content>
    </Nav>
  );
};

const MenuIconBreadTop = styled.div`
  top: 22px;
`;

const MenuIconBreadBottom = styled.div`
  bottom: 22px;
`;

const iconChangeTop = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  25% {
    transform: translateY(4.5px) rotate(0deg);
  }

  100% {
    transform: translateY(4.5px) rotate(45deg);
  }
`;

const iconChangeBottom = keyframes`
  0% {
    transform: translateY(0px) rotate(0deg);
  }

  25% {
    transform: translateY(-4.5px) rotate(0deg);
  }

  100% {
    transform: translateY(-4.5px) rotate(-45deg);
  }
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

  div {
    position: absolute;
    width: 18px;
    height: 1px;
    left: 19px;
    background-color: ${({ theme }) => theme.color.text};
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    /* transition: transform 0.5s cubic-bezier(0.845, 0.005, 0.17, 0.995); */
  }

  ${MenuIconBreadTop} {
    animation-name: ${iconChangeTop};
  }

  ${MenuIconBreadBottom} {
    animation-name: ${iconChangeBottom};
  }

  &:hover {
    ${MenuIconBreadTop} {
      /* transform: translateY(4.5px) rotate(45deg); */
    }

    ${MenuIconBreadBottom} {
      /* transform: translateY(-4.5px) rotate(-45deg); */
    }
  }

  @media (min-width: ${({ theme }) => theme.device.lg}) {
    display: none;
  }
`;

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
  display: flex;
  align-items: center;
  align-content: center;
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
