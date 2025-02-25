import {combineReducers} from '@reduxjs/toolkit';
import getBookingPaymentSlice from './getBookingPaymentSlice';
import storePaymetItemSlice from './storePaymetItemSlice';
import bookingPaymentSlice from './bookingPaymentSlice';

const paymentReducer = combineReducers({
  getBookingPayment: getBookingPaymentSlice,
  storePayment: storePaymetItemSlice,
  bookingPayment: bookingPaymentSlice,
});

export default paymentReducer;
