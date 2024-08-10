import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddUser} from '../../Action/userAction';

export interface addUserState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addUserState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addUserSlice = createSlice({
  name: 'addUser',
  initialState,
  reducers: {
    clearUpdateUserData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddUser.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(fetchAddUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchAddUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearUpdateUserData} = addUserSlice.actions;
export default addUserSlice.reducer;
