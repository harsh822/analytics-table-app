import { Input } from "antd";
import "./CustomPopover.css";
import { useDispatch } from "react-redux";
import {
  SortAscendingOutlined,
  SortDescendingOutlined,
} from "@ant-design/icons";
import { useState } from "react";
import { filterAnalytics, sortAnalytics } from "../redux/AnalyticsSlice";
function CustomPopover(props) {
  const dispatch = useDispatch();
  const [sorted, setSorted] = useState();

  function sort() {
    setSorted(!sorted);
    let sortBy = props.columnName;
    dispatch(sortAnalytics({ sorted, sortBy }));
  }

  function search(e) {
    let searchIn = props.columnName;
    let searchValue = e.target.value;
    dispatch(filterAnalytics({ searchIn, searchValue }));
  }
  return (
    <>
      <ul>
        <li className="sort-list" onClick={sort}>
          Sort {!sorted && <SortAscendingOutlined className="sort-icon" />}
          {sorted && <SortDescendingOutlined className="sort-icon" />}
        </li>
        <li>
          <Input
            placeholder="Filter"
            allowClear
            onChange={search}
            style={{
              width: 200,
            }}
          />
        </li>
      </ul>
    </>
  );
}
export default CustomPopover;
