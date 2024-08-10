import {combineReducers} from '@reduxjs/toolkit';
import getBookingSlice from './getBookingSlice';
import addBookingSlice from './addBookingSlice';

const bookingReducer = combineReducers({
  getBooking: getBookingSlice,
  addBooking: addBookingSlice,
});

export default bookingReducer;
