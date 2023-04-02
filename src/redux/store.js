import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./SettingsSlice";
import analyticsReducer from "./AnalyticsSlice";

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    analytics: analyticsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
