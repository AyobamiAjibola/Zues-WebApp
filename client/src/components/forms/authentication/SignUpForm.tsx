import React, { useState } from 'react';
import { Form, useFormikContext } from 'formik';
import { Box, Checkbox, Grid, InputAdornment, Typography } from '@mui/material';
import TextInputField from '../fields/TextInputField';
import { Email, Lock, Person, Visibility, VisibilityOff } from '@mui/icons-material';

import { ISignUpModel } from '@app-interfaces';
import { LoadingButton } from '@mui/lab';
import useAppSelector from '../../../hooks/useAppSelector';
import './signInForms.css';
import { Link } from 'react-router-dom';
import { makeStyles } from "@mui/styles";
import settings from '../../../config/settings';
import signUpModel from '../model/signUpModel';

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

function SignUpForm() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>('password');
  const [isChecked, setIsChecked] = useState(false);

  const handleChecked = (event: any) => {
    setIsChecked(event.target.checked);
  };

  const formikProps = useFormikContext<ISignUpModel>();
  const { handleChange, handleBlur, values } = formikProps;

  const authReducer = useAppSelector(state => state.authenticationReducer);

  const togglePasswordVisibility = () => {
    setFieldType(fieldType === 'text' ? 'password' : 'text');
    setShowPassword(!showPassword);
  };

  return (
    <Form autoComplete="off" className="formContainer">
      <Grid container direction="column" justifyContent='center' alignItems='center'>
        <Grid item xs={12} md={6}>
          <TextInputField
            sx={{mb: 2.5, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.firstName}
            placeholder='First Name'
            name={signUpModel.fields.firstName.name}
            margin="normal"
            InputLabelProps={{
                shrink: true,
              }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{color: '#B4AEAE', fontSize: '1.3rem'}}/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputField
            sx={{mb: 2.5, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.lastName}
            placeholder='Last Name'
            name={signUpModel.fields.lastName.name}
            margin="normal"
            InputLabelProps={{
                shrink: true,
              }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person sx={{color: '#B4AEAE', fontSize: '1.3rem'}}/>
                </InputAdornment>
              ),
            }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextInputField
            sx={{mb: 2.5, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            placeholder='Email'
            name={signUpModel.fields.email.name}
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
            sx={{mt: 2, mb: 3, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name={signUpModel.fields.password.name}
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
          {formikProps.errors.password === 'Invalid password' && formikProps.touched.password && (
            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%'}}>
              <Typography sx={{color: 'red', width: '52%', fontSize: '11.5px'}}>
                Password must contain 8 to 20 characters,
                and at least One, uppercase letter, lowercase letter, 
                and number
              </Typography>
            </Box>
          )}

        <Grid item container xs spacing={2} my={2} justifyContent="center" alignItems="center">
          <Grid item xs={12}
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <Checkbox
              checked={isChecked}
              onChange={handleChecked}
              sx={{
                color: settings.primary_color,
                '&.Mui-checked': {
                  '& .MuiSvgIcon-root': {
                    fill: settings.primary_color
                  },
                },
              }}
            />
            <Typography sx={{fontWeight: 600, fontSize: '13px', color: '#B4AEAE'}}>
              I agree to the&nbsp;
            </Typography>
            <Typography
              sx={{
                color: settings.primary_color,
                fontWeight: 600, fontSize: '13px',
                '&:hover': {cursor: 'pointer'}
              }}
            >
              terms of service&nbsp;
            </Typography>
            <Typography sx={{fontWeight: 600, fontSize: '13px', color: '#B4AEAE'}}>
              &&nbsp;
            </Typography>
            <Typography
              sx={{
                color: settings.primary_color,
                fontWeight: 600, fontSize: '13px',
                '&:hover': {cursor: 'pointer'}
              }}
            >
              privacy policy.
            </Typography>
          </Grid>
        </Grid>
        <Grid item justifyContent="center" alignItems="center" container xs>
          <LoadingButton
            loading={authReducer.signUpStatus === 'loading'}
            type="submit"
            size="large"
            variant="contained"
            disabled={!isChecked}
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
            Sign Up
          </LoadingButton>
        </Grid>
        <Grid item justifyContent="center" alignItems="center" container xs mt={2}>
            <Link className={classes.createAccount}
                to="/sign-in"
            >
              Already a member
            </Link>
        </Grid>
      </Grid>
    </Form>
  );
}

export default SignUpForm;
