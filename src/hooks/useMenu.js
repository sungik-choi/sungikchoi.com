import { useState, useEffect, useCallback } from 'react';

const useMenu = ({ curtainRef, listRef, device }) => {
  const [toggle, setToggle] = useState(false);
  const mql = window.matchMedia(`(max-width: ${device.sm})`);
  const onClickHandler = () =>
    toggle === true ? setToggle(false) : setToggle(true);

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
    const focusableElements = listRef.current.querySelectorAll(
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
  }, [listRef, mql.matches, toggle]);

  useEffect(() => {
    toggleKeyboardFocus();
  }, [toggleKeyboardFocus]);

  useEffect(() => {
    mql.addEventListener('change', toggleKeyboardFocus);
    return () => mql.removeEventListener('change', toggleKeyboardFocus);
  });

  useEffect(() => {
    const ESC_KEYCODE = 27;
    const closeMenuWhenPressEscKey = (e) => {
      if (!toggle) return;
      if (e.keyCode === ESC_KEYCODE) setToggle(false);
    };
    window.addEventListener('keydown', closeMenuWhenPressEscKey);
    return () =>
      window.removeEventListener('keydown', closeMenuWhenPressEscKey);
  }, [toggle, setToggle]);

  return [toggle, setToggle, onClickHandler];
};

export default useMenu;
