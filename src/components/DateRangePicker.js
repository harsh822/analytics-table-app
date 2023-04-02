import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAnalytics } from "../redux/AnalyticsSlice";
import { addApps } from "../redux/AppSlice";
import "./DateRangePicker.css";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
function DateRangePicker() {
  const [dateRange, setDateRange] = useState([]);
  const dispatch = useDispatch();
  const analyticsArr = useSelector((state) => state.analytics.value);
  const appsArr = useSelector((state) => state.apps.value);
  console.log("Date Range", dateRange);
  console.log("Analytics Arr", analyticsArr);
  console.log("Appss arr", appsArr);

  const fetchAnalyticsData = (fromDate, toDate) => {
    setDateRange([fromDate, toDate]);
    // fethAppData();
    fetch(
      `https://go-dev.greedygame.com/v3/dummy/report?startDate=${fromDate}&endDate=${toDate}`
    )
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        console.log("APi Data", result);
        result.data.map((val) => {
          val.date = moment(val.date).format("DD-MMM-YYYY");
          val.rate = (val.requests / val.responses) * 100;
          val.ctr = (val.clicks / val.impressions) * 100;
          val.app_id = appsArr.find(
            (apps) => apps.app_id === val.app_id
          ).app_name;
        });
        dispatch(addAnalytics(result.data));
        // data.data.rate = (data.requests / data.response) * 100;
        // data.data.ctr = (data.clicks / data.impressions) * 100;
        console.log("resssssss", result);
      });
  };

  function fethAppData() {
    fetch(`http://go-dev.greedygame.com/v3/dummy/apps`)
      .then((response) => {
        return response.json();
      })
      .then((result) => {
        dispatch(addApps(result.data));
        console.log("Apps res😂", result);
      });
  }

  function disabledDate(current) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
    // console.log(current, moment());
    // console.log("subtract,..", moment().add(31, "day"));
    // return !(
    //   current > moment().subtract(31, "day") &&
    //   current < moment().add(31, "day")
    // );
  }
  return (
    <RangePicker
      onChange={(dates) => {
        let fromDate =
          dates != null ? moment(dates[0].$d).format("YYYY-MM-DD") : "";
        let toDate =
          dates != null ? moment(dates[1].$d).format("YYYY-MM-DD") : "";

        fetchAnalyticsData(fromDate, toDate);
      }}
      // disabledDate={disabledDate}
    />
  );
}
export default DateRangePicker;
