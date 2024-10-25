import {combineReducers} from '@reduxjs/toolkit';
import signUpOtpSlice from './signUpOtpSlice';
import forgotOtpSlice from './forgotOtpSlice';

const otpReducer = combineReducers({
  signUpOtp: signUpOtpSlice,
  forgotOtp: forgotOtpSlice,
});

export default otpReducer;
