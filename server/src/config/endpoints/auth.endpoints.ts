import {
    // facebookOAutCallbackhHandler,
    // facebookOAuthHandler,
    googleOAutCallbackhHandler,
    loginFailedHandler,
    googleOAuthHandler,
    signInHandler_Admin,
    signInHandler_Vendor,
    signupHandler_Vendor,
    facebookOAuthHandler,
    facebookOAutCallbackhHandler,
    instagramOAuthHandler,
    instagramOAutCallbackhHandler,
} from '../../routes/authRoute';

import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;

const authEndpoints: RouteEndpoint  = [
    {
        name: 'signIn-admin',
        method: 'post',
        path: '/sign-in-admin',
        handler: signInHandler_Admin
    },
    {
        name: 'signIn vendor',
        method: 'post',
        path: '/sign-in-vendor',
        handler: signInHandler_Vendor
    },
    {
        name: 'signUp vendor',
        method: 'post',
        path: '/sign-up-vendor',
        handler: signupHandler_Vendor
    },
    {
        name: 'google OAuth',
        method: 'get',
        path: '/google',
        handler: googleOAuthHandler
    },
    {
        name: 'google OAuth callback',
        method: 'get',
        path: '/google/callback',
        handler: googleOAutCallbackhHandler
    },
    {
        name: 'facebook OAuth',
        method: 'get',
        path: '/facebook',
        handler: facebookOAuthHandler
    },
    {
        name: 'facebook OAuth callback',
        method: 'get',
        path: '/facebook/callback',
        handler: facebookOAutCallbackhHandler
    },
    {
        name: 'instagram OAuth',
        method: 'get',
        path: '/instagram',
        handler: instagramOAuthHandler
    },
    {
        name: 'instagram OAuth callback',
        method: 'get',
        path: '/instagram/callback',
        handler: instagramOAutCallbackhHandler
    },
    {
        name: 'login failed',
        method: 'get',
        path: '/google/failed',
        handler: loginFailedHandler
    }
]

export default authEndpoints;