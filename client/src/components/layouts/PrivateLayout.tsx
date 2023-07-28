import React, { useEffect, useRef, useState } from 'react';
import { useContext } from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import SideNav from './SideNav';
import { AppContext } from '../../context/AppContextProvider';
import { AppContextProps } from '@app-interfaces';
import AppBar from './AppBar';
import DrawerHeader from './DrawerHeader';
import withErrorBoundary from '../../hoc/withErrorBoundary';
import Main from './Main';
import HomePage from '../../pages/home/HomePage';
import settings from '../../config/settings';
import { Avatar, Button, ClickAwayListener, CssBaseline, Grow, List, ListItem, ListItemButton, MenuItem, MenuList, Paper, Popper } from '@mui/material';
import { topNavs } from '../../routes';
import AboutPage from '../../pages/about/AboutPage';
import PackagesPage from '../../pages/package/PackagesPage';
import FeaturesPage from '../../pages/features/FeaturesPage';
import ContactPage from '../../pages/contact/ContactPage';
import OverviewPage from '../../pages/overview/OverviewPage';
import ProfilePage from '../../pages/profile/ProfilePage';
import PaymentPage from '../../pages/payment/PaymentPage';
import VolumePage from '../../pages/volume/VolumePage';
import BestSellingItemPage from '../../pages/best-selling-item/BestSellingItemPage';
import FastSellingItemPage from '../../pages/fast-selling-item/FastSellingItemPage';
import NicheSelectionPage from '../../pages/niche-selection/NicheSelectionPage';
import { makeStyles } from '@mui/styles';
import useVendor from '../../hooks/useVendor';
import { ArrowDropDown, Logout } from '@mui/icons-material';
import { reload } from '../../utils/generic';
import capitalize from 'capitalize';
import { SCREEN_WIDTH } from '../../config/constants';

const useStyles = makeStyles({
  lowercaseButton: {
    textTransform: 'none',
  },
});

