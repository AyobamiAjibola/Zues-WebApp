//@ts-nocheck
import { makeStyles } from "@mui/styles";
import coverImageRight from '../../assets/images/coverImageRight.jpeg';
import coverImageLeft from '../../assets/images/coverImageLeft.png';
import coverSignUpImageRight from '../../assets/images/coverRightSignUpImg.png';
import coverSignUpImageLeft from '../../assets/images/coverLeftSignUpImg.png';
import coverForgotPassword from '../../assets/images/forgotPasswordBg.png';
import coverForgotPasswordContainer from '../../assets/images/forgotPasswordCenterBg.png';

export const useStyles = makeStyles((theme) => ({
  rightLoginBackgroundImage: {
    width: '50%',
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    height: '100vh',
    backgroundImage: `url(${coverImageRight})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  leftLoginBackgroundImage: {
    width: '50%',
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    height: '100vh',
    backgroundImage: `url(${coverImageLeft})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  rightLoginBackgroundImageSignUp: {
    width: '50%',
    right: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    height: '100vh',
    backgroundImage: `url(${coverSignUpImageRight})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      width: '100%'
    },
  },
  leftLoginBackgroundImageSignUp: {
    width: '50%',
    left: 0,
    top: 0,
    bottom: 0,
    position: 'absolute',
    height: '100vh',
    backgroundImage: `url(${coverSignUpImageLeft})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      display: 'none'
    },
  },
  leftWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', height: '100%'
  },
  rightWrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '70%', height: '100%'
  },
  rightWrapperSignUp: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%', height: '100%'
  },
  appIconWrapper: {
    display: 'flex',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12
  },
  forgotPasswordWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${coverForgotPassword})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'none',
    },
  },
  forgotPasswordContainer: {
    width: '80%',
    height: '85%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${coverForgotPasswordContainer})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  },
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
  customTextFieldForgotPassword: {
    '& .MuiOutlinedInput-root': {
      borderRadius: '0',
      backgroundColor: '#ECECEC',
      width: '18rem',
      border: '1px #eaba7e solid',

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
  congratWrapper: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundImage: `url(${coverForgotPassword})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      backgroundImage: 'none',
    },
  },
  congratContainer: {
    width: '80%',
    height: '85%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundImage: `url(${coverForgotPasswordContainer})`,
    backgroundSize: "100% 100%",
    backgroundPosition: "center",

    [theme.breakpoints.down('sm')]: {
      width: '100%',
      height: '100%',
    },
  }
}))