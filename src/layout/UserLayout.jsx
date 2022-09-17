import { Component, Fragment } from "react";
import { Route } from "react-router";




export const UserLayout = (props) => {
    return <Route {...props} render={(propsRoute) => {
        return <Fragment>
            <div style={{
                backgroundImage: "url(https://media.viezone.vn/prod/2021/12/22/large_Thumb_2_712040e550.png)",
                height: "100vh",
                objectFit: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                position: "relative"
            }} >
                <div style={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    backgroundColor: "rgba(0,0,0,0.6)"
                }}>
                    <props.Component {...propsRoute} />

                </div>
            </div>

        </Fragment>;
    }} />;
};