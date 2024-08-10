import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {clearUserScreens, userDetails} from '../../Action/authAction';

interface UserDetailsState {
  userDetails: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: UserDetailsState = {
  userDetails: null,
  loading: false,
  error: null,
};

const userDetailsSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // Handle loading user details
      .addCase(userDetails.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userDetails.fulfilled, (state, action: PayloadAction<any>) => {
        state.userDetails = action.payload;
        state.loading = false;
      })
      .addCase(userDetails.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Handle clearing user details (triggered by clearUserScreens action)
      .addCase(clearUserScreens.fulfilled, state => {
        state.userDetails = null;
      });
  },
});

export default userDetailsSlice.reducer;
