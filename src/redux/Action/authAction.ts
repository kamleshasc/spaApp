import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {patch, post, put} from '../../service/Apis';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface LoginPayload {
  email: string;
  password: string;
}

export const loginUser = createAsyncThunk(
  'loginuser',
  async (payload: LoginPayload, {rejectWithValue}) => {
    try {
      const res: any = await post({
        url: '/auth/login',
        body: payload,
      });
      if (res?.success) {
        await AsyncStorage.setItem('accessToken', res?.data?.token);
        await AsyncStorage.setItem('refreshToken', res?.data?.refreshToken);
        await AsyncStorage.setItem(
          'userDetails',
          JSON.stringify(res?.data?.userDetails),
        );

        await AsyncStorage.setItem(
          'userScreens',
          JSON.stringify(res?.data?.screens),
        );
        return res;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

export const loadUserScreens = createAsyncThunk('loadUserScreens', async () => {
  const screens = await AsyncStorage.getItem('userScreens');
  return screens ? JSON.parse(screens) : [];
});

export const clearUserScreens = createAsyncThunk(
  'clearUserScreens',
  async () => {
    await AsyncStorage.removeItem('accessToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('userScreens');
    await AsyncStorage.removeItem('userDetails');
  },
);

export const userDetails = createAsyncThunk('loadUserDetails', async () => {
  const user = await AsyncStorage.getItem('userDetails');
  return user ? JSON.parse(user) : null;
});

interface ChangePassword {
  oldPassword: any;
  newPassword: any;
}

export const changePassword = createAsyncThunk(
  'changePassword',
  async (payload: ChangePassword, {rejectWithValue}) => {
    try {
      const res: any = await put({
        url: '/auth/change-password',
        body: payload,
      });
      if (res?.success) {
        return res;
      } else {
        let errorMessage = errorMsgWrap(res);
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface verifyForgotOtpBody {
  email: string;
  otp: string;
}

export const verifyForgotOtp = createAsyncThunk(
  'verifyForgotOtp',
  async (payload: verifyForgotOtpBody, {rejectWithValue}) => {
    try {
      const res: any = await patch({
        url: '/auth/forgot-password-verify',
        body: payload,
      });

      if (res?.success) {
        return res;
      } else {
        let errorMessage = errorMsgWrap(res);
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface resetPasswordBody {
  password: string;
}

interface resetPasswordTypes {
  id: string;
  body: resetPasswordBody;
}

export const resetPassword = createAsyncThunk(
  'resetPassword',
  async ({id, body}: resetPasswordTypes, {rejectWithValue}) => {
    try {
      const res: any = await patch({
        url: `/auth/reset-password/${id}`,
        body: body,
      });

      if (res?.success) {
        return res;
      } else {
        let errorMessage = errorMsgWrap(res);
        return rejectWithValue(errorMessage);
      }
    } catch (error) {
      let errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);
