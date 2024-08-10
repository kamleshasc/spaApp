import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {newBooking} from '../../Action/bookingAction';

export interface BookingState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: BookingState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addBookingSlice = createSlice({
  name: 'newBooking',
  initialState,
  reducers: {
    clearBookingErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(newBooking.pending, state => {
        state.data = null;
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(newBooking.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
      })
      .addCase(newBooking.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearBookingErrorMessage} = addBookingSlice.actions;
export default addBookingSlice.reducer;
