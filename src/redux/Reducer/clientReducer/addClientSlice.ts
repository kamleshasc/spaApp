import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddClient} from '../../Action/clientAction';

export interface addClientState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addClientState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addClientSlice = createSlice({
  name: 'addClient',
  initialState,
  reducers: {
    clearAddClientData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddClient.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchAddClient.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(fetchAddClient.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearAddClientData} = addClientSlice.actions;
export default addClientSlice.reducer;
