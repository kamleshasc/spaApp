import {combineReducers} from '@reduxjs/toolkit';
import getClientSlice from './getClientSlice';
import addClientSlice from './addClientSlice';
import updateClientSlice from './updateClientSlice';

const clientReducer = combineReducers({
  getClient: getClientSlice,
  addClient: addClientSlice,
  updateClient: updateClientSlice,
});

export default clientReducer;
