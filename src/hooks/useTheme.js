import { useState, useLayoutEffect } from 'react';
import { LIGHT, DARK, THEME } from 'constants/constants';

const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const useTheme = () => {
  const [theme, setTheme] = useState(null);

  const changeTheme = (theme) => {
    document.querySelector('html').dataset.theme = theme;
    setTheme(theme);
  };

  const toggleTheme = (mode) => {
    localStorage.setItem(THEME, mode);
    changeTheme(mode);
  };

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem(THEME);
    if (localTheme) {
      changeTheme(localTheme);
      return;
    }
    const prefersColorScheme = window.matchMedia(THEME_MEDIA_QUERY).matches
      ? DARK
      : LIGHT;
    changeTheme(prefersColorScheme);
  }, []);

  const themeToggler = () => {
    theme === LIGHT ? toggleTheme(DARK) : toggleTheme(LIGHT);
  };

  return [theme, themeToggler];
};

export default useTheme;
