import React, { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ChiTietDatGheAction,
  datVeAction,
} from "../../Redux/Action/QuanLyDatVeAction";
import { CloseCircleOutlined, UserOutlined } from "@ant-design/icons";
import "./chairTableCss.css";
import { DAT_VE } from "../../Redux/Type/QuanLyDatVeType";
import { ThongTinDatVe } from "../../_core/models/thongTinDatVe";
import Loadding from "../../Component/Loadding/Loadding";
import swal from "sweetalert";

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
          {/* {(index + 1) % 10 === 0 ? <br /> : ""} */}
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
    <div className="container py-3">
      <hr />
      <div className="d-flex flex-wrap justify-content-between">
        <div className="infoFiml-Pay">
          <h2>{thongTinPhim.tenPhim}</h2>
          <h4>?????a ??i???m: {thongTinPhim.tenCumRap}</h4>
          <h4>
            {thongTinPhim.ngayChieu} - {thongTinPhim.gioChieu}
          </h4>
        </div>
        <div>
          <h3 className="info-user text-light font-weight-bold">
            Email: {userLogin.email}
          </h3>
          <h3 className="info-user text-light font-weight-bold">
            T??i Kho???n: {userLogin.taiKhoan}
          </h3>
        </div>
      </div>
      <hr />
      <div>
        <ul className="d-flex  justify-content-between flex-wrap">
          <li className="d-flex align-items-center">
            <button className="ghe chair-reponsive mx-0"></button>
            <span className="ml-2 font-weight-bold text-light">Gh??? th?????ng</span>
          </li>
          <li className="d-flex align-items-center my-2">
            <button className="gheDangChon chair-reponsive "></button>
            <span className="ml-2 font-weight-bold text-light">
              Gh??? ??ang Ch???n
            </span>
          </li>
          <li className="d-flex align-items-center my-2">
            <button className="gheVip chair-reponsive"></button>
            <span className="ml-2 font-weight-bold text-light">Gh??? Vip</span>
          </li>
          <li className="d-flex align-items-center my-2">
            <button className="gheDuocChon  chair-reponsive2">
              <CloseCircleOutlined />
            </button>
            <span className="ml-2 font-weight-bold text-light">
              Gh??? ???? ???????c ?????t
            </span>
          </li>
          <li className="d-flex align-items-center my-2">
            <button className="gheDaDuocDat chair-reponsive2 ">
              <UserOutlined className="text-warning" />
            </button>
            <span className="ml-2 font-weight-bold text-light">
              Gh??? M??nh ?????t
            </span>
          </li>
        </ul>
      </div>
      <hr />
      <div>
        <div className="text-center screen mb-2">
          <h4 className="text-light font-weight-bold">M??n H??nh</h4>
        </div>
        <div>{renderChair()}</div>
      </div>
      <div className="info-booking">
        <hr />
        <table
          style={{
            marginTop: "50px",
          }}
          className="table table-dark table-bordered"
        >
          <thead>
            <tr className="text-center">
              <th scope="col">Gh???</th>
              <th scope="col">Lo???i Gh???</th>
              <th scope="col">Gi?? Gh???</th>
            </tr>
          </thead>
          <tbody className="text-center">{renderGheDangDat()}</tbody>
          <tfoot>
            <tr>
              <th></th>
              <th></th>
              <th className="text-center">
                T???ng Ti???n:{" "}
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
        <div className="d-flex justify-content-end">
          <button
            onClick={() => {
              const thongTinDatVe = new ThongTinDatVe();
              thongTinDatVe.maLichChieu = id;
              thongTinDatVe.danhSachVe = danhSachGheDangDat;
              if (thongTinDatVe.danhSachVe.length > 0) {
                dispatch(datVeAction(thongTinDatVe));
              } else {
                swal({
                  text: "Vui l??ng ch???n gh???.",
                  icon: "warning",
                  dangerMode: true,
                });
              }
            }}
            className="btn btn-success font-weight-bold"
          >
            ?????t V??
          </button>
        </div>
      </div>
    </div>
  );
}
