import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateUser} from '../../Action/userAction';

export interface UpdateUserState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: UpdateUserState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateUserSlice = createSlice({
  name: 'updateUser',
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
      .addCase(fetchUpdateUser.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateUser.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateUser.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateUserData} = updateUserSlice.actions;
export default updateUserSlice.reducer;
