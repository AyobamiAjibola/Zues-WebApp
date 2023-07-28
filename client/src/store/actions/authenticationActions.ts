import axiosClient from '../../config/axiosClient';
import settings from '../../config/settings';
import asyncThunkWrapper from '../../helpers/asyncThunkWrapper';
import { ApiResponseSuccess, IChangePasswordModel } from '@app-interfaces';
import { ISignUpModel } from '../../components/forms/model/signUpModel';

const SIGN_IN = 'authentication:SIGN_IN';
const SIGN_UP = 'authentication:SIGN_UP';
const SIGN_OUT = 'authentication:SIGN_OUT';
const CHANGE_PASSWORD_AFTER_RESET = 'authentication:CHANGE_PASSWORD_AFTER_RESET';
const API_ROOT = settings.api.rest;

export const signInAction = asyncThunkWrapper<ApiResponseSuccess<string>, any>(SIGN_IN, async (args: any) => {
  const response = await axiosClient.post(`${API_ROOT}/sign-in-vendor`, args);

  return response.data;
});

export const signUpAction = asyncThunkWrapper<ApiResponseSuccess<string>, ISignUpModel>(
  SIGN_UP,
  async args => {
    const response = await axiosClient.post(`${API_ROOT}/sign-up-vendor`, args);

    return response.data;
  },
);

export const changePasswordAfterResetAction = asyncThunkWrapper<ApiResponseSuccess<string>, IChangePasswordModel>(
  CHANGE_PASSWORD_AFTER_RESET,
  async args => {
    const response = await axiosClient.put(`${API_ROOT}/password-reset/save-password`, args);

    return response.data;
  },
);

export const signOutAction = asyncThunkWrapper<ApiResponseSuccess<null>, void>(SIGN_OUT, async () => {
  const response = await axiosClient.get(`${API_ROOT}/sign-out`);

  return response.data;
});
