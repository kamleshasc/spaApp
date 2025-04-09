import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post, put} from '../../service/Apis';

export const fetchCommissionRules = createAsyncThunk(
  'getCommissionRules',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/commissionrules'});
      if (res.success) {
        if (res?.data.length <= 0) {
          return rejectWithValue('No Data Found.');
        }
        return res?.data;
      } else {
        return rejectWithValue(res?.message);
      }
    } catch (error) {
      const errorMesssage = errorMsgWrap(error);
      return rejectWithValue(errorMesssage);
    }
  },
);

interface CommissionRulePayload {
  name: string;
  criteria: string;
  value: number;
  applicableUser: string[];
  createdB?: string;
  updatedB?: string;
}

export const fetchAddCommissionRules = createAsyncThunk(
  'AddCommissionRule',
  async (payload: CommissionRulePayload, {rejectWithValue}) => {
    try {
      let res: any = await post({url: '/commissionrules', body: payload});

      if (res.success) {
        return res.data;
      } else {
        return rejectWithValue(res.message);
      }
    } catch (error) {
      const errorMessage = errorMsgWrap(error);
      return rejectWithValue(errorMessage);
    }
  },
);

interface UpdateCommissionRulePayload {
  commissionId: string;
  payload: CommissionRulePayload;
}

export const fetchUpdateCommissionRules = createAsyncThunk(
  'UpdateCommissionRule',
  async (
    {commissionId, payload}: UpdateCommissionRulePayload,
    {rejectWithValue},
  ) => {
    try {
      const res = await put({
        url: `/commissionrules/${commissionId}`,
        body: payload,
      });
      if (res.success) {
        return res.data;
      } else {
        return rejectWithValue(res.message);
      }
      // return res;
    } catch (error) {
      const errorMessage = errorMsgWrap(error);
      throw rejectWithValue(errorMessage);
    }
  },
);
