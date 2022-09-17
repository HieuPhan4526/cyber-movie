import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { dangNhapAction } from "../../Redux/Action/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { history } from "../../App";
import Logo from "../../Component/Logo/Logo";

export default function Login() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
    },
    validationSchema: Yup.object({
      //Các hàm validation của từng trường dữ liệu
      taiKhoan: Yup.string()
        .required("Tài khoản không được để trống"),
      //Ít nhất ký chữ, in hoa, số...
      matKhau: Yup.string()
        .required("Mật khẩu không được để trống"),
    }),
    onSubmit: (values) => {
      dispatch(dangNhapAction(values));
    },
  });

  return (
    <div
      style={{
        width: "40%",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        backgroundImage:
          "linear-gradient(to bottom,rgba(20,50,93,.9),rgba(8,22,48,.9))",
      }}
      className=" text-light p-5"
    >
      <div>
        <div className="text-center">
          <NavLink to="/">
            <Logo></Logo>
          </NavLink>
          <p className="font-weight-bold my-4">
            Đăng nhập để được nhiều ưu đãi, mua vé và bảo mật thông tin!
          </p>
        </div>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="taiKhoan">Tài Khoản</label>
          <input
            type="text"
            className="form-control"
            id="taiKhoan"
            name="taiKhoan"
            onChange={formik.handleChange}
            value={formik.values.taiKhoan}
          />
          {formik.touched.taiKhoan && formik.errors.taiKhoan ? (
            <div className="text-danger">{formik.errors.taiKhoan}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Password</label>
          <input
            type="password"
            className="form-control"
            id="matKhau"
            name="matKhau"
            onChange={formik.handleChange}
            value={formik.values.matKhau}
          />
          {formik.touched.matKhau && formik.errors.matKhau ? (
            <div className="text-danger">{formik.errors.matKhau}</div>
          ) : null}
        </div>
        <div className="d-flex justify-content-between">
          <button type="submit" className="btn btn-outline-info mr-4">
            Đăng Nhập
          </button>
          <div>
            <span className="font-weight-bold text-danger">
              Chưa Có Tài Khoản?
            </span>
            <button
              onClick={() => {
                history.push("register");
              }}
              type="button"
              className="btn btn-outline-primary ml-2"
            >
              Đăng Ký Ngay!
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
