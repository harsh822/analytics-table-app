import { createSlice, current } from "@reduxjs/toolkit";
export const appsSlice = createSlice({
  name: "apps",
  initialState: {
    value: [],
  },
  reducers: {
    addApps: (state, action) => {
      console.log(action.payload);
      state.value = action.payload;
    },
  },
});

export const { addApps } = appsSlice.actions;
export default appsSlice.reducer;
