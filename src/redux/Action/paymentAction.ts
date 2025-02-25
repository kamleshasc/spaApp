import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post} from '../../service/Apis';

interface getBookingType {
  date: string;
}

export const fetchBookingPayment = createAsyncThunk(
  'getBookingPayment',
  async ({date}: getBookingType, {rejectWithValue}) => {
    try {
      const res = await get({url: `/payment/getbooking/?date=${date}`});
      if (res.success) {
        return res.data;
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface createPaymentType {
  customerId: null | string;
  customerName: string;
  bookingIds: string[];
  total: number;
  subTotal: number;
  paymentMethod: string;
  tax: number;
}

export const bookingPayment = createAsyncThunk(
  'createPayment',
  async (payload: createPaymentType, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/payment/', body: payload});
      if (res?.success) {
        return res.data;
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
