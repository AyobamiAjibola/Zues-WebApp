import React, { useEffect, useState } from 'react';
import { Form, useFormikContext } from 'formik';
import { FormLabel, Grid, InputAdornment } from '@mui/material';
import TextInputField from '../fields/TextInputField';
import { Lock, Visibility, VisibilityOff } from '@mui/icons-material';

import { IChangePasswordModel } from '@app-interfaces';
import { LoadingButton } from '@mui/lab';
import useAppSelector from '../../../hooks/useAppSelector';
import { makeStyles } from "@mui/styles";
import settings from '../../../config/settings';
import changePasswordModel from '../model/changePasswordModel';
import AppAlert from '../../alerts/AppAlert';
import { CustomHookMessage } from '@app-types';
import { SCREEN_WIDTH } from '../../../config/constants';

const useStyles = makeStyles({
    customTextField: {
        '& .MuiOutlinedInput-root': {
          borderRadius: '10px',
          backgroundColor: 'whitesmoke',
          width: '100%', border: '1px lightgrey solid',

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

function ChangePasswordForm() {
  const classes = useStyles();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [fieldType, setFieldType] = useState<string>('password');
  const [error, setError] = useState<CustomHookMessage>();

  const { handleChange, handleBlur, values } = useFormikContext<IChangePasswordModel>();

  const authReducer = useAppSelector(state => state.authenticationReducer);

  const togglePasswordVisibility = () => {
    setFieldType(fieldType === 'text' ? 'password' : 'text');
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    if(authReducer.changePasswordStatus === 'failed') {
      setError({message: authReducer.changePasswordError})
    }
  },[authReducer.changePasswordStatus]);

  const screenWidth = document.documentElement.clientWidth;

  return (
    <Form autoComplete="off" className="formContainer"
      style={{
        width: '100%', display: 'flex',
        justifyContent: 'center', alignItems: 'center',
      }}
    >
      <Grid container direction="column" justifyContent='center'
        alignItems='center'
        sx={{
          width: screenWidth <= SCREEN_WIDTH ? '70%' : '30%'
        }}
      >
        <Grid container item xs={12} md={6} mt={screenWidth <= SCREEN_WIDTH ? 4 : 8}
          direction="column"
          sx={{width: '100%'}}
        >
          <FormLabel sx={{fontWeight: 600, fontSize:'16px', color: 'black'}}>
            Enter New Password
          </FormLabel>
          <TextInputField
            sx={{mt: 0, mb: 6, height: '2rem'}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            name={changePasswordModel.fields.password.name}
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
        <Grid container item xs={12} md={6} direction="column"
          sx={{width: '100%'}}
        >
          <FormLabel sx={{fontWeight: 600, fontSize:'16px', color: 'black'}}>
            Confirm Password
          </FormLabel>
          <TextInputField
            sx={{mt: 0, mb: 4}}
            className={classes.customTextField}
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.confirmPassword}
            name={changePasswordModel.fields.confirmPassword.name}
            type={fieldType}
            placeholder='Confirm Password'
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
        <Grid item justifyContent="center" alignItems="center" container xs
          sx={{width: '100%'}}
        >
          <LoadingButton
            loading={authReducer.changePasswordStatus === 'loading'}
            type="submit"
            size="large"
            variant="contained"
            sx={{
              width: '100%',
              height: '2.6rem',
              borderRadius: '0.6rem',
              backgroundColor: settings.primary_color,
              boxShadow: 'none',
              '&:hover': {
                backgroundColor: 'transparent',
                boxShadow: '3', color: settings.primary_color,
                fontWeight: 500
              }
            }}
          >
            Send
          </LoadingButton>
        </Grid>
      </Grid>
      <AppAlert
        alertType="error"
        show={error !== undefined}
        message={error?.message}
        onClose={() => setError(undefined)}
      />
    </Form>
  );
}

export default ChangePasswordForm;
