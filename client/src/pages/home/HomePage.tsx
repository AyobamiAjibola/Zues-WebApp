import { Box, Grow, Typography } from "@mui/material";
import React, { useContext, useEffect, useLayoutEffect } from "react";
import { useStyles } from "./HomeStyle";
import { AppContextProps, CustomJwtPayload } from "@app-interfaces";
import { AppContext } from "../../context/AppContextProvider";
import { useCookies } from 'react-cookie';

//@ts-ignore
import thirdSectionRightImage from '../../assets/images/thirdSectionRightImage.png';
//@ts-ignore
import thirdSectionImage from '../../assets/images/thirdSection.png';
//@ts-ignore
import thirdSectionImageDark from '../../assets/images/thirdSectionDark.png';
//@ts-ignore
import fourthSectionBg from '../../assets/images/fourthSectionBg.png';
//@ts-ignore
import fourthSectionBgDark from '../../assets/images/fourthSectionBgDark.png';
import settings from "../../config/settings";
import { Link } from "react-router-dom";
import useAnimatedSection from "../../hooks/useAnimateHook";
import { LOCAL_STORAGE, SCREEN_WIDTH } from "../../config/constants";
import useVendor from "../../hooks/useVendor";
import jwt_decode from 'jwt-decode';

function HomePage() {
    const classes = useStyles();
    const { openSideNav, darkMode } = useContext(AppContext) as AppContextProps;
    const { isVendor } = useVendor();
    const [cookies, _, removeCookie] = useCookies(['token']);
    const screenWidth = document.documentElement.clientWidth;

    // const [firstSectionRef, firstSectionInView] = useAnimatedSection() as any;
    const [secondSectionRef, secondSectionInView] = useAnimatedSection() as any;
    const [thirdSectionRef, thirdSectionInView] = useAnimatedSection() as any;
    const [fourthSectionRef, fourthSectionInView] = useAnimatedSection() as any;

    useLayoutEffect(() => {
        document.body.style.backgroundColor = darkMode ? 'black' : 'white'
    }, [darkMode]);

    useEffect(() => {
        if (cookies.token) {
            const { permissions } = jwt_decode(cookies.token) as CustomJwtPayload;

            sessionStorage.setItem(LOCAL_STORAGE.permissions, JSON.stringify(permissions));
            sessionStorage.setItem(settings.auth.admin, cookies.token);

        }
        removeCookie('token');
    },[cookies.token]);

    return (
        <React.Fragment>
           <Box className={classes.container}>
              <Box className={classes.firstSection}>
                <Box className={classes.imageInner}
                    sx={{
                        height: screenWidth <= SCREEN_WIDTH ? '20rem' : '40rem',
                    }}
                >
                    {/* <Grow in={firstSectionInView} ref={firstSectionRef} timeout={1000}> */}
                    <Box
                        sx={{
                            width: screenWidth > SCREEN_WIDTH ? '100%' : '60%',
                            my: 2, display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '90%', flexDirection: 'column'
                        }}
                    >
                      {screenWidth > SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav
                                        ? screenWidth <= 992
                                            ? '1.6rem'
                                            : '2.5rem'
                                        : screenWidth <= 992 ? '2rem' : '3rem',
                            width: '60%'
                        }}
                      >
                        An easy goal;
                      </Typography>}
                      {screenWidth <= SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav && screenWidth <= SCREEN_WIDTH
                                        ? '1rem'
                                        : '1.1rem',
                            width: '100%', ml: 2, lineHeight: 1.5
                        }}
                      >
                        An easy goal;
                      </Typography>}
                      {screenWidth > SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav
                                        ? screenWidth <= 992 ? '1.6rem' : '2.5rem'
                                        : screenWidth <= 992 ? '2rem' : '3rem',
                            width: '60%'
                        }}
                      >
                        empower vendors
                      </Typography>}
                      {screenWidth <= SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav && screenWidth <= SCREEN_WIDTH
                                        ? '1rem'
                                        : '1.1rem',
                            width: '100%', ml: 2, lineHeight: 1.5
                        }}
                      >
                        empower vendors
                      </Typography>}
                      {screenWidth > SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav
                                    ? screenWidth <= 992 ? '1.6rem' : '2.5rem'
                                    : screenWidth <= 992 ? '2rem' : '3rem',
                            width: '60%'
                        }}
                      >
                        and maximize
                      </Typography>}
                      {screenWidth <= SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav && screenWidth <= SCREEN_WIDTH
                                        ? '1rem'
                                        : '1.1rem',
                            width: '100%', ml: 2, lineHeight: 1.5
                        }}
                      >
                        and maximize
                      </Typography>}
                      {screenWidth > SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav
                                    ? screenWidth <= 992 ? '1.6rem' : '2.5rem'
                                    : screenWidth <= 992 ? '2rem' : '3rem',
                            width: '60%'
                        }}
                      >
                        their success.
                      </Typography>}
                      {screenWidth <= SCREEN_WIDTH && <Typography className={classes.imageText}
                        sx={{
                            fontSize: openSideNav && screenWidth <= SCREEN_WIDTH
                                        ? '1rem'
                                        : '1.1rem',
                            width: '100%', ml: 2, lineHeight: 1.5
                        }}
                      >
                        their success.
                      </Typography>}
                    </Box>
                    {/* </Grow> */}
                    <Box sx={{ width: '40%' }} />
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        px: screenWidth <= 992
                                ? 6
                                : 15,
                        // paddingLeft: screenWidth <= 992 && !openSideNav && isVendor
                        //                 ? '4.5rem' : '3rem'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '20px',
                            lineHeight: '30px',
                            letterSpacing: '0.5px',
                            textAlign: 'justify',
                        }}
                    >
                        {`Welcome to Zeus, a revolutionary web application designed to empower vendors and 
                        maximize their success in today's dynamic marketplace. Zeus is built on advanced 
                        data analytics and machine learning algorithms, providing vendors with actionable 
                        intelligence and real-time insights to make informed business decisions. With Zeus, 
                        vendors can identify the right product to sell at the right time, with the right 
                        price and in the optimal region, unlocking unparalleled success in their business 
                        endeavors`}
                    </Typography>
                </Box>
              </Box>

              <Grow in={secondSectionInView} ref={secondSectionRef} timeout={2000}>
                <Box className={classes.secondSection}
                    sx={{
                        paddingLeft: !openSideNav && isVendor ? '2rem' : '0rem',
                        backgroundColor: settings.primary_color,
                        color: 'black'
                    }}
                >
                    <Typography
                    sx={{
                        fontSize: openSideNav ? '2.3rem' : '3rem',
                        px: screenWidth <= 992 ? 6 : 15,
                        fontWeight: 600, mt: 5
                    }}
                    >
                    Our Strategic Path to success
                    </Typography>
                    <Typography
                        sx={{
                            px: screenWidth <= 992 ? 6 : 15,
                            lineHeight: '30px',
                            letterSpacing: '0.5px',
                            fontWeight: 500,
                            fontSize: '1.2rem',
                            textAlign: 'justify'
                        }}
                    >
                    {
                        `In the highly competitive business landscape, vendors face numerous challenges in 
                        identifying profitable market segments, understanding customer preferences, optimizing 
                        pricing strategies, and staying ahead of trends. Zeus is here to revolutionize vendor 
                        strategy by offering a comprehensive suite of features that address these challenges head-on.
                        At the core of Zeus is a robust web scraping engine that gathers data from various 
                        websites, providing a vast amount of market information. This data is then harnessed 
                        to create powerful algorithms that drive Zeus's features, enabling vendors to access 
                        accurate and real-time insights. Zeus offers a range of essential functionalities, 
                        starting with niche selection. These functionalities will be explained in detail in this document.`
                    }
                    </Typography>
                </Box>
              </Grow>

              <Grow in={thirdSectionInView} ref={thirdSectionRef} timeout={2000}>
                <Box className={classes.thirdSection}
                    sx={{
                        backgroundColor: screenWidth <= SCREEN_WIDTH
                                            ? darkMode ? '#353434' : '#E4E9EC'
                                            : 'none', 
                        backgroundImage: screenWidth <= SCREEN_WIDTH
                                            ? 'none'
                                            : darkMode ? `url(${thirdSectionImageDark})` : `url(${thirdSectionImage})`
                    }}
                >
                    <Box className={classes.thirdSectionLeft}
                        sx={{
                            width: screenWidth <= SCREEN_WIDTH ? '100%' : '65%',
                            mr: screenWidth <= SCREEN_WIDTH ? 0 : 8,
                            paddingLeft: !openSideNav && isVendor ? '2rem' : '0rem'
                        }}
                    >
                      <Typography
                        sx={{
                            fontSize: '2.5rem',
                            pl: screenWidth <= 992 ? 6 : 20,
                            fontWeight: 600, mt: 5
                        }}
                      >Our mission</Typography>
                      <Typography
                        sx={{
                            px: screenWidth <= 992 ? 6 : 20, 
                            pr: 3,
                            lineHeight: '30px',
                            letterSpacing: '0.5px',
                            fontWeight: 500,
                            fontSize: '1.2rem',
                            textAlign: 'justify'
                        }}
                      >
                        {`Zeus is committed to simplifying the decision-making process for vendors by providing them 
                        with the knowledge and tools to make data-driven choices. By leveraging the power of 
                        technology, advanced analytics, and real-time market insights, Zeus empowers vendors to identify 
                        the right product to sell at the right time, with the right price and in the optimal regions.
                        Get ready to revolutionize your vendor strategy and unlock unparalleled success in your business 
                        endeavors with Zeus. Embrace the power of data, seize market opportunities, and achieve new heights 
                        of profitability with the game-changing features of Zeus.`}
                      </Typography>
                    </Box>
                    <Box className={classes.thirdSectionRight}
                        sx={{
                            width: '35%',
                            display: screenWidth <= SCREEN_WIDTH ? 'none' : 'block'
                        }}
                    />
                </Box>
              </Grow>

              <Grow in={fourthSectionInView} ref={fourthSectionRef} timeout={2000}>
                <Box className={classes.fourthSection}
                    sx={{
                        backgroundImage: screenWidth <= SCREEN_WIDTH
                                            ? 'none'
                                            : darkMode ? `url(${fourthSectionBgDark})` : `url(${fourthSectionBg})`,
                        backgroundColor: screenWidth <= SCREEN_WIDTH ? '#353434' : 'none',
                        paddingLeft: !openSideNav && isVendor ? '2rem' : '0rem'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '2.5rem',
                            pl: screenWidth <= 992 ? 6 : 20,
                            fontWeight: 600, mt: 5
                        }}
                    >Niche Selection</Typography>
                    <Typography
                        sx={{
                            px: screenWidth <= 992 ? 6 : 20,
                            lineHeight: '30px',
                            letterSpacing: '0.5px',
                            fontWeight: 500,
                            fontSize: '1.2rem',
                            textAlign: 'justify'
                        }}
                    >
                        {`Niche selection is a crucial aspect of success in the competitive business landscape, and Zeus 
                        empowers vendors with the ability to choose their desired niche. This feature allows vendors to 
                        focus their efforts on specific product categories or customer segments, enabling them to tailor 
                        their strategies and offerings to meet targeted market needs.`}
                    </Typography>
                    <Link
                        to='/niche-selection'
                        style={{
                            textDecoration: 'none',
                            fontSize: '14px',
                            color: settings.primary_color,
                            cursor: 'pointer',
                            fontWeight: 600
                        }}
                    >
                    <Typography
                        sx={{
                            px: screenWidth <= 992 ? 6 : 20
                        }}
                    >
                        Learn more about our Niche selections
                    </Typography>
                    </Link>
                </Box>
              </Grow>
           </Box>
        </React.Fragment>
    )
}

export default HomePage