import React, { useEffect, useState } from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { Box } from "@mui/system";
import { useStyles } from "./style";
import { IconButton, Typography } from "@mui/material";
import { ArrowBackOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

//@ts-ignore
import instagram from '../../assets/images/instagram.png';
//@ts-ignore
import google from '../../assets/images/google.png';
//@ts-ignore
import facebook from '../../assets/images/facebook.png';
import AppAlert from "../../components/alerts/AppAlert";
import { Formik, FormikHelpers } from "formik";
import changePasswordModel from "../../components/forms/model/changePasswordModel";
import { IChangePasswordModel } from "@app-interfaces";
import useAppDispatch from "../../hooks/useAppDispatch";
import { changePasswordAfterResetAction } from "../../store/actions/authenticationActions";
import ChangePasswordForm from "../../components/forms/authentication/ChangePasswordForm";
import useAppSelector from "../../hooks/useAppSelector";
import { SCREEN_WIDTH } from "../../config/constants";
// import { clearChangePasswordStatus } from "../../store/reducers/authenticationReducer";

function NewPasswordPage() {
    const classes = useStyles();
    const navigate = useNavigate();
    const [success, setSuccess] = useState<string>('');
    const [error, setError] = useState<string>('');
    const email = sessionStorage.getItem('email');
    const dispatch = useAppDispatch();

    const authReducer = useAppSelector(state => state.authenticationReducer);
 
    const handleChangePassword = (values: IChangePasswordModel, formikHelpers: FormikHelpers<IChangePasswordModel>) => {
        dispatch(changePasswordAfterResetAction({
            password: values.password,
            confirmPassword: values.confirmPassword,
            //@ts-ignore
            email: email
        }));
        formikHelpers.resetForm();
    };

    //if the user clicks the back button
    const handleBackButtonClick = () => {
        sessionStorage.removeItem('email')
    };

    const goBack = () => {
        navigate('-1')
    };

    useEffect(() => {
        window.addEventListener('popstate', handleBackButtonClick);
      
        return () => {
          window.removeEventListener('popstate', handleBackButtonClick);
        };
    }, []);

    useEffect(()  => {
        if(authReducer.changePasswordStatus === 'completed'){
            navigate('/sign-in');
            sessionStorage.removeItem('email');
        }
    },[authReducer.changePasswordStatus]);

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
                        mt: screenWidth <= SCREEN_WIDTH ? -20 : -3,
                        mb: screenWidth <= SCREEN_WIDTH ? 4 : 0
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
                        New Password
                    </Typography>
                    <Formik
                        initialValues={changePasswordModel.initialValues}
                        validationSchema={changePasswordModel.schema}
                        onSubmit={handleChangePassword}
                    >
                        <ChangePasswordForm />
                    </Formik>
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

export default NewPasswordPage;