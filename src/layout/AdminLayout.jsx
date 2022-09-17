import { Avatar, Button, Layout, Menu, Space } from 'antd';
import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined, GitlabOutlined, LogoutOutlined } from '@ant-design/icons';
import { NavLink, Route } from 'react-router-dom';
import { history } from '../App';
import { USER_LOGIN } from '../ultil/setting';
import Buttoncss from '../Component/Button/Buttoncss';
import { Children } from 'react';
import MainFooter from '../Component/Footer/MainFooter';


const { Header, Content, Footer, Sider } = Layout;

export default function AdminLayout(props) {
    const renderUser = () => {
        if (localStorage.getItem(USER_LOGIN)) {
            let user = JSON.parse(localStorage.getItem(USER_LOGIN))
            return <div style={{ cursor: "pointer",display:"Flex",alignItems:"center" }} className="d-flex text-dark">
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
        <Route exact path={props.path}
            render={(propsRoute) => {
                return <Layout>
                    <Sider
                        breakpoint="lg"
                    >
                        <div className="logo p-3" style={{ border: "1px solid gray" }}>
                            <NavLink to={"/home"}>
                                <GitlabOutlined className="logo" style={{ fontSize: "40px" }} />
                                <span style={{ color: "white", fontSize: "20px" }}>Cyber Cinema</span>
                            </NavLink>

                        </div>
                        <Menu
                            theme="dark"
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            items={[
                                {
                                    key:"danhSachPhim",
                                    icon: <VideoCameraOutlined/>,
                                    label: <NavLink to={"/admin/film"}>Danh Sách Phim</NavLink>,
                                    children:[{
                                        key:"themPhimmoi",
                                        label:<NavLink to={"/admin/film/addfilm"}>Thêm phim mới</NavLink>,
                                        icon: <UploadOutlined/>
                                    }]
                                }
                            ]}
                        />
                    </Sider>
                    <Layout>
                        <Header
                            className="site-layout-sub-header-background"
                            style={{
                                padding: 10,
                                marginLeft: 18,
                                display: "flex",
                                justifyContent: "space-between"
                            }}
                        ><h1>Trang Quản Lý Hệ Thống</h1>
                            {renderUser()}
                        </Header>
                        <Content
                            style={{
                                margin: '24px 16px 0',
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
                                textAlign: 'center',
                            }}
                        >
                            <MainFooter/>
                        </Footer>
                    </Layout>
                </Layout>
            }}
        />

    )
}
