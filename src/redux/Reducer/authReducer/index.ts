import {combineReducers} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';
import changePasswordSlice from './changePasswordSlice';
import verifyForgotOtpSlice from './verifyForgotOtpSlice';
import resetPasswordSlice from './resetPasswordSlice';

const authReducer = combineReducers({
  login: loginSlice,
  changePassword: changePasswordSlice,
  verifyForgotOtp: verifyForgotOtpSlice,
  resetPassword: resetPasswordSlice,
});

export default authReducer;
