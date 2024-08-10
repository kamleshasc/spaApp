import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddInventory} from '../../Action/inventoryAction';

export interface addInventoryState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addInventoryState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addInventorySlice = createSlice({
  name: 'addInventory',
  initialState,
  reducers: {
    clearAddInventoryData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddInventory.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchAddInventory.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchAddInventory.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearAddInventoryData} = addInventorySlice.actions;
export default addInventorySlice.reducer;
