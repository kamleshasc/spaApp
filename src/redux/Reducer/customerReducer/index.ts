import {combineReducers} from '@reduxjs/toolkit';
import addCustomerSlice from './addCustomerSlice';
import editCustomerSlice from './editCustomerSlice';
import getCustomerSlice from './getCustomerSlice';

const customerReducer = combineReducers({
  addCustomer: addCustomerSlice,
  editCustomer: editCustomerSlice,
  getCustomer: getCustomerSlice,
});

export default customerReducer;
