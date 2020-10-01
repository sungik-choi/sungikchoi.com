import { useState, useLayoutEffect } from 'react';

const useTheme = () => {
  const THEME_MEDIA_QUERY = '(prefers-color-scheme: light)';
  const LIGHT = 'light';
  const DARK = 'dark';

  const prefersColorScheme = window.matchMedia(THEME_MEDIA_QUERY).matches
    ? LIGHT
    : DARK;

  const [theme, setTheme] = useState(prefersColorScheme);

  const setMode = (mode) => {
    console.log('run!');
    localStorage.setItem('theme', mode);
    setTheme(mode);
  };

  const themeToggler = () => {
    theme === LIGHT ? setMode(DARK) : setMode(LIGHT);
  };

  useLayoutEffect(() => {
    const localTheme = localStorage.getItem('theme');
    localTheme && setTheme(localTheme);
  }, [theme]);

  return [theme, themeToggler];
};

export default useTheme;
