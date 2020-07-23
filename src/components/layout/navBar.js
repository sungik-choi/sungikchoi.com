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
    <Nav>
      <Background />
      <Content>
        <Link to="/">
          <Title>{title}</Title>
        </Link>
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
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
  & a:hover {
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
  background-color: rgba(255, 255, 255, 0.7);
`;

const Content = styled.div`
  position: relative;
  margin: 0 auto;
  max-width: 980px;
  height: 100%;
  padding: 0 22px;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  & * {
    margin: 0;
    list-style-type: none;
  }
`;

const Title = styled.h1`
  padding: 0;
  border: none;
  font-size: 21px;
  font-weight: 600;
  color: ${({ theme }) => theme.color.text};
`;

const LinkList = styled.ul`
  display: flex;
  & > li + li {
    margin-left: 30px;
  }
`;

const LinkText = styled.span`
  font-weight: 400;
  &:hover {
    color: ${({ theme }) => theme.color.hover};
  }
`;

export default NavBar;
