import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchSalesReport} from '../../Action/salesReportAction';

export interface SalesReportState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: SalesReportState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getSalesReport = createSlice({
  name: 'getSalesReport',
  initialState,
  reducers: {
    clearGetSalesReportErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchSalesReport.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchSalesReport.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchSalesReport.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetSalesReportErrorMsg} = getSalesReport.actions;
export default getSalesReport.reducer;
