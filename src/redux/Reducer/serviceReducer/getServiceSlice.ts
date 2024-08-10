import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchService} from '../../Action/serviceAction';

export interface ServiceState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: ServiceState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getServiceSlice = createSlice({
  name: 'getService',
  initialState,
  reducers: {
    clearGetServiceErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchService.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchService.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchService.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetServiceErrorMsg} = getServiceSlice.actions;
export default getServiceSlice.reducer;
