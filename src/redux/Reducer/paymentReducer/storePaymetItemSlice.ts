import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {GetBookingsListData} from '../../../screens/Payments/GetBookingsList';

interface getBookingPaymentState {
  data: GetBookingsListData[];
}

const initalState: getBookingPaymentState = {
  data: [],
};

export const storePaymetItemSlice = createSlice({
  name: 'storePaymetItem',
  initialState: initalState,
  reducers: {
    toogleSelection: (state, action: PayloadAction<GetBookingsListData>) => {
      const itemIndex = state.data.findIndex(
        item => item._id === action.payload._id,
      );
      if (itemIndex >= 0) {
        state.data.splice(itemIndex, 1);
      } else {
        state.data.push(action.payload);
      }
    },
    clearSelection: state => {
      state.data = [];
    },
  },
});

export const {toogleSelection, clearSelection} = storePaymetItemSlice.actions;
export default storePaymetItemSlice.reducer;
