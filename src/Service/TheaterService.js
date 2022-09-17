import { Service } from "./Service";

export class TheaterService extends Service{
    GetMoviesSchedule = () => {
        return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap`)
    }
    GetTheaterSystem = () => {
        return this.get("/api/QuanLyRap/LayThongTinHeThongRap")
    }
    GetTheaterGroup = (id) => {
        return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${id}`)
    }
    AddShowtimeSchedule = (data) => {
        return this.post(`/api/QuanLyDatVe/TaoLichChieu`,data)
    }
}

export const theaterService = new TheaterService();