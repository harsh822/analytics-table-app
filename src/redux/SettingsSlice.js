import { createSlice, current } from "@reduxjs/toolkit";
export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    value: [
      {
        columnName: "date",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "app_id",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "requests",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "responses",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "impressions",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "clicks",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "revenue",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "rate",
        isBorderVisible: true,
        isVisible: true,
      },
      {
        columnName: "ctr",
        isBorderVisible: true,
        isVisible: true,
      },
    ],
  },
  reducers: {
    editSettings: (state, action) => {
      state.value[action.payload.index].isVisible = state.value[
        action.payload.index
      ]?.isVisible
        ? false
        : true;
      console.log("After", current(state));
    },
    editBorderSettings: (state, action) => {
      state.value[action.payload.index].isBorderVisible = state.value[
        action.payload.index
      ]?.isBorderVisible
        ? false
        : true;
      //   console.log("After", current(state));
    },
    modifyVisibility: (state, action) => {
      state.value.map((setting) => {
        setting.isBorderVisible = setting.isVisible;
      });
    },
    swapSettings: (state, action) => {
      let temp = state.value[action.payload.from];
      state.value[action.payload.from] = state.value[action.payload.to];
      state.value[action.payload.to] = temp;
    },
  },
});

export const {
  editSettings,
  editBorderSettings,
  modifyVisibility,
  swapSettings,
} = settingsSlice.actions;
export default settingsSlice.reducer;
