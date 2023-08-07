import React, { useEffect } from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useStyles } from "./style";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import settings from "../../config/settings";
import { ArrowRightAlt, SentimentVeryDissatisfied } from "@mui/icons-material";
import { SCREEN_WIDTH } from "../../config/constants";
import { useCookies } from "react-cookie";

function LoginErrorPage() {
    const classes = useStyles();
    const [cookies, _, removeCookie] = useCookies(['loginError']);

    const screenWidth = document.documentElement.clientWidth;

    useEffect(() => {
        const handleBeforeUnload = () => {
          if (cookies.loginError) {
            removeCookie('loginError');
          }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
        };
      }, [cookies.loginError, removeCookie]);

    const handleRemoveCookie = () => {
        removeCookie('loginError')
    }

    return (
        <PublicLayout>
            <Box className={classes.congratWrapper}>
                <Box className={classes.congratContainer}>
                    <Box
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center'
                      }}
                    >
                        <SentimentVeryDissatisfied
                            sx={{
                                fontSize: '20rem'
                            }}
                        />
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            mb: 4, 
                        }}
                    >
                        {cookies.loginError}
                    </Typography>
                    <Link to='/sign-in'
                        style={{
                            textDecoration: 'none',
                            marginBottom: '4rem',
                            marginTop: '1rem',
                            width:'100%', textAlign: 'center'
                        }}
                    >
                        <Button
                            onClick={handleRemoveCookie}
                            endIcon={<ArrowRightAlt/>}
                            sx={{
                                width: screenWidth <= SCREEN_WIDTH ? '60%' : '25%',
                                fontWeight: 600,
                                borderRadius: '2rem',
                                boxShadow: 'none',
                                color: 'white',
                                backgroundColor: settings.primary_color,
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    boxShadow: '3', color: settings.primary_color,
                                    fontWeight: 700
                                }
                            }}
                        >
                            Go back to login
                        </Button>
                    </Link>
                </Box>
            </Box>
        </PublicLayout>
    )
}

export default LoginErrorPage;