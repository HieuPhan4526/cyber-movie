import React from "react";
import Banner from "./Component/Banner";
import MovieList from "./Component/MovieList";
import MovieSchedule from "./Component/MovieSchedule";
import "../../Assets/css/reponsiveCss.css";

const Home = (props) => {
  return (
    <div>
      <Banner />
      <MovieList />
      <MovieSchedule />
    </div>
  );
};

export default Home;
