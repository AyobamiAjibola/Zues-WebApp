import { useMemo } from 'react';

import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';

export default function useAppTheme() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          primary: { main: '#eaba7e' },
          secondary: { main: '#fba91a' },
          mode: prefersDarkMode ? 'dark' : 'light',
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
    [prefersDarkMode],
  );

  return {
    theme: responsiveFontSizes(theme),
  };
}
