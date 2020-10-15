import { useState, useEffect, useCallback } from 'react';

const useMenu = ({ navRef, curtainRef, listRef, device }) => {
  const [toggle, setToggle] = useState(false);
  const mql = window.matchMedia(`(max-width: ${device.sm})`);

  const onClickHandler = () =>
    toggle === true ? setToggle(false) : setToggle(true);

  const focusableElementsString = `a[href], button:not([disabled])`;

  const toggleKeyboardFocus = useCallback(() => {
    const FOCUSABLE_TABINDEX = 0;
    const DISABLE_FOCUS_TABINDEX = -1;
    const focusableElements = listRef.current.querySelectorAll(
      focusableElementsString
    );

    if (!mql.matches) {
      focusableElements.forEach((e) =>
        e.setAttribute('tabindex', FOCUSABLE_TABINDEX)
      );
      return;
    }

    const tabIndex = toggle ? FOCUSABLE_TABINDEX : DISABLE_FOCUS_TABINDEX;
    focusableElements.forEach((e) => e.setAttribute('tabindex', tabIndex));
  }, [focusableElementsString, listRef, mql.matches, toggle]);

  useEffect(() => {
    toggleKeyboardFocus();
  }, [toggleKeyboardFocus]);

  useEffect(() => {
    mql.addEventListener('change', toggleKeyboardFocus);
    return () => mql.removeEventListener('change', toggleKeyboardFocus);
  });

  useEffect(() => {
    const ESC_KEYCODE = 27;
    const TAB_KEYCODE = 9;
    const focusableElements = navRef.current.querySelectorAll(
      focusableElementsString
    );
    const firstTabStop = focusableElements[0];
    const lastTabStop = focusableElements[focusableElements.length - 1];

    const trapTabKey = (e) => {
      if (!toggle) return;
      if (e.keyCode === TAB_KEYCODE) {
        if (e.shiftKey) {
          if (document.activeElement === firstTabStop) {
            e.preventDefault();
            lastTabStop.focus();
          }
        } else {
          if (document.activeElement === lastTabStop) {
            e.preventDefault();
            firstTabStop.focus();
          }
        }
      }
      if (e.keyCode === ESC_KEYCODE) setToggle(false);
    };

    window.addEventListener('keydown', trapTabKey);
    return () => window.removeEventListener('keydown', trapTabKey);
  }, [focusableElementsString, navRef, toggle, setToggle]);

  useEffect(() => {
    const TIMER = 500;

    const hideAnimation = () => {
      curtainRef.current.style.display = 'none';
      listRef.current.style.display = 'none';
      setTimeout(() => {
        curtainRef.current.style.display = 'block';
        listRef.current.style.display = 'flex';
      }, TIMER);
    };

    const closeMenu = (e) => {
      if (e.matches) {
        hideAnimation();
        return;
      }
      setToggle(false);
    };

    mql.addEventListener('change', closeMenu);
    return () => mql.removeEventListener('change', closeMenu);
  });

  return [toggle, setToggle, onClickHandler];
};

export default useMenu;
