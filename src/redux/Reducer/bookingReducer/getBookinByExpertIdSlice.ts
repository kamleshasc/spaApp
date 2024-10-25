import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {getBookingByExpertId} from '../../Action/bookingAction';

export interface GetBookingByExpertState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: GetBookingByExpertState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getBookinByExpertIdSlice = createSlice({
  name: 'getBookinByExpertIdSlice',
  initialState,
  reducers: {
    clearGetBookingByExpertIdErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getBookingByExpertId.pending, state => {
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
        state.isLoader = true;
      })
      .addCase(
        getBookingByExpertId.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        getBookingByExpertId.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.errorMsg = action.payload;
          state.isError = true;
        },
      );
  },
});

export const {clearGetBookingByExpertIdErrorMsg} =
  getBookinByExpertIdSlice.actions;
export default getBookinByExpertIdSlice.reducer;
