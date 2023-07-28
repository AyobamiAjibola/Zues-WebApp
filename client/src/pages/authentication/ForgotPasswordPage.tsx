import React, { useState } from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Box } from "@mui/system";
import { useStyles } from "./style";
import { Button, Grid, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import { ArrowBackOutlined, Email } from "@mui/icons-material";
import settings from "../../config/settings";
import { Link, useNavigate } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const API_ROOT = settings.api.rest;

//@ts-ignore
import instagram from '../../assets/images/instagram.png';
//@ts-ignore
import google from '../../assets/images/google.png';
//@ts-ignore
import facebook from '../../assets/images/facebook.png';
import AppAlert from "../../components/alerts/AppAlert";
import axiosClient from "../../config/axiosClient";
import { SCREEN_WIDTH } from "../../config/constants";

function ForgotPasswordPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [email, setEmail] =  useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleEmailChange = (event: any) => {
        setEmail(event.target.value);
    };
    
    const handleForgotPassword = async () => {
        try {
            setIsLoading(true);
            sessionStorage.setItem('email', email);
            const response = await axiosClient.post(`${API_ROOT}/password-reset-vendor`, {
                email
            });
            sessionStorage.setItem('reset_msg', response.data.message)
            setIsLoading(false)
            navigate('/verification')

        } catch (error: any) {
            setIsLoading(false)
            setError(error.response.data.message)
        }
    };

    const goBack = () => {
        navigate('/')
    };

    const screenWidth = document.documentElement.clientWidth;

    return (
        <PublicLayout>
            <Box className={classes.forgotPasswordWrapper}>
                <Box className={classes.forgotPasswordContainer}>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'left',
                        alignItems: 'left',
                        width: '100%', ml: 8,
                        mt: screenWidth <= SCREEN_WIDTH ? -8 : -3,
                        mb: screenWidth <= SCREEN_WIDTH ? 2 : 0
                      }}
                    >
                        <IconButton
                            sx={{
                                border: '2px black solid',
                                width: '1.5rem', height: '1.5rem'
                            }}
                            onClick={goBack}
                        >
                            <ArrowBackOutlined
                                sx={{
                                    fontSize: '16px',
                                    fontWeight: 900,
                                    color: 'black'
                                }}
                            />
                        </IconButton>
                    </Box>
                    <Typography
                        sx={{
                        fontSize: screenWidth <= SCREEN_WIDTH ? '1.4rem' : '1.8rem',
                        fontWeight: '900'
                        }}
                    >
                        Forgot Password
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: '14px',
                            mt: 4
                        }}
                    >Enter email address</Typography>
                        <Grid item xs={12} md={6} mb={3}>
                        <TextField
                            sx={{mb: 2.5, height: '2rem'}}
                            className={classes.customTextFieldForgotPassword}
                            onChange={handleEmailChange}
                            value={email}
                            placeholder='example@gmail.com'
                            name='email'
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <Email sx={{color: '#B4AEAE', fontSize: '1.3rem'}}/>
                                </InputAdornment>
                            ),
                            }}
                        />
                        </Grid>
                        <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', mb: 4
                        }}
                        >
                        <Link to='/'
                            style={{
                                fontWeight: 700,
                                color: '#B4AEAE',
                                textDecoration: 'none',
                                fontSize: '14px'
                            }}
                        >Back to sign in</Link>
                        </Box>
                        <Box
                            sx={{
                                width: '100%', display: 'flex',
                                justifyContent: 'center', alignItems: 'center'
                            }}
                        >
                          <LoadingButton
                            loading={isLoading}
                            type="submit"
                            size="large"
                            variant="contained"
                            onClick={handleForgotPassword}
                            sx={{
                                width: screenWidth <= SCREEN_WIDTH ? '77%' : '27%',
                                height: '2.8rem',
                                borderRadius: '0.5rem',
                                backgroundColor: settings.primary_color,
                                boxShadow: 'none',
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                    boxShadow: '3', color: settings.primary_color,
                                    fontWeight: 500
                                }
                            }}
                          >
                            {`Send`}
                          </LoadingButton>
                        </Box>
                        <Typography
                            sx={{
                                fontWeight: 800,
                                color: settings.primary_color,
                                textAlign: 'center', my: 3
                            }}
                        >or</Typography>
                        <Box className={classes.appIconWrapper}>
                            <IconButton
                                sx={{
                                border: '0.3px #E0E0E0 solid',
                                width: '2.3rem', height: '2.3rem'
                                }}
                            >
                                <img src={facebook} alt='facebook-icon' style={{width: '1.2rem'}} />
                            </IconButton>
                            <IconButton
                                sx={{
                                border: '0.3px #E0E0E0 solid',
                                width: '2.3rem', height: '2.3rem'
                                }}
                            >
                                <img src={google} alt='google-icon' style={{width: '1.4rem', height: '1rem'}} />
                            </IconButton>
                            <IconButton
                                sx={{
                                border: '0.3px #E0E0E0 solid',
                                width: '2.3rem', height: '2.3rem'
                                }}
                            >
                                <img src={instagram} alt='instagram-icon' style={{width: '1.3rem'}} />
                            </IconButton>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: '12px',
                            fontWeight: 800, my: 3
                          }}
                        >Don’t have an account?</Typography>
                        <Link to='/sign-up'
                            style={{
                                textDecoration: 'none',
                                width: '100%',
                                textAlign: 'center',
                                marginTop: 3
                            }}
                        >
                            <Button
                                sx={{
                                    width: '27%',
                                    height: '2.6rem',
                                    borderRadius: '0.5rem',
                                    backgroundColor: 'transparent',
                                    boxShadow: 'none',
                                    color: 'black',
                                    fontWeight: 500,
                                    border: '0.5px #eaba7e solid',
                                    '&:hover': {
                                        backgroundColor: 'transparent',
                                        boxShadow: 2, border: 'none',
                                        fontWeight: 600

                                    }
                                }}
                            >
                                Sign Up
                            </Button>
                        </Link>
                </Box>
            </Box>
            <AppAlert
                alertType="error"
                show={error !== ''}
                message={error}
                onClose={() => setError('')}
            />
        </PublicLayout>
    )
}

export default ForgotPasswordPage;