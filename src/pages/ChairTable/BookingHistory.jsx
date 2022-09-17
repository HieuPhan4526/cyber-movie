import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { layThongTinNguoiDungAction } from "../../Redux/Action/QuanLyNguoiDungAction";
import moment from "moment";
import { __ } from "lodash";

export default function BookingHistory() {
  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  console.log(thongTinNguoiDung);
  let { thongTinDatVe } = thongTinNguoiDung;

  let renderBookingInFor = () => {
    return thongTinDatVe?.map((user, index) => {
      return (
        <div className="col-6 p-4" key={index}>
          <div
            className="card mb-3 font-weight-bold"
            style={{
              width: "100%",
              borderRadius: "20px",
              boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px ",
            }}
          >
            <div className="row no-gutters">
              <div className="col-md-5">
                <img
                  style={{
                    borderRadius: "30px",
                  }}
                  className="img-fluid p-3"
                  src={user.hinhAnh}
                  alt="..."
                />
              </div>
              <div className="col-md-7">
                <div className="card-body">
                  <h5 className="card-title text-danger">{user.tenPhim}</h5>
                  <p className="card-text text-success">
                    Giờ Chiếu: {moment(user.ngayDat).format("hh:mm A")}
                    <br />
                    Ngày Chiếu: {moment(user.ngayDat).format("DD-MM-YYYY")}{" "}
                  </p>
                  {user.danhSachGhe?.map((ghe, index) => {
                    return (
                      <div key={index}>
                        <p>{ghe.tenHeThongRap}</p>
                        <span>{ghe.tenRap}: </span>
                        <span className="text-success p-3">[{ghe.tenGhe}]</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="container">
      <div className="p-3">
        <div className="text-center my-2">
          <h2>Lịch Sử Đặt Vé</h2>
          <p>
            Hãy xem thông tin địa chỉ và thời gian để xem phim vui vẻ bạn nhé!!
          </p>
        </div>

        <div className="row mt-5">{renderBookingInFor()}</div>
      </div>
    </div>
  );
}
