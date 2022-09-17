import axios from "axios";
import { ACCESS_TOKEN, DOMAIN, TOKEN, } from "../ultil/setting";
import { ThongTinDatVe } from "../_core/models/thongTinDatVe";
import { Service } from "./Service";

export class QuanLyDatVeServices extends Service {
    constructor() {
        super();
    }
    layDanhSachPhongVe = (maLichChieu) => {
        return this.get(`/api/QuanLyDatVe/LayDanhSachPhongVe?MaLichChieu=${maLichChieu}`);
    };

    datVe = (thongTinDatVe = new ThongTinDatVe) => {
        return this.post(`/api/QuanLyDatVe/DatVe`, thongTinDatVe);
    };

}
export const quanLyDatVeServices = new QuanLyDatVeServices();