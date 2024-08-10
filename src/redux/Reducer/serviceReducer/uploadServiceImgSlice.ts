import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {uploadServiceImg} from '../../Action/serviceAction';

export interface uploadServiceImgState {
  data: any | null;
  isLoader: boolean;
  isError: boolean;
  errorMsg: any;
}

const initialState: uploadServiceImgState = {
  data: null,
  isLoader: false,
  isError: false,
  errorMsg: '',
};

export const uploadServiceImgSlice = createSlice({
  name: 'uploadServiceImg',
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
      .addCase(uploadServiceImg.pending, state => {
        state.isLoader = true;
        state.isError = false;
        state.errorMsg = '';
      })
      .addCase(
        uploadServiceImg.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.data = action.payload;
        },
      )
      .addCase(
        uploadServiceImg.rejected,
        (state, action: PayloadAction<any>) => {
          state.isLoader = false;
          state.isError = true;
          state.errorMsg = action.payload;
        },
      );
  },
});

export const {clearUploadImg} = uploadServiceImgSlice.actions;
export default uploadServiceImgSlice.reducer;
