import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {changePassword} from '../../Action/authAction';

interface ChangePasswordState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: ChangePasswordState = {
  data: null,
  isLoader: false,
  errorMsg: '',
  isError: false,
};

export const changePasswordSlice = createSlice({
  name: 'changePassword',
  initialState,
  reducers: {
    clearChangePasswordErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        changePassword.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
          state.isError = false;
          state.errorMsg = '';
        },
      )
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearChangePasswordErrorMessage} = changePasswordSlice.actions;
export default changePasswordSlice.reducer;
