import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchPrivacyPolicy} from '../../Action/privacyPolicyAction';

export interface PrivacyPolicyState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: PrivacyPolicyState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getPrivacyPolicySlice = createSlice({
  name: 'getPrivacyPolicy',
  initialState,
  reducers: {
    clearPrivacyPolicyData: state => {
      state.data = [];
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPrivacyPolicy.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchPrivacyPolicy.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchPrivacyPolicy.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearPrivacyPolicyData} = getPrivacyPolicySlice.actions;
export default getPrivacyPolicySlice.reducer;
