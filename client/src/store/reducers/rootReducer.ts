import { combineReducers } from '@reduxjs/toolkit';
import authenticationReducer from './authenticationReducer';
import vendorReducer from './vendorReducer';

const rootReducer = combineReducers({
    authenticationReducer,
    vendorReducer
});

export default rootReducer;
