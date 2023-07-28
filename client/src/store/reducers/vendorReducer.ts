import { IThunkAPIStatus } from '@app-types';
import { createSlice } from '@reduxjs/toolkit';

import {
    getVendorAction,
    getVendorsAction
} from '../actions/vendorActions';
import { IVendor } from '@app-models';

interface IVendorState {
    getVendorStatus: IThunkAPIStatus;
    getVendorSuccess: string;
    getVendorError?: string;
  
    getVendorsStatus: IThunkAPIStatus;
    getVendorsSuccess: string;
    getVendorsError?: string;

    vendors: IVendor[];
    vendor: IVendor | null;
}

const initialState: IVendorState = {
    getVendorError: '',
    getVendorStatus: 'idle',
    getVendorSuccess: '',
    getVendorsError: '',
    getVendorsStatus: 'idle',
    getVendorsSuccess: '',

    vendors: [],
    vendor: null
};

const vendorSlice = createSlice({
    name: 'vendors',
    initialState,
    reducers: {
      clearGetVendorsStatus(state: IVendorState) {
        state.getVendorsStatus = 'idle';
        state.getVendorsSuccess = '';
        state.getVendorsError = '';
      },
      clearGetVendorStatus(state: IVendorState) {
        state.getVendorStatus = 'idle';
        state.getVendorSuccess = '';
        state.getVendorError = '';
      },
    },
    extraReducers: builder => {
        builder
            .addCase(getVendorsAction.pending, state => {
                state.getVendorsStatus = 'loading';
            })
            .addCase(getVendorsAction.fulfilled, (state, action) => {
                state.getVendorsStatus = 'completed';
                state.getVendorsSuccess = action.payload.message;
                state.vendors = action.payload.results as IVendor[];
            })
            .addCase(getVendorsAction.rejected, (state, action) => {
                state.getVendorsStatus = 'failed';

                if (action.payload) {
                state.getVendorsError = action.payload.message;
                } else state.getVendorsError = action.error.message;
            });

        builder
            .addCase(getVendorAction.pending, state => {
                state.getVendorStatus = 'loading';
            })
            .addCase(getVendorAction.fulfilled, (state, action) => {
                state.getVendorStatus = 'completed';
                state.getVendorSuccess = action.payload.message;
                state.vendor = action.payload.result as IVendor;
            })
            .addCase(getVendorAction.rejected, (state, action) => {
                state.getVendorStatus = 'failed';

                if (action.payload) {
                state.getVendorError = action.payload.message;
                } else state.getVendorError = action.error.message;
            });
    }
});

export const { 
    clearGetVendorStatus,
    clearGetVendorsStatus
 } = vendorSlice.actions;
export default vendorSlice.reducer;

