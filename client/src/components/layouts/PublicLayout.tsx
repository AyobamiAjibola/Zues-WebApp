// import './publicLayout.css';
import { Box } from '@mui/material';
import React from 'react';

export default function PublicLayout({ children }: any) {
  return (
    <Box sx={mainContainerStyle}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          position: 'relative',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}

const mainContainerStyle = {
  height: '100vh',
  width: '100vw',
  backgroundColor: 'transparent',
  backgroundRepeat: 'no-repeat',
  backgroundSize: '100% 100%',
  display: 'flex',
  justifyContent: ' center',
  alignItems: 'center',
};
