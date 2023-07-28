import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import {
    getPlansHandler,
    getTransactionByRefHandler,
    getTransactionsHandler,
    getVendorTransactionsHandler,
    initTransactionCallbackHandler,
    premiumPlanHandler,
    standardPlanHandler,
    trialPlanHandler,
    updateTransactionHandler
} from '../../routes/subscriptionRoute';

const subscriptionEndpoints: RouteEndpoint  = [
    {
        name: 'fetch plans',
        method: 'get',
        path: '/plans',
        handler: getPlansHandler
    },
    {
        name: 'trial plan',
        method: 'post',
        path: '/trial-plan/:planId',
        handler: trialPlanHandler
    },
    {
        name: 'standard plan',
        method: 'post',
        path: '/standard-plan/:planId',
        handler: standardPlanHandler
    },
    {
        name: 'premium plan',
        method: 'post',
        path: '/premium-plan/:planId',
        handler: premiumPlanHandler
    },
    {
        name: 'paystack init transaction callback',
        method: 'get',
        path: '/transaction/initialize',
        handler: initTransactionCallbackHandler
    },
    {
        name: 'update transaction',
        method: 'put',
        path: '/update-transactions',
        handler: updateTransactionHandler
    },
    {
        name: 'get vendor transactions',
        method: 'get',
        path: '/transactions/vendor',
        handler: getVendorTransactionsHandler
    },
    {
        name: 'get transactions',
        method: 'get',
        path: '/transactions',
        handler: getTransactionsHandler
    },
    {
        name: 'get transaction by ref',
        method: 'post',
        path: '/transaction-ref',
        handler: getTransactionByRefHandler
    },
];

export default subscriptionEndpoints;