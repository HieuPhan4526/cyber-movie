import { applyMiddleware, combineReducers, createStore } from "redux";
import { QuanLyPhimReducer } from "./Reducer/QuanLyPhimReducer";
import { MovieReducer } from './Reducer/MovieReducer';
import thunk from 'redux-thunk';
import { QuanLyNguoiDungReducer } from "./Reducer/QuanLyNguoiDungReducer";
import { QuanLyDatVeReducers } from "./Reducer/QuanLyDatVeReducer";
import { LoaddingReducer } from "./Reducer/LoaddingReducer";


const rootReducer = combineReducers({
    QuanLyPhimReducer,
    QuanLyNguoiDungReducer,
    QuanLyDatVeReducers,
    MovieReducer,
    LoaddingReducer,

});

export const store = createStore(rootReducer, applyMiddleware(thunk));