import { SET_LICH_CHIEU_PHIM_DETAIL } from "../Type/QuanLyHeThongRapTypes";

const stateDefault = {
    filmDetail: {
    }
};

export const QuanLyPhimReducer = (state = stateDefault, action) => {
    switch (action.type) {
        case SET_LICH_CHIEU_PHIM_DETAIL: {
            state.filmDetail = action.filmDetail;
            return { ...state };
        }


        default: {
            return { ...state };

        }
    }
};
