import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchPdfReport} from '../../Action/salesReportAction';

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

export const getSalesPdf = createSlice({
  name: 'getSalesPdf',
  initialState,
  reducers: {
    clearGetSalesReportPDFErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPdfReport.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchPdfReport.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchPdfReport.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetSalesReportPDFErrorMsg} = getSalesPdf.actions;
export default getSalesPdf.reducer;
