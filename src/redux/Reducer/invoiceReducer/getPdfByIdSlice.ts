import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchPdfById} from '../../Action/invoiceAction';

export interface InvoiceState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: InvoiceState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getPdfByIdSlice = createSlice({
  name: 'getPdfById',
  initialState,
  reducers: {
    clearGetPdfByIdErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPdfById.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchPdfById.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchPdfById.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetPdfByIdErrorMsg} = getPdfByIdSlice.actions;
export default getPdfByIdSlice.reducer;
