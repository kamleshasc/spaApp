import {createAsyncThunk} from '@reduxjs/toolkit';
import {get} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchPrivacyPolicy = createAsyncThunk(
  'getPrivacyPolicy',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/privacyPolicy'});
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
