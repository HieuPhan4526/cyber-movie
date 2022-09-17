import React, { useEffect, useState } from 'react'
import { Button, Card, Col, DatePicker, Form, Input, InputNumber, PageHeader, Row, Select } from 'antd';
import { theaterService } from '../../Service/TheaterService';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import moment from 'moment';
import { history } from '../../App';
export default function ShowTime() {
    let { id } = useParams()
    let movieInfo = JSON.parse(localStorage.getItem("movie"))
    const [state, setState] = useState({
        theaterSystem: [],
        theaterGroup: []
    })
    let fomik = useFormik({
        initialValues: {
            maPhim: id,
            ngayChieuGioChieu: "",
            maRap: "",
            giaVe: 75000,
        },
        onSubmit: (values) => {
            theaterService.AddShowtimeSchedule(values).then(async (result) => {
                alert(result.data.content)
                history.push("/admin/film")
            }).catch((error) => { console.log(error) })
        }
    })
    useEffect(() => {
        theaterService.GetTheaterSystem().then((result) => {
            setState({
                ...state,
                theaterSystem: result.data.content
            })
        }).catch((error) => { console.log(error) })
    }, [])
    const HandleChangeSystem = (value) => {
        theaterService.GetTheaterGroup(value).then((result) => {
            setState({
                ...state,
                theaterGroup: result.data.content
            })
        }).catch((error) => { console.log(error) })
    }
    const HandleChangGroup = (value) => {
        fomik.setFieldValue("maRap", value)
    }
    const onChangeDate = (value) => {
        fomik.setFieldValue("ngayChieuGioChieu", moment(value).format("DD/MM/YYYY hh:mm:ss"))
    }
    const onChangeGiaVe = (value) => {
        fomik.setFieldValue("giaVe", value)
    }
    return (
        <div>
            <PageHeader
                className="site-page-header mb-3"
                onBack={() => history.goBack()}
                title={<h3>Tạo Lịch Chiếu Phim :</h3>}
                style={{ border: " 1px solid rgb(235, 237, 240)" }}
            />
            <Card>
                <h4 className='text-center'>{movieInfo.tenPhim}</h4>
                <Row gutter={50} className="p-5">
                    <Col span={6}>
                        <img style={{ width: 300, height: 300 }} src={movieInfo.hinhAnh} alt="" />
                    </Col>
                    <Col span={12}>
                        <Form
                            name="basic"
                            labelCol={{ span: 8 }}
                            wrapperCol={{ span: 16 }}
                            autoComplete="off"
                            onFinish={fomik.handleSubmit}
                        >
                            <Form.Item label="Hệ Thống Rạp">
                                <Select options={state.theaterSystem.map((system) => ({ label: system.tenHeThongRap, value: system.maHeThongRap }))} onChange={HandleChangeSystem} placeholder="Chọn hệ thống rạp" />
                            </Form.Item>
                            <Form.Item label="Hệ Thống Rạp">
                                <Select options={state.theaterGroup.map((group) => ({ label: group.tenCumRap, value: group.maCumRap }))} onChange={HandleChangGroup} placeholder="Chọn cụm rạp" />
                            </Form.Item>
                            <Form.Item label="Ngày giờ chiếu">
                                <DatePicker format={"DD/MM/YYYY hh:mm:ss"} showTime onChange={onChangeDate} />
                            </Form.Item>
                            <Form.Item label="Giá vé (75k-150k)">
                                <InputNumber min={75000} max={150000} defaultValue={75000} onChange={onChangeGiaVe} />
                            </Form.Item>
                            <Form.Item label="Xác Nhận">
                                <Button htmlType='submit'>Tạo Lịch Chiếu</Button>
                            </Form.Item>
                        </Form>
                    </Col>
                </Row>
            </Card>


        </div>

    )
}
