import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import moment from "moment";
export const getAnalytics = createAsyncThunk("analytics", async (dates) => {
  console.log("Inside actions😐😐😐", dates);
  const appsResponse = await axios.get(
    "http://go-dev.greedygame.com/v3/dummy/apps"
  );
  if (dates.toDate == "" && dates.fromDate == "") {
    return [];
  }
  const response = await axios.get(
    `https://go-dev.greedygame.com/v3/dummy/report?startDate=${dates.fromDate}&endDate=${dates.toDate}`
  );
  response.data.data.map((val) => {
    val.date = moment(val.date).format("DD-MMM-YYYY");
    val.rate = (val.requests / val.responses) * 100;
    val.ctr = (val.clicks / val.impressions) * 100;
    val.app_id = appsResponse.data.data.find(
      (apps) => apps.app_id === val.app_id
    ).app_name;
  });
  console.log("RESPONSE DATAAA", response.data.data);
  return response.data.data;
});
