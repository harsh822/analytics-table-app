import { createSlice, current } from "@reduxjs/toolkit";
import { getAnalytics } from "./actions/analyticsAction";
export const analyticsSlice = createSlice({
  name: "analytics",
  initialState: {
    value: [],
    analyticsValue: [],
    loader: false,
    errors: {},
  },
  reducers: {
    sortAnalytics: (state, action) => {
      let sortBy = action.payload.sortBy;
      let sorted = action.payload.sorted;
      if (sortBy == "app_id") {
        state.value.sort((analyticsA, analyticsB) => {
          if (sorted) {
            return analyticsA[sortBy].localeCompare(analyticsB[sortBy]);
          }
          return analyticsB[sortBy].localeCompare(analyticsA[sortBy]);
        });
      } else if (sortBy == "date") {
        state.value.sort((analyticsA, analyticsB) => {
          if (sorted) {
            return new Date(analyticsB[sortBy]) - new Date(analyticsA[sortBy]);
          }
          return new Date(analyticsA[sortBy]) - new Date(analyticsB[sortBy]);
        });
      } else {
        state.value.sort((analyticsA, analyticsB) => {
          if (sorted) {
            return analyticsB[sortBy] - analyticsA[sortBy];
          }
          return analyticsA[sortBy] - analyticsB[sortBy];
        });
      }
    },
    filterAnalytics: (state, action) => {
      state.value = state.analyticsValue.filter((val) => {
        if (
          val[action.payload.searchIn]
            .toString()
            .toLowerCase()
            .includes(action.payload.searchValue.toLowerCase())
        ) {
          return true;
        }
        return false;
      });
    },
  },
  extraReducers: {
    [getAnalytics.pending]: (state, action) => {
      state.loader = true;
    },
    [getAnalytics.fulfilled]: (state, action) => {
      state.loader = false;
      state.value = action.payload;
      state.analyticsValue = action.payload;
    },
    [getAnalytics.rejected]: (state, action) => {
      state.loader = false;
      state.errors = action.payload;
    },
  },
});

export const { sortAnalytics, filterAnalytics } = analyticsSlice.actions;
export default analyticsSlice.reducer;
