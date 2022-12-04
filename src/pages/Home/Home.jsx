import React, { useEffect, useRef, useState } from "react";
import Banner from "./Component/Banner";
import MovieList from "./Component/MovieList";
import MovieSchedule from "./Component/MovieSchedule";
import "../../Assets/css/reponsiveCss.css";
import Loadding from "../../Component/Loadding/Loadding";
import { useDispatch } from "react-redux";
import { HIDE_LOADDING, SHOW_LOADDING } from "../../Redux/Type/LoaddingType";

const Home = (props) => {
  const dispatch = useDispatch();
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
  return (
    <div>
      <Banner />
      <MovieList />
      <MovieSchedule />
      <Loadding />
    </div>
  );
};

export default Home;
