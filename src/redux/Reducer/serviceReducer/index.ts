import {combineReducers} from '@reduxjs/toolkit';
import getServiceSlice from './getServiceSlice';
import addServiceSlice from './addServiceSlice';
import updateServiceSlice from './updateServiceSlice';
import uploadServiceImgSlice from './uploadServiceImgSlice';
import getSubServiceSlice from './getSubServiceSlice';
import getAllExpertSlice from './getAllExpertSlice';
import getServiceByExpertIdSlice from './getServiceByExpertIdSlice';
import getServiceByCategorySlice from './getServiceByCategorySlice';
import getEmployeeByServiceIdSlice from './getEmployeeByServiceIdSlice';

const serviceReducer = combineReducers({
  getService: getServiceSlice,
  addService: addServiceSlice,
  updateService: updateServiceSlice,
  uploadImgService: uploadServiceImgSlice,
  getSubService: getSubServiceSlice,
  getExperts: getAllExpertSlice,
  getServiceByExpertId: getServiceByExpertIdSlice,
  getServiceByCategory: getServiceByCategorySlice,
  getEmployeeByServiceId: getEmployeeByServiceIdSlice,
});

export default serviceReducer;
