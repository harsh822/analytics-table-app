import "./DynamicTable.css";
import { useSelector, useDispatch } from "react-redux";
import { Popover } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { addAnalytics } from "../redux/AnalyticsSlice";
import { useState } from "react";
function DynamicTable() {
  const dispatch = useDispatch();
  const settingsArr = useSelector((state) => state.settings.value);
  const analyticsArr = useSelector((state) => state.analytics.value);
  const [sorted, setSorted] = useState({});
  const [open, setOpen] = useState(false);

  console.log("Analytics arrrrrrrrrrrrrr", analyticsArr);

  // get table row data
  const tdData = () => {
    return analyticsArr.map((analytics, index) => {
      return (
        <tr>
          {settingsArr.map(
            (setting) =>
              setting.isVisible && <td>{analytics[setting.columnName]}</td>
          )}
        </tr>
      );
    });
  };
  function convertHeader(header) {
    if (header == "app_id") {
      return "App";
    } else if (header == "ctr") {
      return "CTR";
    }
    return header.charAt(0).toUpperCase() + header.slice(1);
  }
  function applyfilters(setting) {}
  function sort(setting) {
    let sortBy = setting.columnName;
    setSorted({ sorted: sortBy, reversed: !sorted.reversed });
    let analyticsArrCopy = [...analyticsArr];
    analyticsArrCopy.sort((analyticsA, analyticsB) => {
      if (sorted.reversed) {
        return analyticsB[sortBy] - analyticsA[sortBy];
      }
      return analyticsA[sortBy] - analyticsB[sortBy];
    });
    dispatch(addAnalytics(analyticsArrCopy));
  }

  return (
    <>
      <table id="customers">
        <tr>
          {analyticsArr.length > 0 &&
            settingsArr.map(
              (setting, index) =>
                setting.isVisible && (
                  <th>
                    <div className="header">
                      <FilterFilled
                        onClick={() => applyfilters(setting)}
                        className="filter-button"
                      />
                      {convertHeader(setting.columnName)}
                    </div>
                  </th>
                )
            )}
        </tr>
        {tdData()}
      </table>
      {/* <Popover
        content={<a onClick={hide}>Close</a>}
        title="Title"
        trigger="click"
        open={open}
        onOpenChange={handleOpenChange}
      >
        <Button type="primary">Click me</Button>
      </Popover> */}
    </>
  );
}
export default DynamicTable;
