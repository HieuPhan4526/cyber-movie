import { Component, Fragment } from "react";
import { Redirect, Route } from "react-router";
import { USER_LOGIN } from "../ultil/setting";




export const ChairTableLayout = (props) => {

    if (!localStorage.getItem(USER_LOGIN)) {
        return <Redirect to="/login" />;
    }


    return <Route {...props} render={(propsRoute) => {
        return <Fragment>
            <props.Component {...propsRoute} />


        </Fragment>;


    }} />;
};