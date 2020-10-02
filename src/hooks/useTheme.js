import { useState, useLayoutEffect } from 'react';
import { LIGHT, DARK, THEME } from 'constants/constants';

const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const useTheme = () => {
  const prefersColorScheme = window.matchMedia(THEME_MEDIA_QUERY).matches
    ? DARK
    : LIGHT;

  let htmlEl = document.querySelector('html');
  const [theme, setTheme] = useState(prefersColorScheme);

  const setMode = (mode) => {
    localStorage.setItem(THEME, mode);
    htmlEl.dataset.theme = mode;
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === LIGHT ? setMode(DARK) : setMode(LIGHT);
  };

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem(THEME);
    if (localTheme) {
      htmlEl.dataset.theme = localTheme;
      setTheme(localTheme);
    } else if (!htmlEl.dataset.theme) {
      htmlEl.dataset.theme = prefersColorScheme;
    }
  }, [theme]);

  return [theme, themeToggler];
};

export default useTheme;
