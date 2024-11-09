// src/features/userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserVerify } from '../scripts/UserAuth'; // Adjust the import path

// Define initial state
const initialState = {
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  error: null,
};

// Create an async thunk for user verification
export const verifyUser = createAsyncThunk('user/verifyUser', async () => {
  const info = await UserVerify();
  return info;
});

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
    },
    ProfileUpdate: (state,action)=>{
      state.userInfo = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        if (action.payload) {
          state.isAuthenticated = true;
          state.userInfo = action.payload;
        } else {
          state.isAuthenticated = false;
          state.userInfo = null;
        }
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

// Export actions
export const { logout ,loginSuccess,ProfileUpdate} = userSlice.actions;

// Export reducer
export default userSlice.reducer;
