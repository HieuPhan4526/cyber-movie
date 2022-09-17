import { history } from "../../App";
import { quanLyNguoiDungServices } from "../../Service/QuanLyNguoiDungServices";
import { DANG_KY, DANG_NHAP, LAY_THONG_TIN_NGUOI_DUNG } from "../Type/QuanLyNguoiDungTypes";
import swal from 'sweetalert';


export const dangNhapAction = (thongTinDangNhap) => {
    return async (dispatch) => {
        try {
            let result = await quanLyNguoiDungServices.dangNhap(thongTinDangNhap);
            dispatch({
                type: DANG_NHAP,
                thongTinDangNhap: result.data.content
            });
            await swal({
                icon: "success",
                text: "Đăng Nhập Thành Công!!"
            });
            history.goBack();
        } catch (error) {
            swal({
                text: "Tài khoản hoặc mật khẩu không đúng. vui lòng nhập lại",
                icon: "warning",
                dangerMode: true,
            });
            console.log(error);
        }
    };
};

export const dangKyAction = (thongTinDangKy) => {
    return async dispatch => {
        try {
            let reusult = await quanLyNguoiDungServices.dangKy(thongTinDangKy);

            await dispatch({
                type: DANG_KY,
                thongTinDangKy: reusult.data.content
            });
            await swal({
                icon: "success",
                text: "Đăng Ký Thành Công!!"
            });
            await history.goBack();

        } catch (error) {
            console.log(error);
        }
    };
};

export const layThongTinNguoiDungAction = () => {
    return async dispatch => {
        try {
            let result = await quanLyNguoiDungServices.GetTicketOrdered();
            dispatch({
                type: LAY_THONG_TIN_NGUOI_DUNG,
                thongTinNguoiDung: result.data.content
            });

        } catch (error) {
            console.log(error);
        }
    };
};



