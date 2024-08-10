import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateInvoice} from '../../Action/invoiceAction';

export interface updateInvoiceState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: updateInvoiceState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateInvoiceSlice = createSlice({
  name: 'updateInvoice',
  initialState,
  reducers: {
    clearUpdateInvoiceData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateInvoice.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateInvoice.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateInvoice.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateInvoiceData} = updateInvoiceSlice.actions;
export default updateInvoiceSlice.reducer;
