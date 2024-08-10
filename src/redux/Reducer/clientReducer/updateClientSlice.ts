import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateClient} from '../../Action/clientAction';

export interface updateClientState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: updateClientState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateClientSlice = createSlice({
  name: 'updateClient',
  initialState,
  reducers: {
    clearUpdateClientData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateClient.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateClient.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateClient.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateClientData} = updateClientSlice.actions;
export default updateClientSlice.reducer;
