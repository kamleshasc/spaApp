import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchClient = createAsyncThunk(
  'getClient',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/clients'});
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

interface clientDetais {
  firstName: string;
  lastName: string;
  mobileNumber: string;
  email: string;
  addressLineOne: string;
  addressLineTwo: string;
  country: string;
  state: string;
  city: string;
  prefix: string;
  owner: string;
  clientImg?: string;
}

export const fetchAddClient = createAsyncThunk(
  'addClient',
  async (payload: clientDetais, {rejectWithValue}) => {
    try {
      const res: any = await post({
        url: '/clients',
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

interface updateClientBody {
  clientId: string;
  payload: clientDetais;
}

export const fetchUpdateClient = createAsyncThunk(
  'updateClient',
  async ({clientId, payload}: updateClientBody, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/clients/${clientId}`,
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

export const clientUploadImage = createAsyncThunk(
  'clientUploadImage',
  async (payload: FormData, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/clients/uploadImg',
        body: payload,
        hasFormData: true,
      });
      return res;
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
