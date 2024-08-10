import {combineReducers} from '@reduxjs/toolkit';
import getInvoiceSlice from './getInvoiceSlice';
import addInvoiceSlice from './addInvoiceSlice';
import updateInvoiceSlice from './updateInvoiceSlice';
import getPdfByIdSlice from './getPdfByIdSlice';

const invoiceReducer = combineReducers({
  getInvoice: getInvoiceSlice,
  addInvoice: addInvoiceSlice,
  updateInvoice: updateInvoiceSlice,
  getPdfById: getPdfByIdSlice,
});

export default invoiceReducer;
