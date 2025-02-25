import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchBookingPayment} from '../../Action/paymentAction';

interface getBookingPaymentState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initalState: getBookingPaymentState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getBookingPaymentSlice = createSlice({
  name: 'getBookingPayment',
  initialState: initalState,
  reducers: {
    clearGetBookingPaymentData: state => {
      state.data = [];
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBookingPayment.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchBookingPayment.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchBookingPayment.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetBookingPaymentData} = getBookingPaymentSlice.actions;
export default getBookingPaymentSlice.reducer;
