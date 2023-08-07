import { useMemo } from 'react';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';
// import { useMediaQuery } from '@mui/material';

export default function useAppTheme(darkMode: boolean) {
  // const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)'); // changes to dark mode automatically according to the users system mode
  // const mode = darkMode ? 'dark' : prefersDarkMode ? 'dark' : 'light';
  const mode = darkMode ? 'dark' : 'light';

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: '#eaba7e', dark: '#BB9464' },
          secondary: { main: '#fba91a' },
          darkMode: { main: '#000000' },
          // mode: prefersDarkMode ? 'dark' : 'light',
          mode: mode
        },
        breakpoints: {
          values: {
            xs: 0,
            sm: 768,
            md: 960,
            lg: 1280,
            xl: 1920,
            // You can customize the breakpoints as needed
          },
        }
      }),
    [
      // prefersDarkMode,
      darkMode
    ],
  );

  return {
    theme: responsiveFontSizes(theme),
  };
}
