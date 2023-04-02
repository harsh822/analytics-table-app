import { configureStore } from "@reduxjs/toolkit";
import settingReducer from "./SettingsSlice";
import analyticsReducer from "./AnalyticsSlice";
import filteredAnalyticsReduce from "./FilteredAnalytics";
import appsReduce from "./AppSlice";

export const store = configureStore({
  reducer: {
    settings: settingReducer,
    analytics: analyticsReducer,
    apps: appsReduce,
    fanalytics: filteredAnalyticsReduce,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
