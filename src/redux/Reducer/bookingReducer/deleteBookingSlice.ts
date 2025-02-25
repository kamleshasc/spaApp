import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {deleteBoooking} from '../../Action/bookingAction';

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

export const deleteBookingSlice = createSlice({
  name: 'deleteBooking',
  initialState,
  reducers: {
    clearCancelBookingErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(deleteBoooking.pending, state => {
        state.data = null;
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(
        deleteBoooking.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(deleteBoooking.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.errorMsg = action.payload;
        state.isError = true;
      });
  },
});

export const {clearCancelBookingErrorMessage} = deleteBookingSlice.actions;
export default deleteBookingSlice.reducer;
