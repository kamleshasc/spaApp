import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {verifyForgotOtp} from '../../Action/authAction';

interface VerifyForgotOtpState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: VerifyForgotOtpState = {
  data: null,
  isLoader: false,
  errorMsg: '',
  isError: false,
};

export const verifyForgotOtpSlice = createSlice({
  name: 'verifyForgotOtp',
  initialState,
  reducers: {
    clearVerifyForgotOtpErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(verifyForgotOtp.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        verifyForgotOtp.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        verifyForgotOtp.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.errorMsg = action.payload;
          state.isError = true;
        },
      );
  },
});

export const {clearVerifyForgotOtpErrorMessage} = verifyForgotOtpSlice.actions;
export default verifyForgotOtpSlice.reducer;
