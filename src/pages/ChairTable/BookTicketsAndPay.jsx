import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChiTietDatGheAction,
  datVeAction,
} from "../../Redux/Action/QuanLyDatVeAction";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import "./chairTableCss.css";
import { DAT_VE } from "../../Redux/Type/QuanLyDatVeType";
import { ThongTinDatVe } from "../../_core/models/thongTinDatVe";
export default function BookTicketsAndPay(props) {
  let { id } = props.match.params;
  const { thongTinPhongVe, danhSachGheDangDat } = useSelector(
    (rootReducer) => rootReducer.QuanLyDatVeReducers
  );
  const { userLogin } = useSelector(
    (rootReducer) => rootReducer.QuanLyNguoiDungReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(ChiTietDatGheAction(id));
  }, []);
  let { danhSachGhe, thongTinPhim } = thongTinPhongVe;

  const renderChair = () => {
    return danhSachGhe.map((ghe, index) => {
      let gheVipCss = ghe.loaiGhe === "Vip" ? "gheVip" : "";
      let gheDaDatCss = ghe.daDat === true ? "gheDuocChon" : "";
      let gheDangDatCss = "";
      let gheDaDuocDatCss = "";

      let indexGheDangDat = danhSachGheDangDat.findIndex(
        (gheDangDat) => gheDangDat.maGhe === ghe.maGhe
      );
      if (indexGheDangDat > -1) {
        gheDangDatCss = "gheDangChon";
      }
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        gheDaDuocDatCss = "gheDaDuocDat";
      }
      return (
        <Fragment key={index}>
          <button
            disabled={`${gheDaDatCss}`}
            onClick={() => {
              dispatch({
                type: DAT_VE,
                gheDangDat: ghe,
              });
            }}
            className={`ghe ${gheVipCss} ${gheDaDatCss} ${gheDangDatCss} ${gheDaDuocDatCss}`}
          >
            {ghe.daDat ? (
              gheDaDuocDatCss != "" ? (
                <UserOutlined className="text-warning" />
              ) : (
                <CloseCircleOutlined />
              )
            ) : (
              ghe.stt
            )}
          </button>
          {(index + 1) % 10 === 0 ? <br /> : ""}
        </Fragment>
      );
    });
  };
  const renderGheDangDat = () => {
    return danhSachGheDangDat.map((gheDangDat, index) => {
      return (
        <tr key={index}>
          <th>{gheDangDat.tenGhe}</th>
          <th>{gheDangDat.loaiGhe}</th>

          <th>{gheDangDat.giaVe.toLocaleString()} VND</th>
        </tr>
      );
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-8">
          <div className="text-center screen mb-2">
            <h4>Màn Hình</h4>
          </div>
          {renderChair()}
        </div>
        <div className="col-4">
          <hr />
          <h2>{thongTinPhim.tenPhim}</h2>
          <p>Địa Điểm: {thongTinPhim.tenCumRap}</p>
          <p>
            {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </p>
          <hr />
          <div>
            <ul>
              <li className="d-flex align-items-center">
                <button className="ghe mx-0"></button>
                <span className="ml-2 font-weight-bold">Ghế thường</span>
              </li>
              <li className="d-flex align-items-center my-2">
                <button className="gheDangChon"></button>
                <span className="ml-2 font-weight-bold">Ghế Đang Chọn</span>
              </li>
              <li className="d-flex align-items-center my-2">
                <button className="gheVip"></button>
                <span className="ml-2 font-weight-bold">Ghế Vip</span>
              </li>

              <li className="d-flex align-items-center my-2">
                <button className="gheDuocChon">
                  {" "}
                  <CloseCircleOutlined />
                </button>
                <span className="ml-2 font-weight-bold">Ghế Đã Được Đặt</span>
              </li>
              <li className="d-flex align-items-center my-2">
                <button className="gheDaDuocDat">
                  {" "}
                  <UserOutlined className="text-warning" />
                </button>
                <span className="ml-2 font-weight-bold">Ghế Mình Đặt</span>
              </li>
            </ul>
          </div>
          <hr />
          <table className="table table-dark table-bordered">
            <thead>
              <tr className="text-center">
                <th scope="col">Ghế</th>
                <th scope="col">Loại Ghê</th>
                <th scope="col">Giá Ghế</th>
              </tr>
            </thead>
            <tbody>{renderGheDangDat()}</tbody>
            <tfoot>
              <tr>
                <th></th>
                <th></th>
                <th>
                  Tổng Tiền:{" "}
                  {danhSachGheDangDat
                    .reduce((tongTien, gheDangDat, index) => {
                      return (tongTien += gheDangDat.giaVe);
                    }, 0)
                    .toLocaleString()}{" "}
                  VND
                </th>
              </tr>
            </tfoot>
          </table>
          <hr />
          <h5>Email: {userLogin.email}</h5>
          <hr />
          <h5>Tài Khoản: {userLogin.taiKhoan}</h5>
          <div className="mt-5">
            <button
              onClick={() => {
                const thongTinDatVe = new ThongTinDatVe();
                thongTinDatVe.maLichChieu = id;
                thongTinDatVe.danhSachVe = danhSachGheDangDat;
                dispatch(datVeAction(thongTinDatVe));
              }}
              className="btn btn-success w-100 font-weight-bold"
            >
              Đặt Vé
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
