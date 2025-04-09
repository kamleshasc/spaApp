import {createAsyncThunk} from '@reduxjs/toolkit';
import {errorMsgWrap} from '../../config/helper';
import {get, post, put} from '../../service/Apis';

export const fetchInventory = createAsyncThunk(
  'getInventory',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/inventory/'});
      if (res.success) {
        if (res?.data.length <= 0) {
          return rejectWithValue('No Data Found.');
        }
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

interface InventoryBody {
  name: string;
  quantity: string;
  unit: string;
  brand: string;
  price: string;
  stock: number;
  createdBy?: string;
  updatedBy?: string;
}

export const fetchAddInventory = createAsyncThunk(
  'addInventory',
  async (payload: InventoryBody, {rejectWithValue}) => {
    try {
      const res: any = await post({url: '/inventory/', body: payload});

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

interface updateInventoryPayload {
  inventoryId: string;
  payload: InventoryBody;
}

export const fetchUpdateInventory = createAsyncThunk(
  'updateInventory',
  async ({inventoryId, payload}: updateInventoryPayload, {rejectWithValue}) => {
    try {
      const res = await put({url: `/inventory/${inventoryId}`, body: payload});

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
