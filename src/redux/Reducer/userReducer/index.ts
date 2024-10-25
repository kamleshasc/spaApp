import {combineReducers} from 'redux';
import getUserSlice from './getUserSlice';
import updateUserSlice from './updateUserSlice';
import addUserSlice from './addUserSlice';
import uploadImgSlice from './uploadImgSlice';
import screenSlice from './screenSlice';
import userDetailSlice from './userDetailSlice';
import getUserByIdSlice from './getUserByIdSlice';

const userReducer = combineReducers({
  addUser: addUserSlice,
  getUser: getUserSlice,
  updateUser: updateUserSlice,
  uploadImg: uploadImgSlice,
  screens: screenSlice,
  userDetails: userDetailSlice,
  getUserById: getUserByIdSlice,
});

export default userReducer;
