import { Radio, Space, Tabs } from "antd";
import React, { useState } from "react";
const { TabPane } = Tabs;

export default function HeThongCumRap(props) {
  let { heThongRapChieu } = props;
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const renderHeThongCumRap = () => {
    return heThongRapChieu.map((rapChieu, index) => {
      return (
        <TabPane
          key={index}
          tab={
            <div>
              <img
                className="mr-4"
                style={{ width: "60px", height: "60px", borderRadius: "100%" }}
                src={rapChieu.logo}
              />
            </div>
          }
        >
          <Tabs tabPosition={tabPosition}>
            {rapChieu.cumRapChieu.map((cumRap, index) => {
              return (
                <TabPane
                  key={index}
                  tab={
                    <div className="d-flex text-left">
                      <img
                        className="mr-4"
                        style={{
                          width: "60px",
                          height: "60px",
                        }}
                        src={cumRap.hinhAnh}
                      />
                      <div>
                        <span
                          style={{
                            fontWeight: "bold",
                          }}
                        >
                          {cumRap.tenCumRap}
                        </span>
                      </div>
                    </div>
                  }
                ></TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };
  return (
    <div>
      <Tabs tabPosition={tabPosition}>{renderHeThongCumRap()}</Tabs>
    </div>
  );
}
