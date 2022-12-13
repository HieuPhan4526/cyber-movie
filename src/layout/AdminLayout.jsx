import { Avatar, Button, Layout, Menu, Space } from "antd";
import React, { useEffect } from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  GitlabOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import { NavLink, Route } from "react-router-dom";
import { history } from "../App";
import { USER_LOGIN } from "../ultil/setting";
import Buttoncss from "../Component/Button/Buttoncss";
import { Children } from "react";
import MainFooter from "../Component/Footer/MainFooter";
import { HIDE_LOADDING, SHOW_LOADDING } from "../Redux/Type/LoaddingType";
import { useDispatch } from "react-redux";

const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout(props) {
  const renderUser = () => {
    if (localStorage.getItem(USER_LOGIN)) {
      let user = JSON.parse(localStorage.getItem(USER_LOGIN));
      return (
        <div
          style={{ cursor: "pointer", alignItems: "center" }}
          className="d-flex text-dark"
        >
          <div
            className="d-flex align-items-center justify-content-center"
            onClick={() => {
              history("/profile");
            }}
          >
            <Avatar
              size="large"
              icon={<img src="https://picsum.photos/200/300" alt="" />}
            />
            <span className="pl-2 pr-4 text-UserAD font-weight-bold">
              <span>{user.hoTen}</span>/<span>{user.maLoaiNguoiDung}</span>
            </span>
          </div>

          <Button
            onClick={() => {
              localStorage.clear();
              history.push("/home");
            }}
            type="danger"
            shape="circle"
            icon={<LogoutOutlined />}
          />
        </div>
      );
    } else {
      return (
        <div>
          <Space>
            <NavLink to={"/register"}>
              <Buttoncss name={"Đăng Ký"} />
            </NavLink>
            <NavLink to={"/login"}>
              <Buttoncss name={"Đăng Nhập"} />
            </NavLink>
          </Space>
        </div>
      );
    }
  };
  return (
    <Route
      exact
      path={props.path}
      render={(propsRoute) => {
        return (
          <Layout>
            <Sider breakpoint="lg">
              <div className="logo p-3" style={{ border: "1px solid gray" }}>
                <NavLink to={"/home"}>
                  <GitlabOutlined
                    className="logo mr-2"
                    style={{ fontSize: "40px" }}
                  />
                  <span
                    style={{
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "15  px",
                    }}
                  >
                    Cyber Cinema
                  </span>
                </NavLink>
              </div>
              <Menu
                theme="dark"
                mode="inline"
                defaultSelectedKeys={["1"]}
                items={[
                  {
                    key: "danhSachPhim",
                    icon: <VideoCameraOutlined />,
                    label: (
                      <span
                        onClick={() => {
                          history.push("/admin/film/addfilm");
                        }}
                        className="meunu-text font-weight-bold"
                      >
                        Thêm phim mới
                      </span>
                    ),
                  },
                ]}
              />
            </Sider>
            <div className="container">
              <Layout>
                <nav
                  style={{
                    padding: 10,
                    margin: 18,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  className="navbar navbar-expand-lg navbar-light bg-light"
                >
                  <a className="navbar-brand" href="#">
                    <h1 className="m-0">Admin</h1>
                  </a>
                  <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                  >
                    <span className="navbar-toggler-icon" />
                  </button>
                  <div
                    className="collapse navbar-collapse justify-content-end"
                    id="navbarSupportedContent"
                  >
                    {renderUser()}
                  </div>
                </nav>
                <Content
                  style={{
                    margin: "24px 16px 0",
                  }}
                >
                  <div
                    className="site-layout-background"
                    style={{
                      padding: 24,
                      minHeight: 360,
                    }}
                  >
                    <props.component {...propsRoute} />
                  </div>
                </Content>
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                >
                  <MainFooter />
                </Footer>
              </Layout>
            </div>
          </Layout>
        );
      }}
    />
  );
}
