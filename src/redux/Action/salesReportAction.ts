import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get} from '../../service/Apis';

interface salesReportParamsType {
  startDate: string;
  endDate: string;
}

export const fetchSalesReport = createAsyncThunk(
  'fetchSalesReport',
  async ({endDate, startDate}: salesReportParamsType, {rejectWithValue}) => {
    try {
      const res = await get({
        url: `/report/sales/?startDate=${startDate}&endDate=${endDate}`,
      });
      if (res?.success) {
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface PdfReportParamsType {
  startDate: string;
  endDate: string;
  s_type: string;
}

export const fetchPdfReport = createAsyncThunk(
  'getPdfReport',
  async (
    {startDate, endDate, s_type}: PdfReportParamsType,
    {rejectWithValue},
  ) => {
    try {
      const res = await get({
        url: `/report/pdf/saleReport/?startDate=${startDate}&endDate=${endDate}&tType=${s_type}`,
      });
      if (res?.success) {
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
