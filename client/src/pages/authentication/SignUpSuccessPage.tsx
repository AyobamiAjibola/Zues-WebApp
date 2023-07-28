import React, { useEffect, useRef, useState } from "react";
import PublicLayout from "../../components/layouts/PublicLayout";
import { useStyles } from "./style";
import { Box, Button, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import settings from "../../config/settings";
import { ArrowRightAlt } from "@mui/icons-material";
import Confetti from 'react-confetti'
import useAppSelector from "../../hooks/useAppSelector";
import { clearSignUpStatus } from "../../store/reducers/authenticationReducer";
import useAppDispatch from "../../hooks/useAppDispatch";
import { SCREEN_WIDTH } from "../../config/constants";

function SignUpSuccessPage() {
    const classes = useStyles();
    const parentRef = useRef(null);
    const [parentWidth, setParentWidth] = useState(0);
    const [parentHeight, setParentHeight] = useState(0);
  
    const dispatch = useAppDispatch();
    const authReducer = useAppSelector(state => state.authenticationReducer);

    useEffect(() => {
      const parentElement = parentRef.current;

      if (parentElement) {
        const { clientWidth, clientHeight } = parentElement;
        setParentWidth(clientWidth);
        setParentHeight(clientHeight);
      }
    }, []);

    useEffect(() => {
        if(authReducer.signUpStatus === 'completed') {
            dispatch(clearSignUpStatus())
        }
    },[authReducer.signUpStatus]);

    const screenWidth = document.documentElement.clientWidth;

    return (
        <PublicLayout>
            <Box className={classes.congratWrapper}>
                <Box className={classes.congratContainer}>
                    <Box
                      ref={parentRef}
                      sx={{
                        width: '100%',
                        height: '100%',
                        position: 'relative'
                      }}
                    >
                      <Confetti
                        width={parentWidth}
                        height={parentHeight}
                      />
                    </Box>
                    <Typography
                        sx={{
                            fontSize: '2rem',
                            fontWeight: 700,
                            textAlign: 'center',
                            my: 4
                        }}
                    >
                        Welcome to Zues!
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 700,
                            textAlign: 'center',
                            opacity: '60%', mb: -0.5
                        }}
                    >
                        With long experience in the industry, we
                    </Typography>
                    <Typography
                        sx={{
                            fontSize: '14px',
                            fontWeight: 700,
                            textAlign: 'center',
                            opacity: '60%'
                        }}
                    >
                        create the best quality products
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
                            endIcon={<ArrowRightAlt/>                           }
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
                            Get started
                        </Button>
                    </Link>
                </Box>
            </Box>
        </PublicLayout>
    )
}

export default SignUpSuccessPage;