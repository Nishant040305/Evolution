import { createSlice } from "@reduxjs/toolkit";

const organizationSlice = createSlice({
  name: "organization",
  initialState: 0,
  reducers: {
    updateOrganizations: (state) => {
        return 1-state;
    },
    
  },
});

export const { updateOrganizations } = organizationSlice.actions;

export default organizationSlice.reducer;