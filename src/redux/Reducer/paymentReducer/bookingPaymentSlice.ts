import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {bookingPayment} from '../../Action/paymentAction';

interface BookingPaymentSliceState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: BookingPaymentSliceState = {
  data: null,
  isLoader: false,
  errorMsg: '',
  isError: false,
};

export const bookingPaymentSlice = createSlice({
  name: 'bookingPayment',
  initialState,
  reducers: {
    clearBookingPaymentSliceErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(bookingPayment.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        bookingPayment.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
          state.isError = false;
          state.errorMsg = '';
        },
      )
      .addCase(bookingPayment.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearBookingPaymentSliceErrorMessage} =
  bookingPaymentSlice.actions;
export default bookingPaymentSlice.reducer;
