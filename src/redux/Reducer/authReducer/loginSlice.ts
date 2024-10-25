import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {loadUserScreens, loginUser, userDetails} from '../../Action/authAction';

export interface LoginState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: LoginState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    clearLoginErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loginUser.pending, state => {
        state.data = null;
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(
        loadUserScreens.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
          // state.screens = action.payload.data.screens;
        },
      )
      .addCase(userDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
        // state.screens = action.payload.data.screens;
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearLoginErrorMessage} = loginSlice.actions;
export default loginSlice.reducer;
