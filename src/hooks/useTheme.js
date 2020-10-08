import { useState } from 'react';
import { LIGHT, DARK, THEME } from 'constants/constants';

const THEME_MEDIA_QUERY = '(prefers-color-scheme: dark)';

const useTheme = () => {
  const prefersColorScheme = window.matchMedia(THEME_MEDIA_QUERY).matches
    ? DARK
    : LIGHT;
  const localTheme = localStorage.getItem(THEME);
  const initialTheme = localTheme || prefersColorScheme;
  const [theme, setTheme] = useState(initialTheme);

  let htmlEl = document.querySelector('html');
  htmlEl.dataset.theme = initialTheme;

  const setMode = (mode) => {
    localStorage.setItem(THEME, mode);
    htmlEl.dataset.theme = mode;
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === LIGHT ? setMode(DARK) : setMode(LIGHT);
  };

  return [theme, themeToggler];
};

export default useTheme;
