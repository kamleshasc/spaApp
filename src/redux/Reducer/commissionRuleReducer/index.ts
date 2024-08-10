import {combineReducers} from '@reduxjs/toolkit';
import addCommissionRuleSlice from './addCommissionRuleSlice';
import getCommissionRuleSlice from './getCommissionRuleSlice';
import updateClientSlice from '../clientReducer/updateClientSlice';

const commissionRuleReducer = combineReducers({
  addCommission: addCommissionRuleSlice,
  getCommission: getCommissionRuleSlice,
  updateCommission: updateClientSlice,
});

export default commissionRuleReducer;
