import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Box } from "@mui/system";
import { useStyles } from "./style";
import { Alert, Grid, IconButton, Typography } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import settings from "../../config/settings";
import { useNavigate } from "react-router-dom";
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

function VerificationPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [token, setToken] = useState<string>('');
    const [verificationCode, setVerificationCode] = useState<string[]>(Array(4).fill(''));
    const inputRefs = useRef<(HTMLInputElement | null)[]>(Array(4).fill(null));
    const email = sessionStorage.getItem('email');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const sendPasswordResetCode = async () => {
        try {
            setIsLoading(true);
            const passwordResetCode = token
            const response = await axiosClient.post(`${API_ROOT}/enter-password-reset-code`, {
                email, passwordResetCode
            });
            
            if(response.data.code === 200){
                sessionStorage.removeItem('reset_msg');
                setVerificationCode(Array(4).fill(''));
                setIsLoading(false);
                navigate('/change-password')
            }
            

        } catch (error: any) {
            setIsLoading(false);
            setVerificationCode(Array(4).fill(''))
            setError(error.response.data.message)
        }
    };

    const handleForgotPassword = async () => {
        try {
            const response = await axiosClient.post(`${API_ROOT}/password-reset-vendor`, {
                email
            });
            const data = response.data;
            if(data.code === 200){
                setSuccess('Successfully sent reset code to your email')
            }

        } catch (error: any) {
            setError(error.response.data.message)
        }
    };

    //if the user clicks the back button
    const handleBackButtonClick = () => {
        sessionStorage.removeItem('reset_msg');
        sessionStorage.removeItem('email')
    };

    const goBack = () => {
        navigate(-1)
    };

    const handleInputChange = (index: number, value: string) => {
        const updatedCode = [...verificationCode];
        updatedCode[index] = value;
        setVerificationCode(updatedCode);

        if (value !== '') {
        if (index < verificationCode.length - 1 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1]?.focus();
        }
        }
    };

    const handleInputKeyDown = (index: number, event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Backspace' && index > 0 && verificationCode[index] === '') {
        inputRefs.current[index - 1]?.focus();
        }
    };

    useEffect(() => {
        if(verificationCode) {
            setToken(verificationCode.join(''))
        }
    },[verificationCode]);

    useEffect(() => {
        window.addEventListener('popstate', handleBackButtonClick);
      
        return () => {
          window.removeEventListener('popstate', handleBackButtonClick);
        };
    }, []);
      

    const reset_message = sessionStorage.getItem('reset_msg');
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
                        width: '100%', ml: 10,
                        mt: screenWidth <= SCREEN_WIDTH ? -14 : -3,
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
                        fontSize: '1.8rem',
                        fontWeight: '900'
                        }}
                    >
                        Verification
                    </Typography>
                    <Typography
                        sx={{
                            fontWeight: 600,
                            fontSize: '14px',
                            my: 3
                        }}
                    >Enter Verification Code</Typography>
                    <Grid item xs={12} md={6} mb={3} justifyContent='center' alignItems='center'>
                      {verificationCode.map((digit, index) => (
                        <input
                            style={{
                                width: '50px',
                                height: '51px',
                                margin: screenWidth <= SCREEN_WIDTH ? '8px' : '25px',
                                fontSize: '20px',
                                textAlign: 'center',
                                border: '2px solid #B4AEAE',
                                borderRadius: '50%'
                            }}
                            key={index}
                            ref={(el) => (inputRefs.current[index] = el)}
                            type="text"
                            value={digit}
                            maxLength={1}
                            onChange={(e) => handleInputChange(index, e.target.value)}
                            onKeyDown={(e) => handleInputKeyDown(index, e)}
                        />
                      ))}
                    </Grid>
                    <Box
                        sx={{
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center', mb: 3
                        }}
                    >
                      <Typography
                        style={{
                            fontWeight: 700,
                            color: '#B4AEAE',
                            textDecoration: 'none',
                            fontSize: '14px'
                        }}
                      >
                        If you did'nt receive a code,&nbsp;
                      </Typography>
                      <Typography
                        onClick={handleForgotPassword}
                        style={{
                            fontWeight: 700,
                            color: settings.primary_color,
                            textDecoration: 'none',
                            fontSize: '14px',
                            cursor: 'pointer'
                        }}
                      >
                        resend
                      </Typography>
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
                        onClick={sendPasswordResetCode}
                        sx={{
                            width: screenWidth <= SCREEN_WIDTH ? '65%' : '30%',
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
                    <Box
                        sx={{
                        width: '40%', height: '2rem', mt: 8,
                        display: 'flex', justifyContent: 'center',
                        alignItems: 'center'
                        }}
                    >
                        {reset_message && <Alert severity="success" sx={{width: '100%'}}>
                            {reset_message}
                        </Alert>}
                    </Box>
                </Box> 
            </Box>
            <AppAlert
                alertType="success"
                show={success !== ''}
                message={success}
                onClose={() => setSuccess('')}
            />
            <AppAlert
                alertType="error"
                show={error !== ''}
                message={error}
                onClose={() => setError('')}
            />
        </PublicLayout>
    )
}

export default VerificationPage;