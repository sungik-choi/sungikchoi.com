import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';
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
          </LinkUl>
          <ThemeToggleButton onClick={themeToggler}>
            <Div></Div>
          </ThemeToggleButton>
        </LinkWrap>
      </Content>
    </Nav>
  );
};

const ThemeToggleButton = styled.button`
  cursor: pointer;
  width: 64px;
  height: 36px;
  border: none;
  border-radius: 20px;
  background-color: #eee;
`;

const Div = styled.div`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  background-color: black;
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

  * {
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
`;

const LinkUl = styled.ul`
  display: flex;

  a {
    font-weight: ${({ theme }) => theme.fontWeight.regular};
  }

  a:hover {
    color: ${({ theme }) => theme.color.blue};
  }

  & > li + li {
    margin-left: 2rem;
  }

  li {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default NavBar;
