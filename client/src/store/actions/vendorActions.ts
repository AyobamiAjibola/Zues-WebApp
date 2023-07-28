import { IVendor } from '@app-models';
import axiosClient from '../../config/axiosClient';
import settings from '../../config/settings';
import asyncThunkWrapper from '../../helpers/asyncThunkWrapper';
import { ApiResponseSuccess } from '@app-interfaces';

const GET_VENDOR = 'vendor:GET_VENDOR';
const GET_VENDORS = 'vendor:GET_VENDORS';

const API_ROOT = settings.api.rest;

export const getVendorAction = asyncThunkWrapper<ApiResponseSuccess<IVendor>, string>(GET_VENDOR, async vendorId => {
    const response = await axiosClient.get(`${API_ROOT}/vendor/${vendorId}`);
  
    return response.data;
});

export const getVendorsAction = asyncThunkWrapper<ApiResponseSuccess<IVendor>, void>(GET_VENDORS, async () => {
    const response = await axiosClient.get(`${API_ROOT}/vendors`);

    return response.data;
});