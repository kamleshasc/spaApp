import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {getUserById} from '../../Action/userAction';

export interface UserState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: UserState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getUserByIdSlice = createSlice({
  name: 'getUserById',
  initialState,
  reducers: {
    clearGetUserByIdErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getUserById.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(getUserById.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(getUserById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetUserByIdErrorMsg} = getUserByIdSlice.actions;
export default getUserByIdSlice.reducer;
