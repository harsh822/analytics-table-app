import "./DynamicTable.css";
import { useSelector, useDispatch } from "react-redux";
import { Popover, Button } from "antd";
import { FilterFilled } from "@ant-design/icons";
// import { addAnalytics } from "../redux/AnalyticsSlice";
import { useState } from "react";
import CustomPopover from "./CustomPopover";
function DynamicTable() {
  const dispatch = useDispatch();
  const settingsArr = useSelector((state) => state.settings.value);
  const analyticsArr = useSelector((state) => state.analytics.value);
  const loader = useSelector((state) => state.analytics.loader);
  const [sorted, setSorted] = useState({});
  const [open, setOpen] = useState({ index: 0, isOpen: false });
  const hide = (index) => {
    setOpen({ index: index, isOpen: false });
  };
  const handleOpenChange = (index) => {
    setOpen({ index: index, open: open.isOpen });
  };
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
  function applyfilters(index) {
    setOpen({ index: index, isOpen: !open.isOpen });
  }

  return (
    <>
      <table id="customers">
        <tr>
          {analyticsArr.length > 0 &&
            settingsArr.map(
              (setting, index) =>
                setting.isVisible && (
                  <th key={index}>
                    <div className="header" key={index}>
                      <Popover
                        key={index}
                        content={
                          <>
                            <CustomPopover {...setting} />{" "}
                            <a onClick={() => hide(index)}>Close</a>
                          </>
                        }
                        title={convertHeader(setting.columnName)}
                        trigger="click"
                        open={index == open.index ? open.isOpen : false}
                        onOpenChange={() => handleOpenChange(index)}
                      >
                        <FilterFilled
                          onClick={() => applyfilters(index, setting)}
                          className="filter-button"
                          key={index}
                        />
                      </Popover>
                      {convertHeader(setting.columnName)}
                    </div>
                  </th>
                )
            )}
        </tr>
        {tdData()}
      </table>
    </>
  );
}
export default DynamicTable;
