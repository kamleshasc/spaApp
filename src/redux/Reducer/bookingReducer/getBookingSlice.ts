import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {fetchBookingDetails} from '../../Action/bookingAction';

export interface BookingState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: BookingState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getBookingSlice = createSlice({
  name: 'getBooking',
  initialState,
  reducers: {
    clearGetBookingErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchBookingDetails.pending, state => {
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(
        fetchBookingDetails.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchBookingDetails.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.errorMsg = action.payload;
          state.isError = true;
        },
      );
  },
});

export const {clearGetBookingErrorMsg} = getBookingSlice.actions;
export default getBookingSlice.reducer;
