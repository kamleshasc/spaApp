import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {fetchAddCommissionRules} from '../../Action/commissionRuleAction';

export interface addCommissionRuleState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: addCommissionRuleState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const addCommissionRuleSlice = createSlice({
  name: 'addCommissionRule',
  initialState,
  reducers: {
    clearAddCommissionRuleData: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAddCommissionRules.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        fetchAddCommissionRules.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        fetchAddCommissionRules.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearAddCommissionRuleData} = addCommissionRuleSlice.actions;
export default addCommissionRuleSlice.reducer;
