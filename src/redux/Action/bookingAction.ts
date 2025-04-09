import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
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
      if (res?.success) {
        if (res?.data.length <= 0) {
          return rejectWithValue('No Data Found.');
        }
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

interface BookingDetails {
  date: string;
  serviceId: string;
  name: string;
  mail: string;
  phone: string;
  serviceStartTime: string;
  serviceEndTime: string;
  expertId: string;
}

export const newBooking = createAsyncThunk(
  'newBooking',
  async (body: BookingDetails, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/bookings/', body});
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

interface UserBookingDetails {
  date: string;
  serviceId: string;
  serviceName: string;
  price: any;
  expertId: string;
  parentId: string;
  name: string;
  mail: string;
  phone: string;
  serviceStartTime: string;
  serviceEndTime: string;
}

export const customerBooking = createAsyncThunk(
  'customerBooking',
  async (body: UserBookingDetails, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/bookings/user', body});
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

interface getBookingByExpertId {
  date: any;
  expertId: string;
}

export const getBookingByExpertId = createAsyncThunk(
  'getBookingByExpertId',
  async ({date, expertId}: getBookingByExpertId, {rejectWithValue}) => {
    try {
      const res = await get({
        url: `/bookings/expertStatus/${date}/${expertId}`,
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

export const getMyBookings = createAsyncThunk(
  'getMyBookings',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: `/bookings/myBookings`});
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

export const deleteBoooking = createAsyncThunk(
  'cancelBooking',
  async ({id}: {id: string}, {rejectWithValue}) => {
    try {
      const res = await put({url: `/bookings/deleteBooking/${id}`});
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
