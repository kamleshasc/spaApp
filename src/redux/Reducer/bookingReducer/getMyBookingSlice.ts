import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getMyBookings} from '../../Action/bookingAction';

export interface MyBookingState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: MyBookingState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getMyBookingSlice = createSlice({
  name: 'GetMyBooking',
  initialState,
  reducers: {
    clearMyBookingErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getMyBookings.pending, state => {
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(
        getMyBookings.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(getMyBookings.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearMyBookingErrorMessage} = getMyBookingSlice.actions;
export default getMyBookingSlice.reducer;
