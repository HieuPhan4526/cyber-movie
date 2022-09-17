import { ACCESS_TOKEN, USER_LOGIN } from "../../ultil/setting";
import { DANG_KY, DANG_NHAP, LAY_THONG_TIN_NGUOI_DUNG } from "../Type/QuanLyNguoiDungTypes";


let user = {};
if (localStorage.getItem(USER_LOGIN)) {
    user = JSON.parse(localStorage.getItem(USER_LOGIN));
}

const stateDefault = {
    userLogin: user,
    userRegister: {},
    thongTinNguoiDung: {}
};
export const QuanLyNguoiDungReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case DANG_NHAP: {
            localStorage.setItem(USER_LOGIN, JSON.stringify(action.thongTinDangNhap));
            localStorage.setItem(ACCESS_TOKEN, action.thongTinDangNhap.accessToken);
            state.userLogin = action.thongTinDangNhap;

            return { ...state, };
        }

        case DANG_KY: {
            state.userRegister = action.thongTinDangKy;
            return { ...state };
        }
        case LAY_THONG_TIN_NGUOI_DUNG: {
            state.thongTinNguoiDung = action.thongTinNguoiDung;
            return { ...state };
        }

        default: {
            return { ...state };

        }
    }
};
