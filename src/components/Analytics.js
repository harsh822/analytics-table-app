import "./Analytics.css";
import DateRangePicker from "./DateRangePicker";
import Settings from "./Settings";
import { Button, Row, Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addApps } from "../redux/AppSlice";
import DynamicTable from "./DynamicTable";
function Analytics() {
  const [settings, setSettings] = useState();
  const dispatch = useDispatch();
  useEffect(() => {
    fethAppData();
  }, []);
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
  function handleChange(val) {
    setSettings(val);
  }
  return (
    <>
      <Row className="mainContainer">
        <Col span={1} className="leftContainer"></Col>
        <Col span={23} className="rightContainer">
          <h3>Analytics</h3>
          <div className="dateAndSettingButtons">
            <DateRangePicker borderColor="blue"></DateRangePicker>
            <Button
              onClick={() => {
                settings ? setSettings(false) : setSettings(true);
              }}
            >
              <SettingOutlined />
              Settings
            </Button>
          </div>
          <Settings
            updateVisiblity={handleChange}
            {...{ isSettingsVisible: settings }}
          ></Settings>
          <DynamicTable></DynamicTable>
        </Col>
      </Row>
    </>
  );
}
export default Analytics;
