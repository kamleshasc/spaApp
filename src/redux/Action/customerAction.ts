import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

interface customerDetails {
  firstName: string;
  lastName: string;
  email: string;
  mobileNumber: string;
  dateOfjoining?: string;
  status?: string;
  userImage?: string;
  password?: string;
}

interface UpdateCustomerParams {
  customerId: string;
  payload: customerDetails;
}

export const fetchGetCustomer = createAsyncThunk(
  'getCustomer',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/users/customer'});
      console.log(res,'get customer');
      
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

export const fetchUpdateCustomer = createAsyncThunk(
  'updateCustomer',
  async ({customerId, payload}: UpdateCustomerParams, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/users/customer/${customerId}`,
        body: payload,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const fetchAddCustomer = createAsyncThunk(
  'addCustomer',
  async (payload: customerDetails, {rejectWithValue}) => {
    try {
      const res: any = await post({
        url: '/users/customer',
        body: payload,
      });
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
