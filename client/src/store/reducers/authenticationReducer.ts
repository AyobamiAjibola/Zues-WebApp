import { createSlice } from '@reduxjs/toolkit';
import jwt_decode from 'jwt-decode';

import { IThunkAPIStatus } from '@app-types';
import { signUpAction, signInAction, signOutAction, changePasswordAfterResetAction } from '../actions/authenticationActions';
import { IPermission } from '@app-models';
import { LOCAL_STORAGE } from '../../config/constants';
import { CustomJwtPayload } from '@app-interfaces';
import settings from '../../config/settings';
import { reload } from '../../utils/generic';

interface IAuthenticationState {
  signingInStatus: IThunkAPIStatus;
  signingInSuccess: string;
  signingInError?: string;

  signUpStatus: IThunkAPIStatus;
  signUpSuccess: string;
  signUpError: string;

  signOutStatus: IThunkAPIStatus;
  signOutSuccess: string;
  signOutError?: string;

  authToken: string;
  permissions: IPermission[];

  changePasswordStatus: IThunkAPIStatus;
  changePasswordSuccess: string;
  changePasswordError?: string;
}

const initialState: IAuthenticationState = {
  signOutError: '',
  signOutStatus: 'idle',
  signOutSuccess: '',
  authToken: '',
  signingInError: '',
  signingInSuccess: '',
  signingInStatus: 'idle',

  signUpStatus: 'idle',
  signUpSuccess: '',
  signUpError: '',

  permissions: [],

  changePasswordStatus: 'idle',
  changePasswordError: '',
  changePasswordSuccess: ''
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearLoginStatus(state: IAuthenticationState) {
      state.signingInStatus = 'idle';
      state.signingInSuccess = '';
      state.signingInError = '';
    },
    clearSignUpStatus(state: IAuthenticationState) {
      state.signUpStatus = 'idle';
      state.signUpSuccess = '';
      state.signUpError = '';
    },
    clearLogoutStatus(state: IAuthenticationState) {
      state.signOutStatus = 'idle';
      state.signOutSuccess = '';
      state.signOutError = '';
    },
    clearChangePasswordStatus(state: IAuthenticationState) {
      state.changePasswordStatus = 'idle';
      state.changePasswordSuccess = '';
      state.changePasswordError = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signInAction.pending, state => {
        state.signingInStatus = 'loading';
      })
      .addCase(signInAction.fulfilled, (state, action) => {
        state.signingInStatus = 'completed';
        state.signingInSuccess = action.payload.message;

        if (action.payload.result) {
          state.authToken = action.payload.result;
          const { permissions } = jwt_decode(state.authToken) as CustomJwtPayload;

          state.permissions = permissions;
          sessionStorage.setItem(LOCAL_STORAGE.permissions, JSON.stringify(permissions));

          sessionStorage.setItem(settings.auth.admin, state.authToken);

          reload();
        }
      })
      .addCase(signInAction.rejected, (state, action) => {
        state.signingInStatus = 'failed';

        if (action.payload) {
          state.signingInError = action.payload.message;
        } else state.signingInError = action.error.message;
      });

    builder
      .addCase(signOutAction.pending, state => {
        state.signOutStatus = 'loading';
      })
      .addCase(signOutAction.fulfilled, (state, action) => {
        state.signOutStatus = 'completed';
        state.signOutSuccess = action.payload.message;
      })
      .addCase(signOutAction.rejected, (state, action) => {
        state.signOutStatus = 'failed';

        if (action.payload) {
          state.signOutError = action.payload.message;
        } else state.signOutError = action.error.message;
      });

    builder
      .addCase(changePasswordAfterResetAction.pending, state => {
        state.changePasswordStatus = 'loading';
      })
      .addCase(changePasswordAfterResetAction.fulfilled, (state, action) => {
        state.changePasswordStatus = 'completed';
        state.changePasswordSuccess = action.payload.message;
      })
      .addCase(changePasswordAfterResetAction.rejected, (state, action) => {
        state.changePasswordStatus = 'failed';

        if (action.payload) {
          state.changePasswordError = action.payload.message;
        } else state.changePasswordError = action.error.message;
      });

    builder
      .addCase(signUpAction.pending, state => {
        state.signUpStatus = 'loading';
      })
      .addCase(signUpAction.fulfilled, (state, action) => {
        state.signUpStatus = 'completed';
        state.signUpSuccess = action.payload.message;
      })
      .addCase(signUpAction.rejected, (state, action) => {
        state.signUpStatus = 'failed';

        if (action.payload) {
          state.signUpError = action.payload.message;
        } else state.signUpError = action.error.message as string;
      });
  },
});

export const {
  clearLoginStatus,
  clearLogoutStatus,
  clearSignUpStatus,
  clearChangePasswordStatus
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
