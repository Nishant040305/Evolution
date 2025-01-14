import { createSlice } from '@reduxjs/toolkit';

const ImageSlice = createSlice({
  name: 'image',
  initialState: [],
  reducers: {
    setData: (state, action) => {
      return action.payload;
    },
    setImagesMedia: (state, action) => {
      const newState = [...state, action.payload];
      return newState;
    },
  },
});

export const { setImagesMedia, setData } = ImageSlice.actions;
export default ImageSlice.reducer;
