import { useDispatch } from "react-redux";
import { getAnalytics } from "../redux/actions/analyticsAction";
import "./DateRangePicker.css";
import { DatePicker } from "antd";
import moment from "moment";

const { RangePicker } = DatePicker;
function DateRangePicker() {
  const dispatch = useDispatch();

  const fetchAnalyticsData = (fromDate, toDate) => {
    dispatch(getAnalytics({ fromDate, toDate }));
  };

  function disabledDate(current) {
    return (
      moment().add(-1, "days") >= current || moment().add(1, "month") <= current
    );
  }
  return (
    <RangePicker
      disabledDate={disabledDate}
      onChange={(dates) => {
        let fromDate =
          dates != null ? moment(dates[0].$d).format("YYYY-MM-DD") : "";
        let toDate =
          dates != null ? moment(dates[1].$d).format("YYYY-MM-DD") : "";

        fetchAnalyticsData(fromDate, toDate);
      }}
    />
  );
}
export default DateRangePicker;
