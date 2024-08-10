import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {post} from '../../service/Apis';
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
      console.log(res, 'resssss login');
      await AsyncStorage.setItem(
        'userDetails',
        JSON.stringify(res.data.userDetails),
      );

      await AsyncStorage.setItem(
        'userScreens',
        JSON.stringify(res.data.screens),
      );
      return res;
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
    await AsyncStorage.removeItem('userScreens');
    await AsyncStorage.removeItem('userDetails');
    // console.log(screens, '=====remove screens=====');
  },
);

export const userDetails = createAsyncThunk('loadUserDetails', async () => {
  const user = await AsyncStorage.getItem('userDetails');
  return user ? JSON.parse(user) : null;
});
