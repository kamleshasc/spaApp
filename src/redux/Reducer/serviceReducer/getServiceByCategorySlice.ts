import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchServiceByCategory} from '../../Action/serviceAction';

export interface GetServiceByCategory {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: GetServiceByCategory = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getServiceByCategorySlice = createSlice({
  name: 'getServiceByCategory',
  initialState,
  reducers: {
    clearGetServiceByCategoryErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchServiceByCategory.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchServiceByCategory.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchServiceByCategory.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetServiceByCategoryErrorMsg} =
  getServiceByCategorySlice.actions;
export default getServiceByCategorySlice.reducer;
