import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchCommissionRules} from '../../Action/commissionRuleAction';

export interface CommissionRuleState {
  data: any[];
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: CommissionRuleState = {
  data: [],
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const getCommissionRuleSlice = createSlice({
  name: 'getCommissionRule',
  initialState,
  reducers: {
    clearGetCommissionRuleErrorMsg: state => {
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchCommissionRules.pending, state => {
        state.isLoader = true;
        state.data = [];
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchCommissionRules.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchCommissionRules.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearGetCommissionRuleErrorMsg} = getCommissionRuleSlice.actions;
export default getCommissionRuleSlice.reducer;
