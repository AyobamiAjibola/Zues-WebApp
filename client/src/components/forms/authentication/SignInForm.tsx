import React, { useState } from 'react';
import { Form, useFormikContext } from 'formik';
import { Grid, InputAdornment } from '@mui/material';
import TextInputField from '../fields/TextInputField';
import { Email, Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import { ISignInModel } from '@app-interfaces';
import { LoadingButton } from '@mui/lab';
import useAppSelector from '../../../hooks/useAppSelector';
import './signInForms.css';
import { Link } from 'react-router-dom';
import signInModel from '../model/signInModel';
import { makeStyles } from "@mui/styles";
import settings from '../../../config/settings';

const useStyles = makeStyles({
    customTextField: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '0',
          backgroundColor: '#ECECEC',
          width: '18rem',

          "&:hover": {
            backgroundColor: "lightgray", // Change the background color on hover
            boxShadow: "none", // Remove the box shadow on hover
            border: 'none'
          },
    
          // Active (focus) styles
          "&:focus": {
            borderColor: "transparent",
            boxShadow: "none",
            backgroundColor: 'transparent'
          },
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "transparent",
            borderRadius: '0'

        },
        "& .MuiOutlinedInput-input": {
            backgroundColor: "transparent",
            borderRadius: '0',

            // Hover styles
            "&:hover": {
                backgroundColor: "transparent"
            },

            // Active (focus) styles
            "&:focus": {
                backgroundColor: "transparent",
                borderColor: "transparent",
                boxShadow: "none"
            },
        }
    },
    forgotPass: {
        color: 'black',
        textDecoration: 'none',
        fontSize: '12px',

        "&:hover": {
            color: settings.primary_color,
            fontWeight: 600
        }
    },
    createAccount: {
        fontWeight: 600,
        textDecoration: 'none',
        color: '#B4AEAE',
        fontSize: '13px',
        borderBottom: '0.5px #eaba7e solid',

        "&:hover": {
            color: settings.primary_color,
            borderBottom: '0.5px #B4AEAE solid'
        }
    }
});

function SignInForm() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>('password');

  const { handleChange, handleBlur, values } = useFormikContext<ISignInModel>();

  const authReducer = useAppSelector(state => state.authenticationReducer);

  const togglePasswordVisibility = () => {
    setFieldType(fieldType === 'text' ? 'password' : 'text');
    setShowPassword(!showPassword);
  };

  return (
    <Form autoComplete="off" className="formContainer">
      <Grid container direction="column">
        <Grid item xs={12} md={6}>
          <TextInputField
            sx={{mb: 2.5, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder='Email'
            name={signInModel.fields.email.name}
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
        <Grid item xs={12} md={6}>
          <TextInputField
            sx={{mt: 2, mb: -0.6, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name={signInModel.fields.password.name}
            type={fieldType}
            placeholder='Password'
            margin="normal"
            InputLabelProps={{
                shrink: true,
              }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock sx={{color: '#B4AEAE', fontSize: '1.3rem'}}/>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment onClick={togglePasswordVisibility} position="start" sx={{ cursor: 'pointer' }}>
                  {showPassword ? <VisibilityOff sx={{fontSize: '1.3rem'}}/> : <Visibility sx={{fontSize: '1.3rem'}}/>}
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item container xs spacing={2} my={3} justifyContent="center" alignItems="center" mt={4}>
          <Grid item xs={12}
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
            }}
        >
            <Link className={classes.forgotPass}
                to="/forgot-password"
            >
              Forgot your password?
            </Link>
          </Grid>
        </Grid>
        <Grid item justifyContent="center" alignItems="center" container xs mt={2}>
          <LoadingButton
            loading={authReducer.signingInStatus === 'loading'}
            type="submit"
            size="large"
            variant="contained"
            sx={{
                width: '60%',
                height: '2.6rem',
                borderRadius: '1.3rem',
                backgroundColor: settings.primary_color,
                boxShadow: 'none',
                '&:hover': {
                    backgroundColor: 'transparent',
                    boxShadow: '3', color: settings.primary_color,
                    fontWeight: 500
                }
            }}
          >
            Login
          </LoadingButton>
        </Grid>
        <Grid item justifyContent="center" alignItems="center" container xs mt={2}>
            <Link className={classes.createAccount}
              to="/sign-up"
            >
              Create an account
            </Link>
        </Grid>
      </Grid>
    </Form>
  );
}

export default SignInForm;
