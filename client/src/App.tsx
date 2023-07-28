import React from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';
import useAppTheme from './hooks/useAppTheme';
import MainLayout from './components/layouts/MainLayout';
import AppLoader from './components/loader/AppLoader';
import useAppSelector from './hooks/useAppSelector';

function App() {
    const { theme } = useAppTheme();

    const authReducer = useAppSelector(state => state.authenticationReducer);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <MainLayout />
            <AppLoader
                show={authReducer.signOutStatus === 'loading'} 
            />
        </ThemeProvider>
    );
}

export default App;