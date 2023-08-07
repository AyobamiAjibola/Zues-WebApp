import { AppContextProps } from '@app-interfaces';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import Divider from '@mui/material/Divider';
// import MuiDrawer from '@mui/material/Drawer';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import {
  // createTheme,
  ThemeProvider,
  // useTheme,
} from '@mui/material/styles';
import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { DRAWER_WIDTH } from '../../config/constants';
// import settings from '../../config/settings';
import { AppContext } from '../../context/AppContextProvider';
import useVendor from '../../hooks/useVendor';
// import useLogout from '../../hooks/useLogout';
import { ISideNav, sideNavs } from '../../routes';
import DrawerHeader from './DrawerHeader';
import { Typography } from '@mui/material';
import useAppTheme from '../../hooks/useAppTheme';
import { LightMode, Nightlight } from '@mui/icons-material';

function SideNav() {
  const [navs, setNavs] = useState<ISideNav[]>([]);

  useState<any>();
  const { openSideNav, setOpenSideNav, darkMode, setDarkMode } = useContext(AppContext) as AppContextProps;
  
  const vendor = useVendor();
  const navigate = useNavigate();
  const location = useLocation();
  const { theme } = useAppTheme(darkMode);
  // const logout = useLogout();

  useEffect(() => {
    if (vendor && vendor.isVendor)
      return setNavs(
        sideNavs.filter(
          value =>
            value.tag === 'vendor' ||
            value.name === 'Home' ||
            value.name === 'About-us' || value.tag === 'all'
        ),
      );
    // else setNavs(sideNavs.filter(value => value.tag === 'vendor'));
  }, [vendor.isVendor]);

  useEffect(() => {
    setNavs(sideNavs.filter(
      value => 
        value.tag === 'all'
    ))
  },[])

  const handleDrawerClose = () => {
    setOpenSideNav(false);
  };

  const handleToggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    sessionStorage.setItem('dark_mode', String(newDarkMode));
  };

  useEffect(() =>  {
    const storedDarkMode = sessionStorage.getItem('dark_mode');
    if (storedDarkMode === 'true') {
      setDarkMode(true);
    } else if (storedDarkMode === 'false') {
      setDarkMode(false);
    } else {
      const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleChangeDarkMode = (e: any) => {
        setDarkMode(e.matches);
      };
      handleChangeDarkMode(darkModeQuery); // Initial check
      darkModeQuery.addEventListener('change', handleChangeDarkMode);

      return () => {
        darkModeQuery.removeEventListener('change', handleChangeDarkMode);
      };
    }
  }, [darkMode]);

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        variant={vendor.isVendor ? "permanent" : "persistent"} //permanent persistent ZUES
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: openSideNav ? DRAWER_WIDTH : '3.5rem',
            boxSizing: 'border-box',
            backgroundColor: theme.palette.primary.main
            // backgroundColor: !darkMode
            //                   ? openSideNav ? 'white' : theme.palette.primary.main
            //                   : theme.palette.darkMode.main
          },
          whiteSpace: 'nowrap',
          boxSizing: 'border-box'
        }}
        anchor="left"
        open={openSideNav}
      >
        <ThemeProvider theme={theme}>
          <DrawerHeader
            sx={{
              backgroundColor: 'white',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Typography
              sx={{
                fontWeight: 900, textAlign: 'center',
                fontSize: '1.8rem',
                color: theme.palette.primary.main,
                width: '70%'
              }}
            >ZUES</Typography>

            <IconButton onClick={handleDrawerClose}
              sx={{
                width: '30%'
              }}
            >
              {theme.direction === 'rtl' ? 
                    <ChevronRightIcon /> :
                    <ChevronLeftIcon
                      sx={{
                        color: 'black',
                        backgroundColor: theme.palette.primary.main,
                        borderRadius: '50%',
                        fontWeight: 700,
                        fontSize: '2rem'
                      }}
                    />
              }
            </IconButton>
          </DrawerHeader>
        </ThemeProvider>

        <Divider />
        <List>
          {navs.map((nav, index) => (
            <ListItem key={index} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={() => {
                  navigate(nav.path);
                }}
                selected={nav.path === location.pathname}
                sx={{
                  minHeight: 48,
                  justifyContent: openSideNav ? 'initial' : 'center',
                  px: 2.5,
                  borderRight: nav.path === location.pathname ? '2px #eaba7e solid' : '',
                  borderLeft: nav.path === location.pathname ? '2px #eaba7e solid' : '',
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSideNav ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'black'
                    // color: darkMode ? 'white' : theme.palette.darkMode.main
                  }}>
                  <nav.Icon />
                </ListItemIcon>
                <ListItemText primary={nav.name}
                  sx={{
                    opacity: openSideNav ? 1 : 0,
                    fontWeight: 800, fontSize: '12px'
                  }}
                  primaryTypographyProps={{
                    fontSize: '12px',
                    fontStyle: 'poppins',
                    fontWeight: 600,
                    letterSpacing: 0,
                    lineHeight: '20px',
                    color: 'black'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
          <Divider />
          <ListItem disablePadding sx={{ display: 'block' }}>
            <ListItemButton
              onClick={handleToggleDarkMode}
              sx={{
                minHeight: 48,
                justifyContent: openSideNav ? 'initial' : 'center',
                px: 2.5
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: openSideNav ? 2 : 'auto',
                  justifyContent: 'center',
                  color: 'black'
                  // color: darkMode ? 'white' : theme.palette.darkMode.main
                }}
              >
                { darkMode ? <Nightlight /> : <LightMode/> }
              </ListItemIcon>
              <ListItemText
                sx={{
                  opacity: openSideNav ? 1 : 0,
                  fontWeight: 800, fontSize: '12px'
                }}
                primaryTypographyProps={{
                  fontSize: '12px',
                  fontStyle: 'poppins',
                  fontWeight: 600,
                  letterSpacing: 0,
                  lineHeight: '20px',
                  color: 'black'
                }}
              >
                { darkMode ? 'Dark mode' : 'Light mode'}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </ThemeProvider>
  );
}

export default SideNav;
