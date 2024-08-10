import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateUser} from '../../Action/userAction';

export interface updateServiceState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: updateServiceState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateServiceSlice = createSlice({
  name: 'updateService',
  initialState,
  reducers: {
    clearUpdateServiceData: state => {
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

export const {clearUpdateServiceData} = updateServiceSlice.actions;
export default updateServiceSlice.reducer;
