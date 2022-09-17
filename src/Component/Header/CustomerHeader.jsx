import React from "react";
import {
  GitlabOutlined,
  LogoutOutlined
} from "@ant-design/icons";

import { Avatar, Button, Space } from "antd"
import { NavLink } from "react-router-dom";
import { USER_LOGIN } from "../../ultil/setting";
import { history } from "../../App"
import Buttoncss from "../Button/Buttoncss";
import Logo from "../Logo/Logo";
export default function CustomerHeader() {
  const renderUser = () => {
    if (localStorage.getItem(USER_LOGIN)) {
      let user = JSON.parse(localStorage.getItem(USER_LOGIN))
      return <div style={{ cursor: "pointer" }} className="navbar-nav nav-link text-dark">
        <NavLink to="/profile">
          <Avatar size="large" icon={<img src="https://picsum.photos/200/300" alt="" />} />
          <span className="pl-2 pr-4">
            {user.hoTen}
            /
            {user.maLoaiNguoiDung}
          </span>
        </NavLink>
        <Button onClick={() => {
          localStorage.clear()
          history.push("/home")
        }} type="danger" shape="circle" icon={<LogoutOutlined />} />
      </div>
    } else {
      return <div>
        <Space>
          <NavLink to={"/register"}>
            <Buttoncss name={"Đăng Ký"} />
          </NavLink>
          <NavLink to={"/login"}>
            <Buttoncss name={"Đăng Nhập"} />
          </NavLink>
        </Space>

      </div>
    }
  }
  return (
    <div>
      <nav className="navbar fixed-top navbar-expand-lg navbar-light bg-light" style={{ boxShadow: "0px 20px 10px 0px rgba(0,0,0,0.3)" }}>
        <div className="container-fluid px-5">
          <NavLink to={"/home"}>
            <span className="navbar-brand" style={{ fontSize: 25, fontWeight: 600 }}>
              <GitlabOutlined style={{ fontSize: "70px", display: "block" }} />
            </span>
          </NavLink>

          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item"><Logo /></li>
              <li className="nav-item active">
                <span style={{ cursor: "pointer", fontSize: 30, fontWeight: 700 }} onClick={() => {
                  history.push("/home")
                }} className="nav-link menu-item px-5">Home</span>
              </li>
              <li className="nav-item menu-item">
                <span style={{ cursor: "pointer", fontSize: 30, fontWeight: 700 }} onClick={() => {
                  let user = JSON.parse(localStorage.getItem(USER_LOGIN))
                  if (user) {
                    history.push("/admin/film")
                  } else {
                    history.push("/login")
                  }
                }} className="nav-link">Admin</span>
              </li>
            </ul>
            {renderUser()}
          </div>
        </div>

      </nav>
    </div>
  );
}
