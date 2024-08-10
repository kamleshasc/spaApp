import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddInvoice} from '../../Action/invoiceAction';

export interface addInvoiceState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addInvoiceState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addInvoiceSlice = createSlice({
  name: 'addInvoice',
  initialState,
  reducers: {
    clearAddInvoiceData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddInvoice.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchAddInvoice.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchAddInvoice.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearAddInvoiceData} = addInvoiceSlice.actions;
export default addInvoiceSlice.reducer;
