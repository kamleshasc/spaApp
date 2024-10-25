import {combineReducers} from '@reduxjs/toolkit';
import getPrivacyPolicySlice from './getPrivacyPolicySlice';

const privacyPolicyReducer = combineReducers({
  getPrivacyPolicy: getPrivacyPolicySlice,
});

export default privacyPolicyReducer;
