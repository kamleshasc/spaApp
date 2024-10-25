import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {customerBooking} from '../../Action/bookingAction';

export interface UserBookingState {
  data: any;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: UserBookingState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const userBookingSlice = createSlice({
  name: 'UserBooking',
  initialState,
  reducers: {
    clearUserBookingErrorMessage: state => {
      state.errorMsg = '';
      state.isError = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(customerBooking.pending, state => {
        state.data = null;
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(
        customerBooking.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        customerBooking.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.errorMsg = action.payload;
          state.isError = true;
        },
      );
  },
});

export const {clearUserBookingErrorMessage} = userBookingSlice.actions;
export default userBookingSlice.reducer;
