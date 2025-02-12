import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { UserVerify } from '../scripts/UserAuth';

// Define initial state
const initialState = {
  isAuthenticated: false,
  userInfo: null,
  loading: false,
  error: null,
  isPersisted: false, // Track persistence
};

// Async thunk for user verification
export const verifyUser = createAsyncThunk(
  'user/verifyUser',
  async (_, { getState, rejectWithValue }) => {
    try {
      const { user } = getState();

      // Only fetch the user data if it's not persisted already
      if (user.isPersisted && user.isAuthenticated) {
        return user.userInfo; // Return from persisted state
      }

      const info = await UserVerify(); // Assume this fetches user data
      if (!info) throw new Error('User not authenticated');

      return info;
    } catch (error) {
      return rejectWithValue(error.message || 'Verification failed');
    }
  }
);

// Create a slice
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.userInfo = action.payload;
      state.isPersisted = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.userInfo = null;
      state.error = null;
      state.isPersisted = false; // Reset persistence on logout
    },
    ProfileUpdate: (state, action) => {
      state.userInfo = { ...state.userInfo, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.userInfo = action.payload;
        state.isPersisted = true;
        state.loading = false;
      })
      .addCase(verifyUser.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.userInfo = null;
        state.loading = false;
        state.error = action.payload;
        state.isPersisted = false;
      });
  },
});

// Export actions
export const { logout, loginSuccess, ProfileUpdate } = userSlice.actions;

// Export reducer
export default userSlice.reducer;
