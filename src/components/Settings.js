import { useState } from "react";
import "./Settings.css";
import { useSelector, useDispatch } from "react-redux";
import {
  editSettings,
  editBorderSettings,
  modifyVisibility,
  swapSettings,
} from "../redux/SettingsSlice";
import { Button, Row, Col } from "antd";

function Settings(props) {
  const [editIndex, setEditIndex] = useState([]);
  const [isSettingsVisible, setIsSettingsVisible] = useState();
  //   setIsSettingsVisible(props.isSettingsVisible);
  console.log("ISSettingsVisible", isSettingsVisible);
  const dispatch = useDispatch();
  const settingsArr = useSelector((state) => state.settings.value);
  console.log("Props", props);
  console.log(editIndex);
  function convertHeaderForSettings(header) {
    if (header == "app_id") {
      return "App";
    } else if (header == "ctr") {
      return "CTR";
    } else if (header == "requests") {
      return "Ad Requests";
    } else if (header == "responses") {
      return "Ad Responses";
    }
    return header.charAt(0).toUpperCase() + header.slice(1);
  }
  function handleBoxClick(index) {
    // editIndex.push(index);
    setEditIndex([...editIndex, index]);
    dispatch(editBorderSettings({ index }));
  }
  function applyChanges() {
    editIndex.map((index) => dispatch(editSettings({ index })));
    setEditIndex([]);
    props.updateVisiblity(false);
  }
  function handleCancel() {
    dispatch(modifyVisibility());
    setEditIndex([]);
    props.updateVisiblity(false);
  }
  function handleDrag(e, index) {
    e.dataTransfer.setData("index", index);
  }
  function handleDrop(e, to) {
    const from = e.dataTransfer.getData("index");
    if (
      ["date", "app_id"].includes(settingsArr[from].columnName) ||
      ["date", "app_id"].includes(settingsArr[to].columnName)
    ) {
      alert("You Can Not Move App and Date Column");
      return;
    }
    dispatch(swapSettings({ from, to }));
    console.log("On Drop ", from, "Anddd currIndex", to);
  }
  function handleDragOver(e) {
    e.preventDefault();
  }
  function fixedBoxClicked() {
    alert("You can't change this column");
  }

  return (
    <>
      {props.isSettingsVisible && (
        <div className="settings">
          <h5>Dimensions and Metrices</h5>
          <Row gutter={8}>
            {settingsArr.map((setting, index) => (
              <Col span={3} style={{ marginBottom: "8px" }}>
                <div
                  style={{
                    borderLeft: setting.isBorderVisible ? "5px solid blue" : "",
                  }}
                  disabled={
                    ["date", "app_id"].includes(setting.columnName)
                      ? true
                      : false
                  }
                  draggable={
                    ["date", "app_id"].includes(setting.columnName)
                      ? false
                      : true
                  }
                  onDragStart={(e) => handleDrag(e, index)}
                  onDrop={(e) => handleDrop(e, index)}
                  onDragOver={(e) => handleDragOver(e)}
                  className="dragBox"
                  onClick={() =>
                    !["date", "app_id"].includes(setting.columnName)
                      ? handleBoxClick(index)
                      : fixedBoxClicked()
                  }
                >
                  {convertHeaderForSettings(setting.columnName)}
                </div>
              </Col>
            ))}
          </Row>
          <div className="apply-changes">
            <Button onClick={() => handleCancel()}>Cancel</Button>{" "}
            <Button type="primary" onClick={() => applyChanges()}>
              Apply Changes
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
export default Settings;
