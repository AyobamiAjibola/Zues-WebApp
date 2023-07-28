import React, { useEffect, useState } from 'react';
import PublicLayout from '../../components/layouts/PublicLayout';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { IComponentErrorState } from '@app-interfaces';

export default function ErrorPage() {
  const [message, setMessage] = useState<string>('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      const state = location.state as IComponentErrorState;
      setMessage(state.errorMessage);
    }
  }, [location.state]);
  console.log(message)
  return (
    <PublicLayout>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100vw',
          height: '100vh'
        }}
      >
        <Typography textAlign="center" variant="caption" gutterBottom component="div"
          sx={{ fontSize: '3rem', fontWeight: 400 }}
        >
          {/* An Error Occurred! {message} */}
          Oops!!!
        </Typography>
        <Typography
          sx={{
            fontSize: '1rem',
            mb: 3, opacity: '60%', mt: -3
          }}
        >
          something went wrong
        </Typography>
        <Grid container spacing={1} justifyContent="center" alignItems="center">
          <Grid item>
            <Button fullWidth onClick={() => navigate('/home')} color="secondary" variant="contained">
              Home
            </Button>
          </Grid>
          <Grid item>
            <Button fullWidth onClick={() => navigate(-1)} color="secondary" variant="contained">
              Go Back
            </Button>
          </Grid>
        </Grid>
      </Box>
    </PublicLayout>
  );
}
