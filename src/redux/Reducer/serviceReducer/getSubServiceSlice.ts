import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchService, fetchSubService} from '../../Action/serviceAction';

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

export const getSubServiceSlice = createSlice({
  name: 'getSubService',
  initialState,
  reducers: {
    clearGetSubServiceErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSubService.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchSubService.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchSubService.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetSubServiceErrorMsg} = getSubServiceSlice.actions;
export default getSubServiceSlice.reducer;
