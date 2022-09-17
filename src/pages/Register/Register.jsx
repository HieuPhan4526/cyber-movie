import React from "react";
import { NavLink } from "react-router-dom";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import {
  dangKyAction,
  dangNhapAction,
} from "../../Redux/Action/QuanLyNguoiDungAction";
import * as Yup from "yup";
import { GROUP_ID } from "../../ultil/setting";
import Logo from "../../Component/Logo/Logo";

export default function Register() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      taiKhoan: "",
      matKhau: "",
      email: "",
      soDt: "",
      hoTen: "",
      maNhom: GROUP_ID,
    },
    validationSchema: Yup.object({
      //Các hàm validation của từng trường dữ liệu
      taiKhoan: Yup.string()
        .required("Tài khoản không được để trống")
        .min(6, "Tối thiếu 6 ký tự")
        .max(10, "Tối đa 10 ký tự"),
      //Ít nhất ký chữ, in hoa, số...
      matKhau: Yup.string()
        .matches(
          /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{6,8}$/,
          "Mật khẩu chưa đúng định dạng"
        )
        .required("Mật khẩu không được để trống"),
      email: Yup.string()
        .required("Vui lòng không được để trống")
        .email("Email Không hợp lệ"),
      soDt: Yup.string().required("Vui lòng không được để trống"),
      hoTen: Yup.string()
        .required("Vui lòng không được để trống")
        .matches(/^[A-Z a-z]+$/, "Họ tên chưa hợp lệ"),
    }),

    onSubmit: (values) => {
      dispatch(dangKyAction(values));
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
      className=" text-light p-4"
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
        <div className="form-group">
          <label htmlFor="matKhau">email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email ? (
            <div className="text-danger">{formik.errors.email}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Số Điện Thoại</label>
          <input
            type="text"
            className="form-control"
            id="soDt"
            name="soDt"
            onChange={formik.handleChange}
            value={formik.values.soDt}
          />
          {formik.touched.soDt && formik.errors.soDt ? (
            <div className="text-danger">{formik.errors.soDt}</div>
          ) : null}
        </div>
        <div className="form-group">
          <label htmlFor="matKhau">Họ Tên</label>
          <input
            type="text"
            className="form-control"
            id="hoTen"
            name="hoTen"
            onChange={formik.handleChange}
            value={formik.values.hoTen}
          />
          {formik.touched.hoTen && formik.errors.hoTen ? (
            <div className="text-danger">{formik.errors.hoTen}</div>
          ) : null}
        </div>

        <button type="submit" className="btn btn-outline-success">
          Đăng Ký
        </button>
      </form>
    </div>
  );
}
