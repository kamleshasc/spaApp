import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

import {getEmployeeByServiceId} from '../../Action/serviceAction';

interface EmployeeByServiceIdState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: EmployeeByServiceIdState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

const getEmployeeByServiceIdSlice = createSlice({
  name: 'getEmployeeByServiceId',
  initialState,
  reducers: {
    clearGetEmployeeByServiceIdErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(getEmployeeByServiceId.pending, state => {
        state.data = [];
        state.isLoader = true;
      })
      .addCase(
        getEmployeeByServiceId.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.data = action.payload;
          state.isLoader = false;
        },
      )
      .addCase(
        getEmployeeByServiceId.rejected,
        (state, action: PayloadAction<any>) => {
          state.isError = true;
          state.isLoader = false;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetEmployeeByServiceIdErrorMsg} =
  getEmployeeByServiceIdSlice.actions;

export default getEmployeeByServiceIdSlice.reducer;
