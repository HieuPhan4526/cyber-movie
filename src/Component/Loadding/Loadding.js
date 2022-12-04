import React from 'react';
import { useSelector } from 'react-redux';
import styleLoaddingModule from "./LoaddingCss.module.css";
const styteLoadding = {
    position: "fixed",
    top: "0",
    right: "0",
    left: "0",
    bottom: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "white",
    zIndex: "99",
};
export default function Loadding() {
    const { loadding } = useSelector(rootReducer => rootReducer.LoaddingReducer);
    if (!loadding) return null;
    return (
        <div style={styteLoadding}>
            <i className={`${styleLoaddingModule["preloader"]}`} />
        </div>
    );
}