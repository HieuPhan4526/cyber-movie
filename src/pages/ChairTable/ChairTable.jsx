import React from "react";
import { Tabs } from "antd";
import BookTicketsAndPay from "./BookTicketsAndPay";
import BookingHistory from "./BookingHistory";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../../Component/Logo/Logo";
import { CHANGE_TAB_ACTIVE } from "../../Redux/Type/QuanLyDatVeType";
import { NavLink } from "react-router-dom";

const { TabPane } = Tabs;

export default function ChairTable(props) {
  const { tabActive } = useSelector(
    (rootReducer) => rootReducer.QuanLyDatVeReducers
  );
  const dispatch = useDispatch();
  return (
    <div className="px-5">
      <NavLink to="/">
        <Logo />
      </NavLink>
      <Tabs
        defaultActiveKey="1"
        activeKey={tabActive}
        onChange={(key) => {
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
    </div>
  );
}
