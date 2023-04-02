import "./DynamicTable.css";
import { useSelector, useDispatch } from "react-redux";
import { Popover, Spin, Empty } from "antd";
import { FilterFilled } from "@ant-design/icons";
import { useState } from "react";
import CustomPopover from "./CustomPopover";
import EmptyImage from "../assets/empty.png";
function DynamicTable() {
  const settingsArr = useSelector((state) => state.settings.value);
  const analyticsArr = useSelector((state) => state.analytics.value);
  const filteredArr = useSelector((state) => state.analytics.analyticsValue);
  const loader = useSelector((state) => state.analytics.loader);
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
        <tr key={index}>
          {settingsArr.map(
            (setting, index) =>
              setting.isVisible && (
                <td key={index}>
                  {["ctr", "rate"].includes(setting.columnName)
                    ? roundOff(analytics[setting.columnName]) + "%"
                    : ["revenue"].includes(setting.columnName)
                    ? "$" + roundOff(analytics[setting.columnName])
                    : roundOff(analytics[setting.columnName])}
                </td>
              )
          )}
        </tr>
      );
    });
  };
  function roundOff(num) {
    return typeof num == "string" ? num : Math.round(num * 100) / 100;
  }
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
        <thead></thead>
        <tbody>
          <tr>
            {(filteredArr.length != 0 || analyticsArr.length != 0) &&
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
          {!loader ? (
            analyticsArr.length == 0 ? (
              <Empty
                image={EmptyImage}
                imageStyle={{ height: "250px", width: "250px" }}
                className="empty"
                description={false}
              />
            ) : (
              tdData()
            )
          ) : (
            <Spin size="large" tip="Fetching Data.." className="loader" />
          )}
        </tbody>
      </table>
    </>
  );
}
export default DynamicTable;
