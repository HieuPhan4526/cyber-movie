import React, { useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Card } from "antd";
import { EyeOutlined, LikeOutlined } from "@ant-design/icons";
import { useState } from "react";
import { history } from "../../../App";
import { movieService } from "../../../Service/MovieService";

const { Meta } = Card;

export default function MovieList(props) {
  let arr = [];
  arr.length = 10;

  const RenderCard = () => {
    let [movieArr, setMovieArr] = useState([]);

    useEffect(() => {
      movieService.GetMovieList()
        .then((result) => {
          setMovieArr(result.data.content);
        })
        .catch((error) => {
          console.log(error);
        });
    }, []);

    return movieArr.map((movie) => {
      return (
        <SwiperSlide className="mb-2" key={movie.maPhim}>
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
    <div className='section'>
      <h2>Danh Sách Phim</h2>
      <Swiper spaceBetween={50} slidesPerView={6} className="text-center ">
        {RenderCard()}
      </Swiper>
    </div>
  );
}
