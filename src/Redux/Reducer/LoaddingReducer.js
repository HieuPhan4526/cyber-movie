import { HIDE_LOADDING, SHOW_LOADDING } from "../Type/LoaddingType";

const stateDefaufl = {
    loadding: false
};

export const LoaddingReducer = (state = stateDefaufl, action) => {
    switch (action.type) {
        case SHOW_LOADDING: {
            return { ...state, loadding: true };
        }
        case HIDE_LOADDING: {
            return { ...state, loadding: false };
        }
        default: {
            return { ...state };
        }
    }
};
