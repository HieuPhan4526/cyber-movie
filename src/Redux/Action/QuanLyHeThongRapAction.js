import { quanLyHeThongRapSerVices } from "../../Service/QuanLyHeThongRapServices";
import { SET_LICH_CHIEU_PHIM_DETAIL } from "../Type/QuanLyHeThongRapTypes";

export const layThongTinLichChieuAction = (id) => {
    return async dispatch => {
        try {
            let result = await quanLyHeThongRapSerVices.layThongTinLichChieu(id);
            dispatch({
                type: SET_LICH_CHIEU_PHIM_DETAIL,
                filmDetail: result.data.content
            });
        } catch (error) {
            console.log(error);
        }
    };
};