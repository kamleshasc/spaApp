import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchGetCustomer} from '../../Action/customerAction';

export interface CustomerState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: CustomerState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getCustomerSlice = createSlice({
  name: 'getCustomer',
  initialState,
  reducers: {
    clearCustomerErrorMsg: state => {
      state.data = [];
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchGetCustomer.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchGetCustomer.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchGetCustomer.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

// Action creators are generated for each case reducer function
// export const {increment, decrement, incrementByAmount} = counterSlice.actions;

export const {clearCustomerErrorMsg} = getCustomerSlice.actions;
export default getCustomerSlice.reducer;
