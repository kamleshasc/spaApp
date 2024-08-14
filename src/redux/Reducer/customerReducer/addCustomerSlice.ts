import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddCustomer} from '../../Action/customerAction';

export interface addCustomerState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addCustomerState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addCustomerSlice = createSlice({
  name: 'addCustomer',
  initialState,
  reducers: {
    clearAddCustomerData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddCustomer.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchAddCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchAddCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearAddCustomerData} = addCustomerSlice.actions;
export default addCustomerSlice.reducer;
