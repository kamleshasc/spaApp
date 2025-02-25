import {combineReducers} from '@reduxjs/toolkit';
import getSalesReport from './getSalesReport';
import getSalesPdf from './getSalesPdf';

const salesReducer = combineReducers({
  getSalesReport: getSalesReport,
  getSalePdf: getSalesPdf,
});

export default salesReducer;
