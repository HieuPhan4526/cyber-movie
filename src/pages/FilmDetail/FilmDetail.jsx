import { Progress, Rate } from "antd";
import React, { Fragment, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";
import ListRapDetailFilm from "./component/ListRapDetailFilm";
import { layThongTinLichChieuAction } from "../../Redux/Action/QuanLyHeThongRapAction.js";
//Css
import { history } from "../../App";
import Loadding from "../../Component/Loadding/Loadding";
import { HIDE_LOADDING, SHOW_LOADDING } from "../../Redux/Type/LoaddingType";
import { Tabs } from "antd";

const desc = ["terrible", "bad", "normal", "good", "wonderful"];

export default function FilmDetail(props) {
  let { id } = props.match.params;
  let { filmDetail } = useSelector(
    (rootReducer) => rootReducer.QuanLyPhimReducer
  );
  let dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinLichChieuAction(id));
    dispatch({
      type: SHOW_LOADDING,
    });
    setTimeout(() => {
      dispatch({
        type: HIDE_LOADDING,
      });
    }, 3000);
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
              backgroundColor: "rgba(0,0,0,0.5 )",
            }}
          >
            <div className="container">
              <div className="row">
                <div className="col-sm-12 col-lg-6">
                  <div
                    className="left-contentDetail"
                    style={{
                      position: "absolute",
                      top: "20vh",
                    }}
                  >
                    <div className="filmContent d-flex justify-content-center align-items-center ">
                      <div>
                        <img
                          width={250}
                          height={300}
                          src={filmDetail.hinhAnh}
                          alt=""
                        />
                      </div>
                      <div
                        className={`textLeft-filmDetail ml-3 font-weight-bold`}
                      >
                        <Tabs defaultActiveKey="1">
                          <Tabs.TabPane
                            tab={<p className="tab-TextFilmDetail">Mô Tả</p>}
                            key="1"
                          >
                            <div className="text-description">
                              <p style={{ color: "white" }}>
                                {moment(filmDetail.ngayKhoiChieu).format(
                                  "DD.MM.YYYY"
                                )}
                              </p>
                              <h4 className="text-warning">
                                {filmDetail.tenPhim}
                              </h4>
                              <p style={{ color: "white" }}>
                                {filmDetail.moTa?.length > 300
                                  ? `${filmDetail.moTa.slice(0, 300)}.....`
                                  : filmDetail.moTa}
                              </p>
                            </div>
                          </Tabs.TabPane>
                          <Tabs.TabPane
                            tab={<p className="tab-TextFilmDetail">Trailer</p>}
                            key="2"
                          >
                            <div style={{ position: "relative" }}>
                              <img
                                width={230}
                                height={200}
                                src={filmDetail.hinhAnh}
                                alt="Lỗi! Đang cập nhập"
                              />
                              <div className="overlay-trailer">
                                <div className="overlayTrailer-icon">
                                  <a target="_blank" href={filmDetail.trailer}>
                                    <img
                                      className="icon-play"
                                      width={50}
                                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/YouTube_play_button_icon_%282013%E2%80%932017%29.svg/2560px-YouTube_play_button_icon_%282013%E2%80%932017%29.svg.png"
                                      alt=""
                                    />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </Tabs.TabPane>
                        </Tabs>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="rate_filmDetail col-sm-12 col-lg-6">
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
      <Loadding />
    </Fragment>
  );
}
