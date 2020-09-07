import React from 'react';
import styled from 'styled-components';
import { Link } from 'gatsby';

const NavBar = ({ title }) => {
  const data = [
    {
      linkTo: '/',
      text: '홈',
    },
    {
      linkTo: '/about/',
      text: '소개',
    },
    {
      linkTo: '/',
      text: 'Github',
    },
  ];

  return (
    <Nav aria-label="네비게이션">
      <Background />
      <Content>
        <Title>
          <Link to="/">{title}</Link>
        </Title>
        <LinkList>
          {data.map(({ linkTo, text }) => (
            <li key={text}>
              <Link to={linkTo}>
                <LinkText>{text}</LinkText>
              </Link>
            </li>
          ))}
        </LinkList>
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

const Background = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1;
  backdrop-filter: saturate(180%) blur(20px);
  background-color: ${({ theme }) => theme.color.transparent};
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

const LinkList = styled.ul`
  display: flex;

  & > li + li {
    margin-left: 2rem;
  }
`;

const LinkText = styled.span`
  font-weight: ${({ theme }) => theme.fontWeight.regular};

  &:hover {
    color: ${({ theme }) => theme.color.hover};
  }
`;

export default NavBar;
