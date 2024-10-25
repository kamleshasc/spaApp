import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {resetPassword} from '../../Action/authAction';

interface ResetPasswordState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: ResetPasswordState = {
  data: null,
  isLoader: false,
  errorMsg: '',
  isError: false,
};

export const resetPasswordSlice = createSlice({
  name: 'resetPassword',
  initialState,
  reducers: {
    clearResetPasswordErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(resetPassword.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(resetPassword.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(resetPassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearResetPasswordErrorMessage} = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;
