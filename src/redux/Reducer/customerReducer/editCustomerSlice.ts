import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateCustomer} from '../../Action/customerAction';

export interface UpdateCustomerState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: UpdateCustomerState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateCustomerSlice = createSlice({
  name: 'updateCustomer',
  initialState,
  reducers: {
    clearUpdateCustomerData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateCustomer.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateCustomer.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateCustomerData} = updateCustomerSlice.actions;
export default updateCustomerSlice.reducer;
