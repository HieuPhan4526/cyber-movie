import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "antd";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { history } from "../../../App";
import { movieService } from "../../../Service/MovieService";
import { useDispatch, useSelector } from "react-redux";
import { GetMovieListAction } from "../../../Redux/Action/MovieAction";
import Loadding from "../../../Component/Loadding/Loadding";
import { SHOW_LOADDING } from "../../../Redux/Type/LoaddingType";

const { Meta } = Card;

export default function MovieList(props) {
  const { movieList } = useSelector((rootReducer) => rootReducer.MovieReducer);
  const { loadding } = useSelector(
    (rootReducer) => rootReducer.LoaddingReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(GetMovieListAction());
  }, []);
  const RenderCard = () => {
    return movieList.map((movie) => {
      return (
        <SwiperSlide className="mb-2 listMovie" key={movie.maPhim}>
          <Card
            onClick={() => {
              history.push(`/filmdetail/${movie.maPhim}`);
            }}
            hoverable
            style={{
              width: "100%",
            }}
            cover={
              <img
                style={{ height: "250px", width: "100%" }}
                alt=""
                src={movie.hinhAnh}
              />
            }
            actions={[
              <EyeOutlined key="detail" />,
              <LikeOutlined key="like" />,
            ]}
          >
            <Meta
              style={{ height: "50px" }}
              title={movie.tenPhim}
              description={movie.biDanh}
            />
          </Card>
        </SwiperSlide>
      );
    });
  };
  return (
    <div className="section">
      <h2>Danh Sách Phim</h2>
      <Swiper
        breakpoints={{
          300: {
            slidesPerView: 1,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          800: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 50,
          },
        }}
        spaceBetween={50}
        slidesPerView={6}
        className="text-center "
      >
        {RenderCard()}
      </Swiper>
    </div>
  );
}
