import { Progress, Rate } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ListRapDetailFilm from "./component/ListRapDetailFilm";
import { layThongTinLichChieuAction } from "../../Redux/Action/QuanLyHeThongRapAction.js";
//Css
import filmDetailCss from "./FilmDetail.module.css";
import { history } from "../../App";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export default function FilmDetail(props) {
  let { id } = props.match.params;
  let { filmDetail } = useSelector(
    (rootReducer) => rootReducer.QuanLyPhimReducer
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinLichChieuAction(id));
  }, []);
  let { heThongRapChieu } = filmDetail;

  const [value, setValue] = useState(3);
  return (
    <Fragment>
      <div>
        <div
          style={{
            backgroundImage: `url(${filmDetail.hinhAnh})`,
            minHeight: "100vh",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            position: "relative",
          }}
        >
          <div
            style={{
              position: "absolute",
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0,0,0,0.5  )",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-6">
                  <div
                    style={{
                      position: "absolute",
                      top: "20vh",
                    }}
                  >
                    <div className="d-flex justify-content-center align-items-center">
                      <img
                        width={250}
                        height={300}
                        src={filmDetail.hinhAnh}
                        alt=""
                      />
                      <div
                        className={`ml-3 text-white font-weight-bold ${filmDetailCss["reponsive"]}`}
                      >
                        <p>
                          {moment(filmDetail.ngayKhoiChieu).format(
                            "DD.MM.YYYY"
                          )}
                        </p>
                        <h4 className="text-warning">{filmDetail.tenPhim}</h4>
                        <p>
                          {filmDetail.moTa?.length > 300
                            ? `${filmDetail.moTa.slice(0, 300)}.....`
                            : filmDetail.moTa}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div
                    style={{
                      position: "absolute",
                      top: "30vh",
                      left: "50%",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <span className="my-2 text-danger text-center font-weight-bold">
                        Đánh Giá Phim
                      </span>

                      <div>
                        <Progress
                          type="circle"
                          percent={100}
                          format={() => {
                            return (
                              <span
                                style={{
                                  fontSize: "50px",
                                  color: "white",
                                  fontWeight: "bold",
                                }}
                              >
                                {filmDetail.danhGia}đ
                              </span>
                            );
                          }}
                        />
                      </div>
                      <Rate
                        tooltips={desc}
                        onChange={setValue}
                        // value={(`${filmDetail.danhGia}` / 2).toFixed(2)}
                        value={(`${filmDetail.danhGia}` / 2).toFixed(2)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="py-5"
        style={{
          backgroundImage:
            "url(https://chiase24.com/wp-content/uploads/2022/02/Tong-hop-cac-hinh-anh-background-dep-nhat-21.jpg)",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <ListRapDetailFilm heThongRapChieu={heThongRapChieu} />
      </div>
    </Fragment>
  );
}
