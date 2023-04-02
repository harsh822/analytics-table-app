import { createSlice, current } from "@reduxjs/toolkit";
import { getSettingsFromDB } from "./actions/settingsAction";
import { doc, setDoc } from "firebase/firestore";
import { db } from ".././firebase.js";
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
    loader: false,
    errors: {},
  },
  reducers: {
    editSettings: (state, action) => {
      state.value[action.payload.index].isVisible = state.value[
        action.payload.index
      ]?.isVisible
        ? false
        : true;
      console.log("After", current(state));
      try {
        const docRef = doc(db, "settings", "12345");
        setDoc(docRef, Object.assign({}, state.value)).then(() => {
          console.log("Settings doc updated");
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
    editBorderSettings: (state, action) => {
      state.value[action.payload.index].isBorderVisible = state.value[
        action.payload.index
      ]?.isBorderVisible
        ? false
        : true;
      try {
        const docRef = doc(db, "settings", "12345");
        setDoc(docRef, Object.assign({}, state.value)).then(() => {
          console.log("Settings doc updated");
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
    modifyVisibility: (state, action) => {
      state.value.map((setting) => {
        setting.isBorderVisible = setting.isVisible;
      });
      try {
        const docRef = doc(db, "settings", "12345");
        setDoc(docRef, Object.assign({}, state.value)).then(() => {
          console.log("Settings doc updated");
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
    swapSettings: (state, action) => {
      let temp = state.value[action.payload.from];
      state.value[action.payload.from] = state.value[action.payload.to];
      state.value[action.payload.to] = temp;
      try {
        const docRef = doc(db, "settings", "12345");
        setDoc(docRef, Object.assign({}, state.value)).then(() => {
          console.log("Settings doc updated");
        });
      } catch (error) {
        console.error("Error", error);
      }
    },
  },
  extraReducers: {
    [getSettingsFromDB.pending]: (state, action) => {
      state.loader = true;
    },
    [getSettingsFromDB.fulfilled]: (state, action) => {
      state.loader = false;
      state.value = action.payload;
    },
    [getSettingsFromDB.rejected]: (state, action) => {
      state.loader = false;
      state.errors = action.payload;
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
