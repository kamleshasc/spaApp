import {createAsyncThunk} from '@reduxjs/toolkit';
import {get, post, put} from '../../service/Apis';
import {errorMsgWrap} from '../../config/helper';

export const fetchService = createAsyncThunk(
  'getService',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/services/'});
      if (res.success) {
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

interface serviceDetails {
  serviceName: string;
  category: string;
  subService: any[];
  onsiteOffsite: string;
  selectedBranches: string[];
  selectedUsers: string[];
  status: string;
}

export const fetchAddService = createAsyncThunk(
  'addService',
  async (payload: serviceDetails, {rejectWithValue}) => {
    try {
      const res: any = await post({
        url: '/services/',
        body: payload,
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
interface updateServiceBody {
  serviceId: string | number;
  payload: serviceDetails;
}

export const fetchUpdateService = createAsyncThunk(
  'updateService',
  async ({serviceId, payload}: updateServiceBody, {rejectWithValue}) => {
    try {
      const res = await put({
        url: `/services/${serviceId}`,
        body: payload,
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

export const uploadServiceImg = createAsyncThunk(
  'uploadImg',
  async (payload: FormData, {rejectWithValue}) => {
    try {
      const res = await post({
        url: '/services/serviceImg',
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

export const fetchSubService = createAsyncThunk(
  'getSubService',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/services/subService'});
      // return res;
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

export const fetchExpertService = createAsyncThunk(
  'getAllExpertService',
  async (_, {rejectWithValue}) => {
    try {
      const res = await get({url: '/services/expert/all'});
      // return res;
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

interface getServiceByExpertID {
  expertId: string;
}

export const fetchServiceByExpertId = createAsyncThunk(
  'getServiceByExpertId',
  async ({expertId}: getServiceByExpertID, {rejectWithValue}) => {
    try {
      const res = await get({url: `/services/expert/${expertId}`});
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

interface getServiceByCategory {
  name: string;
}

export const fetchServiceByCategory = createAsyncThunk(
  'getServiceByCategory',
  async ({name}: getServiceByCategory, {rejectWithValue}) => {
    try {
      const res = await get({url: `/services/getUserByCategory/${name}`});
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

export const getEmployeeByServiceId = createAsyncThunk(
  'getEmployeeByServiceId',
  async ({serviceId}: {serviceId: string}, {rejectWithValue}) => {
    try {
      const res = await get({url: `/services/assignedService/${serviceId}`});
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
