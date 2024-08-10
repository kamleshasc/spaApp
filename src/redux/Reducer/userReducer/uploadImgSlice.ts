import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {uploadImg} from '../../Action/userAction';

export interface uploadImgState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: uploadImgState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const uploadImgSlice = createSlice({
  name: 'uploadImg',
  initialState,
  reducers: {
    clearUploadImg: state => {
      state.data = null;
      state.isError = false;
      state.errorMsg = '';
    },
  },
  extraReducers: builder => {
    builder
      .addCase(uploadImg.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(uploadImg.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.data = action.payload;
      })
      .addCase(uploadImg.rejected, (state, action: PayloadAction<any>) => {
        state.isLoader = false;
        state.isError = true;
        state.errorMsg = action.payload;
      });
  },
});

export const {clearUploadImg} = uploadImgSlice.actions;
export default uploadImgSlice.reducer;
