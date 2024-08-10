import {combineReducers} from '@reduxjs/toolkit';
import loginSlice from './loginSlice';

const loginReducer = combineReducers({
  login: loginSlice,
});

export default loginReducer;
