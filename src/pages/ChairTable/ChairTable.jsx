import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import BookTicketsAndPay from "./BookTicketsAndPay";
import BookingHistory from "./BookingHistory";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Component/Logo/Logo";
import { CHANGE_TAB_ACTIVE } from "../../Redux/Type/QuanLyDatVeType";
import { NavLink } from "react-router-dom";
import Loadding from "../../Component/Loadding/Loadding";
import { HIDE_LOADDING, SHOW_LOADDING } from "../../Redux/Type/LoaddingType";

const { TabPane } = Tabs;

export default function ChairTable(props) {
  const dispatch = useDispatch();
  const { tabActive } = useSelector(
    (rootReducer) => rootReducer.QuanLyDatVeReducers
  );
  useEffect(() => {
    dispatch({
      type: SHOW_LOADDING,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADDING,
      });
    }, 3000);
  }, []);
  const showAndHideLoad = () => {
    dispatch({
      type: SHOW_LOADDING,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADDING,
      });
    }, 2000);
  };
  return (
    <div className="px-5">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
          showAndHideLoad();
          dispatch({
            type: CHANGE_TAB_ACTIVE,
            number: key,
          });
        }}
      >
        <TabPane tab="01 Kết quả & thanh toán" key="1">
          <BookTicketsAndPay {...props} />
        </TabPane>
        <TabPane tab="02 Lịch Sử Đặt Vé" key="2">
          <BookingHistory {...props} />
        </TabPane>
      </Tabs>
      <Loadding />
    </div>
  );
}
