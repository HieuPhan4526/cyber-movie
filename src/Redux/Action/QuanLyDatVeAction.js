import { quanLyDatVeServices } from "../../Service/QuanLyDatVeServices";
import { ThongTinDatVe } from "../../_core/models/thongTinDatVe";
import { CHANGE_TAB, SET_DS_GHE_DETAIL } from "../Type/QuanLyDatVeType";
import swal from "sweetalert"

export const ChiTietDatGheAction = (maLichChieu) => {
    return async dispatch => {
        try {
            let result = await quanLyDatVeServices.layDanhSachPhongVe(maLichChieu);
            dispatch({
                type: SET_DS_GHE_DETAIL,
                thongTinPhongVe: result.data.content
            });
        } catch (error) {
            console.log(error);
        }
    };
};

export const datVeAction = (thongTinDatVe = new ThongTinDatVe()) => {
    return async dispatch => {
        try {
            let result = await quanLyDatVeServices.datVe(thongTinDatVe);
            await swal({
                icon: "success",
                text: "Đặt Vé Thành Công!!"
            });
            dispatch({
                type: CHANGE_TAB,
            });

        } catch (error) {
            console.log(error);
        }
    };
};