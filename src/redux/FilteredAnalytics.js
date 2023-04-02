import { createSlice, current } from "@reduxjs/toolkit";
export const FilteredAnalyticsSlice = createSlice({
  name: "filteredAnalytics",
  initialState: {
    value: [],
  },
  reducers: {
    addFilteredAnalytics: (state, action) => {
      console.log(action.payload);
      // state.value.length = 0;
      state.value = action.payload.slice(0, 17);
    },
  },
});

export const { addFilteredAnalytics } = FilteredAnalyticsSlice.actions;
export default FilteredAnalyticsSlice.reducer;
