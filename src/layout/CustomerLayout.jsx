import React, { Fragment } from "react";
import { Route } from "react-router-dom";
import { Breadcrumb, Layout } from "antd";
import CustomerHeader from "../Component/Header/CustomerHeader";
import MainFooter from "../Component/Footer/MainFooter";
const { Content, Footer } = Layout;

const CustomerLayout = (props) => {
  return (
    <Route exact path={props.path} render={(propsRoute) => {
        return (
          <Fragment>
            <Layout className="customerLayout layout">
              <CustomerHeader/>
              <Content style={{ padding: "100px 50px" }}>
                <Breadcrumb style={{ margin: "16px 0" }}>
                  <Breadcrumb.Item>Home</Breadcrumb.Item>
                  <Breadcrumb.Item>List</Breadcrumb.Item>
                  <Breadcrumb.Item>App</Breadcrumb.Item>
                </Breadcrumb>
                <div className="site-layout-content" style={{backgroundColor: "rgba(255,255,255, 0.8)"}}>
                  <props.component {...propsRoute} />
                </div>
              </Content>
              <Footer style={{borderRadius:"30px 30px 0 0"}}>
                <MainFooter/>
              </Footer>
            </Layout>
          </Fragment>
        );
      }}
    />
  );
};

export default CustomerLayout;
