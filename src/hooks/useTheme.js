import { useState, useEffect } from 'react';

const useTheme = () => {
  const THEME_MEDIA_QUERY = '(prefers-color-scheme: light)';
  const LIGHT = 'light';
  const DARK = 'dark';

  const prefersColorScheme = window.matchMedia(THEME_MEDIA_QUERY).matches
    ? LIGHT
    : DARK;

  const [theme, setTheme] = useState(prefersColorScheme);

  const setMode = (mode) => {
    window.localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === LIGHT ? setMode(DARK) : setMode(LIGHT);
  };

  useEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, []);

  return [theme, themeToggler];
};

export default useTheme;
