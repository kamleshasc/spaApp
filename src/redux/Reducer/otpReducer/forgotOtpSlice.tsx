import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {forgotPasswordOtp} from '../../Action/otpAction';

interface forgotOtpInitialState {
  data: any;
  isError: boolean;
  errorMessage: string;
  isLoading: boolean;
}

const initialState: forgotOtpInitialState = {
  data: null,
  errorMessage: '',
  isError: false,
  isLoading: false,
};

const forgotOtpSlice = createSlice({
  name: 'forgotOtp',
  initialState,
  reducers: {
    clearForgotOtpDate: state => {
      state.data = null;
      state.errorMessage = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(forgotPasswordOtp.pending, state => {
        state.isLoading = true;
        state.isError = false;
        state.errorMessage = '';
      })
      .addCase(
        forgotPasswordOtp.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.data = action.payload;
          state.isLoading = false;
        },
      )
      .addCase(
        forgotPasswordOtp.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoading = false;
          state.isError = true;
          state.errorMessage = action.payload;
        },
      );
  },
});

export const {clearForgotOtpDate} = forgotOtpSlice.actions;
export default forgotOtpSlice.reducer;
