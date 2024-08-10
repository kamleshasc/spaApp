import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

interface getBookingType {
  serviceId: string;
  date: string;
}

export const fetchBookingDetails = createAsyncThunk(
  'fetchBooking',
  async ({serviceId, date}: getBookingType, {rejectWithValue}) => {
    try {
      const res = await get({url: `/bookings/${serviceId}/${date}`});
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

interface BookingDetails {
  date: string;
  serviceId: string;
  name: string;
  mail: string;
  phone: string;
  serviceStartTime: string;
  serviceEndTime: string;
}
export const newBooking = createAsyncThunk(
  'newBooking',
  async (body: BookingDetails, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/bookings/', body});
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
