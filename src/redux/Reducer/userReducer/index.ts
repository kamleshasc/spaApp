import {combineReducers} from 'redux';
import getUserSlice from './getUserSlice';
import updateUserSlice from './updateUserSlice';
import addUserSlice from './addUserSlice';
import uploadImgSlice from './uploadImgSlice';
import screenSlice from './screenSlice';
import userDetailSlice from './userDetailSlice';

const userReducer = combineReducers({
  addUser: addUserSlice,
  getUser: getUserSlice,
  updateUser: updateUserSlice,
  uploadImg: uploadImgSlice,
  screens: screenSlice,
  userDetails: userDetailSlice,
});

export default userReducer;
