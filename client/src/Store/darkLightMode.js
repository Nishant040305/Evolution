import { createSlice } from '@reduxjs/toolkit';
export const darkLightSlice = createSlice({
  name: 'mode',
  initialState: { mode: false },
  reducers: {
    toggleDarkLight: (state) => {
      state.mode = !state.mode;
    },
  },
});

export const { toggleDarkLight } = darkLightSlice.actions;

export default darkLightSlice.reducer;
