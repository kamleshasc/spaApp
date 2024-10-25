import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchExpertService} from '../../Action/serviceAction';

export interface ServiceState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: ServiceState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getAllExpertSlice = createSlice({
  name: 'getAllExpert',
  initialState,
  reducers: {
    clearGetAllExpertErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpertService.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchExpertService.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchExpertService.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetAllExpertErrorMsg} = getAllExpertSlice.actions;
export default getAllExpertSlice.reducer;
