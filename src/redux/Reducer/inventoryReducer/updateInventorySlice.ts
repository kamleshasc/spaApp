import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateInventory} from '../../Action/inventoryAction';

export interface updateInventoryState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: updateInventoryState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateInventorySlice = createSlice({
  name: 'updateInventory',
  initialState,
  reducers: {
    clearUpdateInventoryData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateInventory.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateInventory.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateInventoryData} = updateInventorySlice.actions;
export default updateInventorySlice.reducer;
