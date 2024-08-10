import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchInventory} from '../../Action/inventoryAction';

export interface InventoryState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: InventoryState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getInventorySlice = createSlice({
  name: 'getInventory',
  initialState,
  reducers: {
    clearGetInventoryErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchInventory.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchInventory.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchInventory.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetInventoryErrorMsg} = getInventorySlice.actions;
export default getInventorySlice.reducer;
