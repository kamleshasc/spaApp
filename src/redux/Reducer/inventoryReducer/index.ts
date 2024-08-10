import {combineReducers} from '@reduxjs/toolkit';
import getInventorySlice from './getInventorySlice';
import addInventorySlice from './addInventorySlice';
import updateInventorySlice from './updateInventorySlice';

const inventoryReducer = combineReducers({
  getInventory: getInventorySlice,
  addInventory: addInventorySlice,
  updateInventory: updateInventorySlice,
});

export default inventoryReducer;
