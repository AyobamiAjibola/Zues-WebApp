import React from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Box, Button, IconButton, Typography } from "@mui/material";
import withErrorBoundary from "../../hoc/withErrorBoundary";
import { useStyles } from "./style";
import settings from "../../config/settings";
import useAppDispatch from "../../hooks/useAppDispatch";
import { Formik } from "formik";

//@ts-ignore
import iconImage from '../../assets/images/img.png';
//@ts-ignore
import instagram from '../../assets/images/instagram.png';
//@ts-ignore
import google from '../../assets/images/google.png';
//@ts-ignore
import facebook from '../../assets/images/facebook.png';
import { Link } from "react-router-dom";
import SignUpForm from "../../components/forms/authentication/SignUpForm";
import { ISignUpModel } from "@app-interfaces";
import signUpModel from "../../components/forms/model/signUpModel";
import { signUpAction } from "../../store/actions/authenticationActions";
import AppAlert from "../../components/alerts/AppAlert";
import useSignUp from "../../hooks/useSignUp";

function SignUpPage () {
    const classes = useStyles();
    const dispatch = useAppDispatch();
    const signUp = useSignUp()

    const handleSignUp = (values: ISignUpModel) => {
      dispatch(signUpAction(values));
      // formikHelpers.resetForm();
    };
    
    return (
      <PublicLayout>
          <Box className={classes.leftLoginBackgroundImageSignUp}>
            <Box className={classes.leftWrapper}>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', mb: 3
                }}
              >
                <Typography
                  sx={{
                    fontSize: "2.8rem",
                    fontWeight: 900,
                    color: 'white',  mt: 1.5
                  }}
                >
                  Welcome Back!
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    color: 'white', alignText: 'center'
                  }}
                >
                  To keep connected with us please
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                <Typography
                  sx={{
                    fontSize: '16px',
                    color: 'white', alignText: 'center',
                    mr: 1
                  }}
                >
                  login with your personal info
                </Typography>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center', mt: 8
                }}
              >
                <Link to='/'
                  style={{
                    textDecoration: 'none',
                    color: 'white', width: '100%',
                    textAlign: 'center'
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
                      SIGN IN
                  </Button>
                </Link>
              </Box>
            </Box>
          </Box>
          <Box className={classes.rightLoginBackgroundImageSignUp}>
            <Box className={classes.rightWrapperSignUp}>
              <Typography
                sx={{
                  fontSize: '2rem',
                  fontWeight: 800,
                  color: settings.primary_color
                }}
              >
                Create Account
              </Typography>
              <Box className={classes.appIconWrapper} mt={2}>
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
                  color: '#979797',
                  fontSize: '1rem', mt: '1.5rem',
                  width: '100%', textAlign: 'center'
                }}
              >
                or use your email account for registration
              </Typography>
              <Formik
                initialValues={signUpModel.initialValues}
                validationSchema={signUpModel.schema}
                onSubmit={handleSignUp}
              >
                <SignUpForm/>
              </Formik>
              <AppAlert
                alertType="success"
                show={signUp.success !== undefined}
                message={signUp.success?.message}
                onClose={signUp.clearSuccess}
              />
              <AppAlert
                alertType="error"
                show={signUp.error !== undefined}
                message={signUp.error?.message}
                onClose={signUp.clearError}
              />
            </Box>
          </Box>
      </PublicLayout>
    )
}

export default withErrorBoundary(SignUpPage);