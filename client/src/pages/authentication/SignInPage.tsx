import React, { useEffect, useState } from "react";
import { Box, Button, IconButton, Typography } from "@mui/material";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { useStyles } from "./style";
import settings from "../../config/settings";
import signInModel from "../../components/forms/model/signInModel";
import { ISignInModel } from "@app-interfaces";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Formik, FormikHelpers } from "formik";
import SignInForm from "../../components/forms/authentication/SignInForm";
import useLogin from "../../hooks/useLogin";
import { signInAction } from "../../store/actions/authenticationActions";
import AppAlert from "../../components/alerts/AppAlert";

//@ts-ignore
import iconImage from '../../assets/images/img.png';
//@ts-ignore
import instagram from '../../assets/images/instagram.png';
//@ts-ignore
import google from '../../assets/images/google.png';
//@ts-ignore
import facebook from '../../assets/images/facebook.png';
import { Link } from "react-router-dom";
import useAppSelector from "../../hooks/useAppSelector";
import { CustomHookMessage } from "@app-types";
import { clearChangePasswordStatus } from "../../store/reducers/authenticationReducer";
import { SCREEN_WIDTH } from "../../config/constants";
import PublicLayout from "../../components/layouts/PublicLayout";

const API_ROOT = settings.api.rest;
const BASE_URL = settings.api.baseURL;

function SignInPage () {
    const classes = useStyles();
    const [success, setSuccess] = useState<CustomHookMessage>();

    const dispatch = useAppDispatch();

    const login = useLogin();
    const authReducer = useAppSelector(state => state.authenticationReducer);

    const handleSignIn = (values: ISignInModel, formikHelpers: FormikHelpers<ISignInModel>) => {
        dispatch(signInAction(values));
        formikHelpers.resetForm();
    };

    const googleLogin = () => {
        window.open(`${BASE_URL}${API_ROOT}/google`, "_self");
    }

    const facebookLogin = () => {
        window.open(`${BASE_URL}${API_ROOT}/facebook`, "_self");
    }
    
    const instagramLogin = () => {
        window.open(`${BASE_URL}${API_ROOT}/instagram`, "_self");
    }

    useEffect(() => {
        if(authReducer.changePasswordStatus === 'completed'){
            setSuccess({message: authReducer.changePasswordSuccess})
        }

    },[authReducer.changePasswordStatus]);
    
    useEffect(() => {
        if(authReducer.changePasswordStatus === 'completed' && success === undefined){
            dispatch(clearChangePasswordStatus())
        }
    },[]);

    const screenWidth = document.documentElement.clientWidth;

    return (
        <PublicLayout>
            <Box className={classes.leftLoginBackgroundImage}>
              <Box className={classes.leftWrapper}>
                {screenWidth > SCREEN_WIDTH && <Typography
                  sx={{
                    fontSize: '2.5rem',
                    fontWeight: 800,
                    color: settings.primary_color
                  }}
                >
                  Sign in to zues
                </Typography>}
                {screenWidth <= SCREEN_WIDTH &&
                  <Box
                    sx={{
                        display: 'flex',
                        width: '76%',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}
                  >
                    <Typography
                        sx={{
                            fontSize: '24px',
                            fontWeight: 700,
                            lineHeight: '32px',
                            letterSpacing: '-0.8px',
                            textAlign: 'left', mb: 1
                        }}
                    >Let’s Sign You In</Typography>
                    <Typography
                        sx={{
                            fontWeight: 500,
                            fontSize: '14px',
                            lineHeight: '24px',
                            letterSpacing: '-0.4px',
                            opacity: '60%'
                        }}
                    >Welcome back, you’ve been missed!</Typography>
                  </Box>
                }
                <Box className={classes.appIconWrapper} mt={2}>
                  <IconButton
                    onClick={facebookLogin}
                    disabled
                    sx={{
                       border: '0.3px #E0E0E0 solid',
                       width: '2.3rem', height: '2.3rem'
                    }}
                  >
                    <img src={facebook} alt='facebook-icon' style={{width: '1.2rem'}} />
                  </IconButton>
                  <IconButton
                    onClick={googleLogin}
                    sx={{
                       border: '0.3px #E0E0E0 solid',
                       width: '2.3rem', height: '2.3rem'
                    }}
                  >
                    <img src={google} alt='google-icon' style={{width: '1.4rem', height: '1rem'}} />
                  </IconButton>
                  <IconButton
                    onClick={instagramLogin}
                    disabled
                    sx={{
                       border: '0.3px #E0E0E0 solid',
                       width: '2.3rem', height: '2.3rem'
                    }}
                  >
                    <img src={instagram} alt='instagram-icon' style={{width: '1.3rem'}} />
                  </IconButton>
                </Box>
                <Typography
                  sx={{color: '#979797', fontSize: '1rem', mt: '2.5rem', mb: '2rem'}}
                >
                    or use your email account
                </Typography>
                <Formik
                  initialValues={signInModel.initialValues}
                  validationSchema={signInModel.schema}
                  onSubmit={handleSignIn}
                >
                   <SignInForm/>
                </Formik>
                <AppAlert
                    alertType="success"
                    show={login.success !== undefined}
                    message={login.success?.message}
                    onClose={login.clearSuccess}
                />
                <AppAlert
                    alertType="error"
                    show={login.error !== undefined}
                    message={login.error?.message}
                    onClose={login.clearError}
                />
              </Box>
            </Box>
            <Box className={classes.rightLoginBackgroundImage}>
              <Box className={classes.rightWrapper}>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right'
                    }}
                >
                    <img src={iconImage} alt="" style={{width: '4rem', height: '3.5rem'}}/>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right', mb: 3
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: "2.8rem",
                            fontWeight: 900,
                            color: 'white',  mt: 1.5
                        }}
                    >
                        Hello, Friend!
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right',
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: 'white', alignText: 'center'
                        }}
                    >
                        Enter your personal details and
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right'
                    }}
                >
                    <Typography
                        sx={{
                            fontSize: '16px',
                            color: 'white', alignText: 'center',
                            mr: 1
                        }}
                    >
                        begin your journey with me
                    </Typography>
                </Box>
                <Box
                    sx={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'right',
                        alignItems: 'right', mt: 6
                    }}
                >
                    <Link to='/sign-up'
                        style={{
                        textDecoration: 'none',
                        color: 'white', width: '100%',
                        textAlign: 'right'
                        }}
                    >
                        <Button
                            size="large"
                            variant="contained"
                            sx={{
                                width: '37%',
                                height: '3.3rem',
                                borderRadius: '1.3rem',
                                border: '0.5px white solid',
                                backgroundColor: 'transparent',
                                boxShadow: 'none',
                                color: 'white',
                                '&:hover': {
                                    boxShadow: 'none', color: 'white',
                                    fontWeight: 600, border: '1px white solid',
                                    backgroundColor: 'transparent'
                                }
                            }}
                        >
                            SIGN UP
                        </Button>
                    </Link>
                </Box>
              </Box>
              <AppAlert
                alertType="success"
                show={success !== undefined}
                message={success?.message}
                onClose={() => setSuccess(undefined)}
            />
            </Box>
        </PublicLayout>
    )
}

export default withErrorBoundary(SignInPage);