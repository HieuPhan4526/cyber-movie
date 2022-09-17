import { ThongTinPhongVe } from "../../_core/models/thongTinPhongVe";
import { CHANGE_TAB, CHANGE_TAB_ACTIVE, DAT_VE, SET_DS_GHE_DETAIL } from "../Type/QuanLyDatVeType";

const stateDefault = {
    thongTinPhongVe: new ThongTinPhongVe(),
    danhSachGheDangDat: [],
    tabActive: "1",
};

export const QuanLyDatVeReducers = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_DS_GHE_DETAIL: {
            state.thongTinPhongVe = action.thongTinPhongVe;
            return { ...state };
        }
        case DAT_VE: {
            state.danhSachGheDangDat = [...state.danhSachGheDangDat];
            let index = state.danhSachGheDangDat.findIndex(gheDangDat => gheDangDat.maGhe === action.gheDangDat.maGhe);
            if (index > -1) {
                state.danhSachGheDangDat.splice(index, 1);
            } else {
                state.danhSachGheDangDat.push(action.gheDangDat);
            }
            return { ...state };
        }
        case CHANGE_TAB: {
            state.tabActive = "2";
            return { ...state };
        }
        case CHANGE_TAB_ACTIVE: {
            state.tabActive = action.number;
            return { ...state };
        }
        default: {
            return { ...state };

        }
    }
};
