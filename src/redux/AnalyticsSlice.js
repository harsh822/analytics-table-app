import { createSlice, current } from "@reduxjs/toolkit";
export const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    value: [],
  },
  reducers: {
    addAnalytics: (state, action) => {
      console.log(action.payload);
      // state.value.length = 0;
      state.value = action.payload.slice(0, 17);
    },
    editAnalytics: (state, action) => {
      // state.value[action.payload.index].isVisible = state.value[
      //   action.payload.index
      // ]?.isVisible
      //   ? false
      //   : true;
      // console.log("After", current(state));
    },
  },
});

export const { editAnalytics, addAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
