import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoints = appCommonTypes.RouteEndpoints;
import {
    changeVendorPasswordHandler,
    deleteVendorAddressHandler,
    deleteVendorHandler,
    getSingleVendorAddressHandler,
    getVendorHandler,
    getVendorsHandler,
    resetVendorPasswordHandler,
    saveVendorAddressHandler,
    saveVendorPasswordHandler,
    updateVendorAddressHandler,
    updateVendorHandler,
    updateVendorStatusHandler,
    enterResetCodeHandler
} from '../../routes/vendorRoute';

const vendorEndpoints: RouteEndpoints = [
    {
        name: 'update vendor',
        method: 'put',
        path: '/vendor-update/:vendorId',
        handler: updateVendorHandler
    },
    {
        name: 'update vendor status',
        method: 'put',
        path: '/vendor-status-update/:vendorId',
        handler: updateVendorStatusHandler
    },
    {
        name: 'delete vendor',
        method: 'delete',
        path: '/delete-vendor/:vendorId',
        handler: deleteVendorHandler
    },
    {
        name: 'change vendor password',
        method: 'put',
        path: '/change-vendor-password/:vendorId',
        handler: changeVendorPasswordHandler
    },
    {
        name: 'save vendor password after reset',
        method: 'put',
        path: '/password-reset/save-password',
        handler: saveVendorPasswordHandler
    },
    {
        name: 'reset vendor password',
        method: 'post',
        path: '/password-reset-vendor',
        handler: resetVendorPasswordHandler
    },
    {
        name: 'enter password reset code',
        method: 'post',
        path: '/enter-password-reset-code',
        handler: enterResetCodeHandler
    },
    {
        name: 'fetch vendors',
        method: 'get',
        path: '/vendors',
        handler: getVendorsHandler
    },
    {
        name: 'get vendor',
        method: 'get',
        path: '/vendor/:vendorId',
        handler: getVendorHandler
    },
    {
        name: 'save vendor address',
        method: 'post',
        path: '/vendor-address',
        handler: saveVendorAddressHandler
    },
    {
        name: 'get vendor address',
        method: 'get',
        path: '/vendor-address/:vendorAddressId',
        handler: getSingleVendorAddressHandler
    },
    {
        name: 'update vendor address',
        method: 'put',
        path: '/vendor-address/:vendorAddressId',
        handler: updateVendorAddressHandler
    },
    {
        name: 'delete vendor address',
        method: 'delete',
        path: '/vendor-address/:vendorAddressId',
        handler: deleteVendorAddressHandler
    }
];

export default vendorEndpoints;
