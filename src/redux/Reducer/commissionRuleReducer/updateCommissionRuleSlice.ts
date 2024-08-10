import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchUpdateCommissionRules} from '../../Action/commissionRuleAction';

export interface updateCommissionRuleState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: updateCommissionRuleState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const updateCommissionRuleSlice = createSlice({
  name: 'updateCommissionRule',
  initialState,
  reducers: {
    clearUpdateCommissionRuleData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchUpdateCommissionRules.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchUpdateCommissionRules.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchUpdateCommissionRules.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUpdateCommissionRuleData} =
  updateCommissionRuleSlice.actions;
export default updateCommissionRuleSlice.reducer;
