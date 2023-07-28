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
  createTheme,
  // CSSObject, styled, Theme,
  ThemeProvider,
  useTheme,
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

function SideNav() {
  const [navs, setNavs] = useState<ISideNav[]>([]);

  useState<any>();
  const { openSideNav, setOpenSideNav } = useContext(AppContext) as AppContextProps;

  const vendor = useVendor();
  const navigate = useNavigate();
  const location = useLocation();
  const theme = useTheme();
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

  return (
    <ThemeProvider
      theme={createTheme({
        palette: {
          primary: { main: '#eaba7e' },
          secondary: { main: '#C71B1B' },
          // mode: 'dark',
        },
      })}>
      <Drawer
        variant="permanent"
        sx={{
          width: DRAWER_WIDTH,
          marginLeft: openSideNav ? '0px' : '3rem',
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: openSideNav ? DRAWER_WIDTH : '3.5rem',
            boxSizing: 'border-box',
            backgroundColor: openSideNav ? 'white' : theme.palette.primary.main
          },
          whiteSpace: 'nowrap',
          boxSizing: 'border-box'
        }}
        // variant="persistent"
        anchor="left"
        open={openSideNav}
      >
        <ThemeProvider
          theme={createTheme({
            palette: {
              primary: { main: '#1a97cf' },
              secondary: { main: '#fba91a' },
              mode: 'light',
            },
          })}>
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
                color: 'black', width: '70%'
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
                    lineHeight: '20px'
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        {/* <List>
          {['Logout'].map(text => (
            <ListItem key={text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: openSideNav ? 'initial' : 'center',
                  px: 2.5,
                }}>
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: openSideNav ? 3 : 'auto',
                    justifyContent: 'center',
                  }}>
                  <Logout />
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: openSideNav ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List> */}
      </Drawer>
    </ThemeProvider>
  );
}

export default SideNav;
