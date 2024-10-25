import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

interface signUpOtpBody {
  email: string;
}

export const signUpOtp = createAsyncThunk(
  'signUpOtp',
  async (payload: signUpOtpBody, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/otp/signup', body: payload});
      if (res.success) {
        return res;
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const forgotPasswordOtp = createAsyncThunk(
  'forgotPasswordOtp',
  async (payload: signUpOtpBody, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/otp/forgot-password', body: payload});
      if (res.success) {
        return res;
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
