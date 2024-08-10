import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchInvoice} from '../../Action/invoiceAction';

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

export const getInvoiceSlice = createSlice({
  name: 'getInvoice',
  initialState,
  reducers: {
    clearGetInvoiceErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInvoice.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchInvoice.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchInvoice.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetInvoiceErrorMsg} = getInvoiceSlice.actions;
export default getInvoiceSlice.reducer;
