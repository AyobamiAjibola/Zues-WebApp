import {
  signInHandler_Admin,
  signInHandler_Vendor,
  signupHandler_Vendor,
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
    }
]

export default authEndpoints;