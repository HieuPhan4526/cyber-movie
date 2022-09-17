import axios from "axios";
import { Service } from "./Service";

export class QuanLyNguoiDungServices extends Service {
    dangNhap = (thongTinDangNhap) => {
        return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
    };
    dangKy = (thongTinDangKy) => {
        return this.post(`/api/QuanLyNguoiDung/DangKy`, thongTinDangKy);
    };
    GetTicketOrdered = () => {
        return this.post(`/api/QuanLyNguoiDung/ThongTinTaiKhoan`)
    }
}
export const quanLyNguoiDungServices = new QuanLyNguoiDungServices();