import "./Analytics.css";
import DateRangePicker from "./DateRangePicker";
import Settings from "./Settings";
import { Button, Row, Col } from "antd";
import { SettingOutlined } from "@ant-design/icons";
import { useState } from "react";
import DynamicTable from "./DynamicTable";
import { useSelector } from "react-redux";
function Analytics() {
  const [settings, setSettings] = useState();
  const analyticsArr = useSelector((state) => state.analytics.value);

  function handleChange(val) {
    setSettings(val);
  }
  return (
    <>
      <Row className="mainContainer">
        <Col
          span={1}
          className="leftContainer"
          style={{ height: analyticsArr.length < 18 ? "100vh" : "" }}
        ></Col>
        <Col span={23} className="rightContainer">
          <h3>Analytics</h3>
          <div className="dateAndSettingButtons">
            <DateRangePicker borderColor="blue"></DateRangePicker>
            <Button
              onClick={() => {
                settings ? setSettings(false) : setSettings(true);
              }}
              className="setting-button"
            >
              <SettingOutlined className="setting-icon" />
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
