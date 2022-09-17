import { Radio, Space, Tabs } from "antd";
import React, { Fragment, useState } from "react";
import { NavLink } from "react-router-dom";
import moment from "moment";

const { TabPane } = Tabs;

export default function ListRapDetailFilm(props) {
  const [tabPosition, setTabPosition] = useState("left");

  const changeTabPosition = (e) => {
    setTabPosition(e.target.value);
  };
  const { heThongRapChieu } = props;

  const renderHeThongRapDetail = () => {
    return heThongRapChieu?.map((rap, index) => {
      return (
        <TabPane
          className="py-5"
          key={index}
          tab={
            <Fragment>
              <div>
                <img width={60} height={60} src={rap.logo} alt="" />
                <span className="ml-4 font-weight-bold">
                  {rap.tenHeThongRap}
                </span>
              </div>
              <hr className="w-100" />
            </Fragment>
          }
        >
          {rap.cumRapChieu?.map((cumRap, index) => {
            return (
              <div className="d-flex mb-5" key={index}>
                <img
                  className="mb-5 mr-4"
                  width={60}
                  height={60}
                  src={cumRap.hinhAnh}
                  alt=""
                />
                <div className="font-weight-bold">
                  <h4 className="text-success">{cumRap.tenCumRap}</h4>
                  <p>{cumRap.diaChi}</p>
                  {cumRap.lichChieuPhim.map((lichChieu, index) => {
                    return (
                      <NavLink
                        to={`/chairtable/${lichChieu.maLichChieu}`}
                        key={index}
                        className="p-2"
                      >
                        <button className="btn btn-outline-success my-2">
                          {moment(lichChieu.ngayChieuGioChieu).format("h:mm a")}
                        </button>
                      </NavLink>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };

  return (
    <div
      className="container"
      style={{ borderRadius: "10px", backgroundColor: "rgba(255,255,255,0.9)" }}
    >
      <Tabs tabPosition={tabPosition} centered>
        {renderHeThongRapDetail()}
      </Tabs>
    </div>
  );
}
