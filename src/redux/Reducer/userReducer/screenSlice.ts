import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearUserScreens, loadUserScreens} from '../../Action/authAction';

interface ScreensState {
  screens: any[];
  loading: boolean;
  error: string | null;
}

const initialState: ScreensState = {
  screens: [],
  loading: false,
  error: null,
};

const screensSlice = createSlice({
  name: 'screens',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle loading user screens
      .addCase(loadUserScreens.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        loadUserScreens.fulfilled,
        (state, action: PayloadAction<any[]>) => {
          state.screens = action.payload;
          state.loading = false;
        },
      )
      .addCase(
        loadUserScreens.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        },
      )

      // Handle clearing user screens
      .addCase(clearUserScreens.fulfilled, state => {
        state.screens = [];
      });
  },
});

export default screensSlice.reducer;
