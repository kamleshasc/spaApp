import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import { fetchAddService } from '../../Action/serviceAction';

export interface addServiceState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addServiceState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addServiceSlice = createSlice({
  name: 'addService',
  initialState,
  reducers: {
    clearAddServiceData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddService.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(fetchAddService.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchAddService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearAddServiceData} = addServiceSlice.actions;
export default addServiceSlice.reducer;
