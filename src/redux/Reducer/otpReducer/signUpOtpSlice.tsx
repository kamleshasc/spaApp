import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {signUpOtp} from '../../Action/otpAction';

interface signUpOtpSlice {
  data: any;
  isLoading: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: signUpOtpSlice = {
  data: null,
  isLoading: false,
  isError: false,
  errorMsg: '',
};

export const signUpOtpSlice = createSlice({
  name: 'signUpOtp',
  initialState,
  reducers: {
    clearSignUpOtpData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
      state.isLoading = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUpOtp.pending, state => {
        state.data = null;
        state.isLoading = true;
      })
      .addCase(signUpOtp.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(signUpOtp.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearSignUpOtpData} = signUpOtpSlice.actions;
export default signUpOtpSlice.reducer;