function PrivateLayout() {
  const classes = useStyles();
  const { setOpenSideNav, openSideNav } = useContext(AppContext) as AppContextProps;
  const [open, setOpen] = useState<boolean>(false);
  const screenWidth = document.documentElement.clientWidth;

  const anchorRef = useRef<HTMLButtonElement>(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  const handleLogout = () => {
    sessionStorage.clear();
    reload()
  }

  function handleListKeyDown(event: React.KeyboardEvent) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current!.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const handleDrawerOpen = () => {
    setOpenSideNav(true);
  };

  const navigate = useNavigate();
  const location = useLocation()
  const vendor = useVendor();
  
  return (
    <React.Fragment>
      <Box sx={{display: 'flex'}}>
        <CssBaseline />
        <AppBar position="fixed"
          sx={{
            backgroundColor: 'white',
            boxShadow: 'none'
          }}
          open={openSideNav}
        >
          <Toolbar
            sx={{ 
              display: 'flex', 
              // justifyContent: 'space-between',
              width: '100%'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                width: '20%'
              }}
            >
              <IconButton
                aria-label="open drawer"
                onClick={handleDrawerOpen}
                edge="start"
                sx={{
                  marginRight: 2,
                  color: 'black',
                  ...(openSideNav && { display: 'none' }),
                }}>
                <MenuIcon
                  sx={{
                    backgroundColor: settings.primary_color,
                    fontSize: '2rem'
                  }}
                />
              </IconButton>
              <Typography
                sx={{
                  ...(openSideNav && { display: 'none' }),
                  color: 'black',
                  fontSize: '1.8rem',
                  fontWeight: 800
                }}
              >ZUES</Typography>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'right',
                width: '80%'
              }}
            >
              {screenWidth > SCREEN_WIDTH && <List
                sx={{
                  display: 'flex',
                  width: vendor.isVendor ? '85%' : '80%',
                  justifyContent: 'right',
                  alignItems: 'center', mr: 2
                }}
              >
                {topNavs.map((nav: any, index: any) => (
                  <ListItem key={index} disablePadding sx={{width: '7rem'}}>
                    <ListItemButton
                      onClick={() => {
                        navigate(nav.path);
                      }}
                      selected={nav.path === location.pathname}
                      sx={{
                        borderBottom: nav.path === location.pathname ? '2px #eaba7e solid' : '',
                        minHeight: 48,
                        justifyContent: 'center',
                        px: 1,
                        fontSize: '12px',
                        fontStyle: 'poppins',
                        fontWeight: 600,
                        letterSpacing: 0,
                        lineHeight: '20px'
                      }}>
                        {nav.name}
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>}
              {screenWidth <= SCREEN_WIDTH && <Box sx={{width: vendor.isVendor ? '60%' : '50%' }}/>}
              {!vendor.isVendor && <Box
                sx={{
                  display: 'flex',
                  justifyContent:'right',
                  alignItems: 'center',
                  width: screenWidth <= SCREEN_WIDTH ? '50%' : '20%'
                }}
              >
                <Link to='/sign-up'
                  style={{textDecoration: 'none', width: '60%',}}
                >
                  <Typography
                    sx={{
                      width: '100%',
                      textAlign: 'center',
                      fontSize: '12px',
                      fontStyle: 'poppins',
                      fontWeight: 600,
                      letterSpacing: 0,
                      lineHeight: '20px',
                      color: 'black',
                      '&:hover': {
                        color: settings.primary_color
                      }
                    }}
                  >Sign up</Typography>
                </Link>
                <Link to='/sign-in'
                  style={{width: '40%', textDecoration: 'none'}}
                >
                  <Button className={classes.lowercaseButton}
                    sx={{
                      color: 'black', width: '100%',
                      backgroundColor: settings.primary_color,
                      fontSize: '12px',
                      fontStyle: 'poppins',
                      fontWeight: 600,
                      letterSpacing: 0,
                      lineHeight: '20px',
                      '&:hover': {
                        border: '1px #eaba7e solid',
                        backgroundColor: 'white',
                        color: 'black'
                      }
                    }}
                  >
                    Login
                  </Button>
                </Link>
              </Box>}

              {vendor.isVendor && <Box
                  sx={{
                    display: 'flex',
                    justifyContent:'right',
                    alignItems: 'center',
                    width: screenWidth <= SCREEN_WIDTH ? '40%' : '15%'
                  }}
                >
                  <Typography mr={1}
                    sx={{
                      fontSize: '12px',
                      fontStyle: 'poppins',
                      fontWeight: 600,
                      letterSpacing: 0,
                      lineHeight: '20px'
                    }}
                  >{vendor.vendor ? capitalize.words(vendor.vendor?.firstName) : ''}</Typography>
                  {vendor.vendor?.profileImageUrl && <img
                    alt="vendor_image"
                    width="30rem"
                    height="30rem"
                    crossOrigin="anonymous"
                    style={{
                        borderRadius: '50%'
                    }}
                    src={`${settings.api.baseURL}/${vendor.vendor?.profileImageUrl}`}
                  />}
                  {!vendor.vendor?.profileImageUrl && <Avatar
                    sx={{
                        width: "2rem",
                        height: "2rem",
                        backgroundColor: settings.primary_color,
                        fontSize: '14px', fontWeight: 600
                    }}
                  >
                    {vendor.vendor && capitalize.words(vendor.vendor?.firstName.charAt(0))}
                    {vendor.vendor && capitalize.words(vendor.vendor?.lastName.charAt(0))}
                  </Avatar>}
                  <IconButton
                    ref={anchorRef}
                    id="composition-button"
                    aria-controls={open ? 'composition-menu' : undefined}
                    aria-expanded={open ? 'true' : undefined}
                    aria-haspopup="true"
                    onClick={handleToggle}
                    sx={{
                      width: '1.7rem', height: '1.7rem'
                    }}
                  >
                    <ArrowDropDown
                      sx={{
                        color: '#BB9464',
                        cursor: 'pointer',
                        '&:hover': {
                          color: 'black'
                        }
                      }}
                    />
                  </IconButton>
                  <Popper
                    open={open}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                  >
                    {({ TransitionProps, placement }) => (
                      <Grow
                        {...TransitionProps}
                        style={{
                          transformOrigin:
                            placement === 'bottom-start' ? 'left top' : 'left bottom',
                        }}
                      >
                        <Paper>
                          <ClickAwayListener onClickAway={handleClose}>
                            <MenuList
                              autoFocusItem={open}
                              id="composition-menu"
                              aria-labelledby="composition-button"
                              onKeyDown={handleListKeyDown}
                              sx={{
                                backgroundColor: 'white',
                                mt: 1, borderRadius: '2px',
                                border: '0.5px #eaba7e solid'
                              }}
                            >
                              <MenuItem onClick={handleLogout}
                                sx={{
                                  fontSize: '12px',
                                  fontStyle: 'poppins',
                                  fontWeight: 600,
                                  letterSpacing: 0,
                                  lineHeight: '20px',
                                  color: 'black'
                                }}
                              ><Logout sx={{color: '#BB9464'}}/>
                                &nbsp;&nbsp;Sign out
                              </MenuItem>
                            </MenuList>
                          </ClickAwayListener>
                        </Paper>
                      </Grow>
                    )}
                  </Popper>
              </Box>}
            </Box>

          </Toolbar>
        </AppBar>
        <SideNav />
        <Main open={openSideNav}>
          <DrawerHeader />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/about-us" element={<AboutPage />} />
            <Route path="/packages" element={<PackagesPage />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/contact-us" element={<ContactPage />} />
            <Route path="/overview" element={<OverviewPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/volume" element={<VolumePage />} />
            <Route path="/best-selling-item" element={<BestSellingItemPage />} />
            <Route path="/fast-selling-item" element={<FastSellingItemPage />} />
            <Route path="/niche-selection" element={<NicheSelectionPage />} />
            {/* <Route path="/error" element={<SignInPage />} /> */}
          </Routes>
        </Main>
      </Box>
      {/* <AppLoader show={appointmentReducer.updateAppointmentStatus === 'loading'} /> */}
    </React.Fragment>
  );
}

export default withErrorBoundary(PrivateLayout);
