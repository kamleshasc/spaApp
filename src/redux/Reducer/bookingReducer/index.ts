import {combineReducers} from '@reduxjs/toolkit';
import getBookingSlice from './getBookingSlice';
import addBookingSlice from './addBookingSlice';
import userBookingSlice from './userBookingSlice';
import getBookinByExpertIdSlice from './getBookinByExpertIdSlice';
import getMyBookingSlice from './getMyBookingSlice';
import deleteBookingSlice from './deleteBookingSlice';

const bookingReducer = combineReducers({
  getBooking: getBookingSlice,
  addBooking: addBookingSlice,
  userBooking: userBookingSlice,
  getBookingSlotByExpert: getBookinByExpertIdSlice,
  getMyBooking: getMyBookingSlice,
  deleteBooking: deleteBookingSlice,
});

export default bookingReducer;
