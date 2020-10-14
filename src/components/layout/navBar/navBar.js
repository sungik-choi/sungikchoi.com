import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useContext,
} from 'react';
import styled, { ThemeContext } from 'styled-components';
import { Link } from 'gatsby';
import ThemeToggleButton from './themeToggleButton/themeToggleButton';
import MenuIcon from './menuIcon';
import Background from 'styles/background';
import {
  listAnimationCSS,
  navBackgroundAnimationCSS,
  curtainAnimationCSS,
} from 'styles/navBarAnimation';
import { useSiteMetadata } from 'hooks/useSiteMetadata';

// ! 메뉴 등장 시 스크롤 막기
// ! 메뉴 등장 시 키보드 포커스가 메뉴 안으로만 향하도록 변경

const NavBar = ({ title, themeToggler }) => {
  const site = useSiteMetadata();
  const { menuLinks, githubLink } = site.siteMetadata;

  const [toggle, setToggle] = useState(false);
  const { device } = useContext(ThemeContext);
  const curtainRef = useRef(null);
  const linkUlRef = useRef(null);
  const mql = window.matchMedia(`(max-width: ${device.sm})`);

  const onClickHandler = () =>
    toggle === true ? setToggle(false) : setToggle(true);

  useEffect(() => {
    const hideAnimation = () => {
      curtainRef.current.style.display = 'none';
      linkUlRef.current.style.display = 'none';
      setTimeout(() => {
        curtainRef.current.style.display = 'block';
        linkUlRef.current.style.display = 'flex';
      }, 500);
    };
    const setToggleFalse = (e) => {
      if (e.matches) {
        hideAnimation();
        return;
      }
      setToggle(false);
    };
    mql.addEventListener('change', setToggleFalse);
    return () => mql.removeEventListener('change', setToggleFalse);
  });

  const toggleKeyboardFocus = useCallback(() => {
    const focusableElementsString = `a[href], button:not([disabled])`;
    const focusableElements = linkUlRef.current.querySelectorAll(
      focusableElementsString
    );
    const FOCUSABLE_TABINDEX = 0;
    const DISABLE_FOCUS_TABINDEX = -1;
    if (!mql.matches) {
      focusableElements.forEach((e) =>
        e.setAttribute('tabindex', FOCUSABLE_TABINDEX)
      );
      return;
    }
    const tabIndex = toggle ? FOCUSABLE_TABINDEX : DISABLE_FOCUS_TABINDEX;
    focusableElements.forEach((e) => e.setAttribute('tabindex', tabIndex));
  }, [mql.matches, toggle]);

  useEffect(() => {
    toggleKeyboardFocus();
  }, [toggleKeyboardFocus]);

  useEffect(() => {
    mql.addEventListener('change', toggleKeyboardFocus);
    return () => mql.removeEventListener('change', toggleKeyboardFocus);
  });

  useEffect(() => {
    const ESC_KEYCODE = 27;
    const keydownHandler = (e) => {
      if (!toggle) return;
      if (e.keyCode === ESC_KEYCODE) setToggle(false);
    };
    window.addEventListener('keydown', keydownHandler);
    return () => window.removeEventListener('keydown', keydownHandler);
  }, [toggle]);

  return (
    <Nav aria-label="Global Navigation">
      <NavBackground toggle={toggle} />
      <Content>
        <Title onClick={() => setToggle(false)}>
          <Link to="/">{title}</Link>
        </Title>
        <LinkWrap>
          <Curtain ref={curtainRef} toggle={toggle} />
          <LinkContent>
            <MenuIcon onClickHandler={onClickHandler} toggle={toggle} />
            <LinkUl ref={linkUlRef} toggle={toggle}>
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
        </LinkWrap>
      </Content>
    </Nav>
  );
};

const Nav = styled.nav`
  min-width: ${({ theme }) => theme.minWidth};
  position: sticky;
  overflow: hidden;
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

  a:hover, a:focus {
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
    ${({ toggle }) => listAnimationCSS(toggle)}
    pointer-events: ${({ toggle }) => (toggle ? 'auto' : 'none')};
    flex-direction: column;
    padding: 0 ${({ theme }) => theme.sizing.lg};

    li {
      display: block;
      margin-left: 0;
      font-size: ${({ theme }) => theme.text.md};
      transform: ${({ toggle, theme }) =>
        toggle
          ? `translateY(calc(${theme.navHeight} + ${theme.sizing.lg}))`
          : `translateY(${theme.navHeight})`};
      opacity: ${({ toggle }) => (toggle ? '1' : '0')};
    }

    a {
      display: block;
      height: 100%;
      padding: 0.5rem 0;
      font-weight: 500;
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
      ${({ toggle }) => navBackgroundAnimationCSS(toggle)};
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: ${({ theme }) => theme.color.postBackground};
    }
  }
`;

const Curtain = styled.div`
  display: none;

  @media (max-width: ${({ theme }) => theme.device.sm}) {
    ${({ toggle }) => curtainAnimationCSS(toggle)}
    display: block;
    position: fixed;
    ${({ theme }) => `top: calc(${theme.navHeight} - 1px)`};
    left: 0;
    width: 100%;
    ${({ theme }) => `height: calc(100% - ${theme.navHeight} + 1px)`};
    background-color: ${({ theme }) => theme.color.postBackground};
  }
`;

const LinkContent = styled.div`
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    width: 100%;
    z-index: 200;
  }
`;

const LinkWrap = styled.div`
  display: flex;
  @media (max-width: ${({ theme }) => theme.device.sm}) {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: ${({ theme }) => theme.navHeight};
  }
`;

export default NavBar;
