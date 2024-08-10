import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchClient} from '../../Action/clientAction';

export interface ClientState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: ClientState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getClientSlice = createSlice({
  name: 'getClient',
  initialState,
  reducers: {
    clearGetClientErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchClient.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(fetchClient.fulfilled, (state, action: PayloadAction<any[]>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(fetchClient.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearGetClientErrorMsg} = getClientSlice.actions;
export default getClientSlice.reducer;
