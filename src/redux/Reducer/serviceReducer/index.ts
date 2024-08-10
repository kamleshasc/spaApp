import {combineReducers} from '@reduxjs/toolkit';
import getServiceSlice from './getServiceSlice';
import addServiceSlice from './addServiceSlice';
import updateServiceSlice from './updateServiceSlice';
import uploadServiceImgSlice from './uploadServiceImgSlice';
import getSubServiceSlice from './getSubServiceSlice';

const serviceReducer = combineReducers({
  getService: getServiceSlice,
  addService: addServiceSlice,
  updateService: updateServiceSlice,
  uploadImgService: uploadServiceImgSlice,
  getSubService: getSubServiceSlice,
});

export default serviceReducer;
